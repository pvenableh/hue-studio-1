/**
 * RSS feed for hue: magazine
 * Serves at /feed.xml
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.directusUrl as string
  const siteUrl = 'https://huestudios.com'
  const token = config.directusStaticToken

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  let items = ''

  try {
    const res = await $fetch<{ data: any[] }>(`${baseUrl}/items/blog`, {
      headers,
      params: {
        fields: 'title,slug,excerpt,date_published,date_created,author.first_name,author.last_name,categories.blog_categories_id.name',
        'filter[status][_eq]': 'published',
        sort: '-date_published,-date_created',
        limit: '50',
      },
    })

    for (const post of res.data || []) {
      if (!post.slug) continue
      const pubDate = post.date_published ?? post.date_created
      const authorName = [post.author?.first_name, post.author?.last_name].filter(Boolean).join(' ')
      const category = post.categories?.[0]?.blog_categories_id?.name ?? ''

      items += `
    <item>
      <title><![CDATA[${post.title ?? ''}]]></title>
      <link>${siteUrl}/magazine/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/magazine/${post.slug}</guid>
      <description><![CDATA[${post.excerpt ?? ''}]]></description>
      ${pubDate ? `<pubDate>${new Date(pubDate).toUTCString()}</pubDate>` : ''}
      ${authorName ? `<author>${authorName}</author>` : ''}
      ${category ? `<category>${category}</category>` : ''}
    </item>`
    }
  } catch (e) {
    console.warn('RSS: Could not fetch blog posts from Directus', e)
  }

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>hue: magazine</title>
    <link>${siteUrl}/magazine</link>
    <description>Perspectives on brand strategy, design, and the business of creative excellence from Hue Creative Agency.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`

  setResponseHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  return feed
})

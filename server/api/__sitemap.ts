/**
 * Dynamic sitemap source — fetches slugs from Directus
 * for portfolio, case studies, industries, and services.
 */
import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.directusUrl as string
  const token = config.directusStaticToken

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const urls: { loc: string; lastmod?: string }[] = []

  try {
    // Portfolio items
    const portfolio = await $fetch<{ data: any[] }>(`${baseUrl}/items/portfolio`, {
      headers,
      params: { 'fields': 'slug,date_updated', 'filter[status][_eq]': 'published', 'limit': 500 },
    })
    for (const item of portfolio.data || []) {
      if (item.slug) urls.push({ loc: `/portfolio/${item.slug}`, lastmod: item.date_updated })
    }

    // Case studies
    const caseStudies = await $fetch<{ data: any[] }>(`${baseUrl}/items/case_studies`, {
      headers,
      params: { 'fields': 'url,date_updated', 'filter[status][_eq]': 'published', 'limit': 500 },
    })
    for (const item of caseStudies.data || []) {
      if (item.url) urls.push({ loc: `/case-studies/${item.url}`, lastmod: item.date_updated })
    }

    // Blog posts
    const blogPosts = await $fetch<{ data: any[] }>(`${baseUrl}/items/blog`, {
      headers,
      params: { 'fields': 'slug,date_updated,date_published', 'filter[status][_eq]': 'published', 'limit': 500 },
    })
    for (const item of blogPosts.data || []) {
      if (item.slug) urls.push({ loc: `/magazine/${item.slug}`, lastmod: item.date_updated || item.date_published })
    }

    // Blog categories
    const blogCats = await $fetch<{ data: any[] }>(`${baseUrl}/items/blog_categories`, {
      headers,
      params: { 'fields': 'slug', 'filter[status][_eq]': 'published', 'limit': 100 },
    })
    for (const item of blogCats.data || []) {
      if (item.slug) urls.push({ loc: `/magazine/category/${item.slug}` })
    }
  } catch (e) {
    // If Directus is unreachable, return static routes only
    console.warn('Sitemap: Could not fetch dynamic routes from Directus', e)
  }

  return urls
})

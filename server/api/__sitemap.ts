/**
 * Dynamic sitemap source — fetches slugs from Directus
 * for portfolio, case studies, industries, services, team, and blog.
 * Also includes static pages that Nuxt auto-discovery may miss.
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

  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: number }[] = []

  // Static pages — ensure they're always in the sitemap
  const staticPages = [
    { loc: '/', changefreq: 'weekly' as const, priority: 1.0 },
    { loc: '/about', changefreq: 'monthly' as const, priority: 0.8 },
    { loc: '/contact', changefreq: 'monthly' as const, priority: 0.8 },
    { loc: '/scope', changefreq: 'monthly' as const, priority: 0.7 },
    { loc: '/partnerships', changefreq: 'monthly' as const, priority: 0.6 },
    { loc: '/brand-analysis', changefreq: 'monthly' as const, priority: 0.7 },
    { loc: '/intelligence', changefreq: 'monthly' as const, priority: 0.7 },
    { loc: '/guides/case-studies', changefreq: 'monthly' as const, priority: 0.5 },
    { loc: '/creative-services', changefreq: 'weekly' as const, priority: 0.9 },
    { loc: '/industries', changefreq: 'weekly' as const, priority: 0.8 },
    { loc: '/portfolio', changefreq: 'weekly' as const, priority: 0.9 },
    { loc: '/case-studies', changefreq: 'weekly' as const, priority: 0.8 },
    { loc: '/magazine', changefreq: 'daily' as const, priority: 0.8 },
  ]
  urls.push(...staticPages)

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

    // Creative services
    const services = await $fetch<{ data: any[] }>(`${baseUrl}/items/services`, {
      headers,
      params: { 'fields': 'url,date_updated', 'filter[status][_eq]': 'published', 'limit': 100 },
    })
    for (const item of services.data || []) {
      if (item.url) urls.push({ loc: `/creative-services/${item.url}`, lastmod: item.date_updated })
    }

    // Industries
    const industries = await $fetch<{ data: any[] }>(`${baseUrl}/items/industries`, {
      headers,
      params: { 'fields': 'url,date_updated', 'filter[status][_eq]': 'published', 'limit': 100 },
    })
    for (const item of industries.data || []) {
      if (item.url) urls.push({ loc: `/industries/${item.url}`, lastmod: item.date_updated })
    }

    // Team members (from people collection, filtered to team members)
    const team = await $fetch<{ data: any[] }>(`${baseUrl}/items/people`, {
      headers,
      params: {
        'fields': 'url,date_updated',
        'filter[status][_eq]': 'published',
        'filter[is_team_member][_eq]': 'true',
        'limit': 100,
      },
    })
    for (const item of team.data || []) {
      if (item.url) urls.push({ loc: `/team/${item.url}`, lastmod: item.date_updated })
    }
  } catch (e) {
    // If Directus is unreachable, return static routes only
    console.warn('Sitemap: Could not fetch dynamic routes from Directus', e)
  }

  return urls
})

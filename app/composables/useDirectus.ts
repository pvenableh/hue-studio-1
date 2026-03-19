/**
 * useDirectus — typed Directus REST client
 * Types sourced from the auto-generated schema at ~/types/directus.ts
 *
 * Key schema corrections vs. earlier version:
 *  - Portfolio.client  → Organization (not Client)
 *  - Portfolio.images  → PortfolioFile[] { directus_files_id }
 *  - Portfolio.before_and_afters → PortfolioBeforeAndAfter[] (junction) → BeforeAndAfter
 *  - BeforeAndAfter    → { before_image, after_image, title, caption }
 *  - Organization      → { name, short_name, code, website, logo, brand_color, icon }
 *  - Industry          → { id, name, class, color, url }
 *  - Service           → { id, name, title, url, color, class, caption, word }
 *  - CaseStudy         → separate collection with challenge/solution/results
 *  - ClientTestimonial → { quote, client_name, client_title, client_company }
 *  - Request           → contact-form collection (POST here for enquiries)
 */

export interface DirectusOrganization {
  id: string
  name: string | null
  short_name: string | null
  code: string | null
  website: string | null
  description: string | null
  logo: string | null
  icon: string | null
  brand_color: string | null
}

export interface DirectusIndustry {
  id: string
  name: string | null
  class: string | null
  color: string | null
  url: string | null
  status: string
}

export interface DirectusService {
  id: string
  name: string | null
  title: string | null
  url: string | null
  color: string | null
  class: string | null
  caption: string | null
  word: string | null
  description: string | null
  status: string
  sort: number | null
  featured_image: string | null
}

export interface DirectusBeforeAndAfter {
  id: number
  title: string | null
  caption: string | null
  before_image: string | null
  after_image: string | null
  status: string
}

export interface DirectusPortfolioFile {
  directus_files_id: string
  sort: number | null
}

export interface DirectusPortfolioBeforeAndAfter {
  id: number
  sort: number | null
  before_and_afters_id: DirectusBeforeAndAfter | null
}

export interface DirectusPortfolioIndustry {
  id: number
  sort: number | null
  industries_id: DirectusIndustry | null
}

export interface DirectusPortfolioItem {
  id: string
  status: string
  sort: number | null
  name: string | null
  description: string | null
  synopsis: string | null
  challenge: string | null
  creation: string | null
  caption: string | null
  slug: string | null
  url: string
  featured_image: string | null
  parent_id: string | null
  date_created: string | null
  date_updated: string | null
  client: DirectusOrganization | null
  service: DirectusService | null
  industries: DirectusPortfolioIndustry[]
  images: DirectusPortfolioFile[]
  before_and_afters: DirectusPortfolioBeforeAndAfter[]
}

export interface DirectusCaseStudy {
  id: string
  status: string
  title: string | null
  url: string | null
  excerpt: string | null
  featured_image: string | null
  challenge: string | null
  solution: string | null
  results: string | null
  client: string | null
  project_year: string | null
  project_duration: string | null
  project_url: string | null
  tags: string[] | null
  featured: boolean | null
  date_created: string | null
  organization: DirectusOrganization | null
  gallery: { directus_files_id: string }[]
  services: { services_id: DirectusService | null }[]
}

export interface DirectusTestimonial {
  id: number
  quote: string
  client_name: string
  client_title: string | null
  client_company: string
  client_logo: string | null
  client_photo: string | null
  project_context: string | null
  rating: number | null
  featured: boolean | null
  service_category: string | null
  related_portfolio: string | null
}

export interface DirectusRequestPayload {
  project?: string
  explanation?: string
  budget?: string
  first_name?: string
  last_name?: string
  title?: string
  company?: string
  email?: string
  phone?: string
  contact_preference?: string
}

export function useDirectus() {
  const config  = useRuntimeConfig()
  const baseUrl = (config.public.directusUrl as string).replace(/\/$/, '')
  const assetsBase = `${baseUrl}/assets`

  function assetUrl(id: string, params?: Record<string, string | number>): string {
    if (!id) return ''
    const url = new URL(`${assetsBase}/${id}`)
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
    return url.toString()
  }

  const PORTFOLIO_FIELDS = [
    'id', 'name', 'slug', 'url', 'status', 'sort',
    'caption', 'description', 'synopsis', 'challenge', 'creation',
    'featured_image', 'parent_id', 'date_created', 'date_updated',
    'client.id', 'client.name', 'client.short_name', 'client.code',
    'client.website', 'client.description', 'client.logo',
    'client.icon', 'client.brand_color',
    'service.id', 'service.name', 'service.title', 'service.url',
    'service.color', 'service.class', 'service.caption', 'service.word',
    'industries.id', 'industries.sort',
    'industries.industries_id.id', 'industries.industries_id.name',
    'industries.industries_id.url', 'industries.industries_id.color',
    'industries.industries_id.class',
    'images.directus_files_id', 'images.sort',
    'before_and_afters.id', 'before_and_afters.sort',
    'before_and_afters.before_and_afters_id.id',
    'before_and_afters.before_and_afters_id.title',
    'before_and_afters.before_and_afters_id.caption',
    'before_and_afters.before_and_afters_id.before_image',
    'before_and_afters.before_and_afters_id.after_image',
  ].join(',')

  async function fetchPortfolio(options: { limit?: number; parentOnly?: boolean } = {}): Promise<DirectusPortfolioItem[]> {
    const params = new URLSearchParams({
      fields: PORTFOLIO_FIELDS,
      'filter[status][_eq]': 'published',
      limit: String(options.limit ?? 100),
      sort: 'sort',
    })
    if (options.parentOnly) params.set('filter[parent_id][_null]', 'true')
    const res = await $fetch<{ data: DirectusPortfolioItem[] }>(`${baseUrl}/items/portfolio?${params}`)
    return res.data ?? []
  }

  async function fetchPortfolioItem(slug: string): Promise<DirectusPortfolioItem | null> {
    const params = new URLSearchParams({
      fields: PORTFOLIO_FIELDS,
      'filter[slug][_eq]': slug,
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await $fetch<{ data: DirectusPortfolioItem[] }>(`${baseUrl}/items/portfolio?${params}`)
    return res.data?.[0] ?? null
  }

  async function fetchIndustries(): Promise<DirectusIndustry[]> {
    const res = await $fetch<{ data: DirectusIndustry[] }>(
      `${baseUrl}/items/industries?filter[status][_eq]=published&sort=sort&fields=id,name,class,color,url,status`
    )
    return res.data ?? []
  }

  async function fetchServices(): Promise<DirectusService[]> {
    const res = await $fetch<{ data: DirectusService[] }>(
      `${baseUrl}/items/services?filter[status][_eq]=published&sort=sort&fields=id,name,title,url,color,class,caption,word,description,sort,status,featured_image`
    )
    return res.data ?? []
  }

  async function fetchCaseStudies(options: { limit?: number; featured?: boolean } = {}): Promise<DirectusCaseStudy[]> {
    const params = new URLSearchParams({
      fields: [
        'id', 'status', 'title', 'url', 'excerpt', 'featured_image',
        'challenge', 'solution', 'results', 'client', 'project_year',
        'project_duration', 'project_url', 'tags', 'featured', 'date_created',
        'organization.id', 'organization.name', 'organization.short_name',
        'organization.logo', 'organization.icon', 'organization.website',
        'gallery.directus_files_id',
        'services.services_id.id', 'services.services_id.name', 'services.services_id.url',
      ].join(','),
      'filter[status][_eq]': 'published',
      limit: String(options.limit ?? 50),
      sort: 'sort,-date_created',
    })
    if (options.featured) params.set('filter[featured][_eq]', 'true')
    const res = await $fetch<{ data: DirectusCaseStudy[] }>(`${baseUrl}/items/case_studies?${params}`)
    return res.data ?? []
  }

  async function fetchCaseStudyByUrl(url: string): Promise<DirectusCaseStudy | null> {
    const params = new URLSearchParams({
      fields: [
        'id', 'status', 'title', 'url', 'excerpt', 'featured_image',
        'challenge', 'solution', 'results', 'client', 'project_year',
        'project_duration', 'project_url', 'tags', 'featured', 'date_created',
        'organization.id', 'organization.name', 'organization.short_name',
        'organization.logo', 'organization.icon', 'organization.website',
        'gallery.directus_files_id',
        'services.services_id.id', 'services.services_id.name', 'services.services_id.url',
      ].join(','),
      'filter[url][_eq]': url,
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await $fetch<{ data: DirectusCaseStudy[] }>(`${baseUrl}/items/case_studies?${params}`)
    return res.data?.[0] ?? null
  }

  async function fetchTestimonials(options: { limit?: number; featured?: boolean } = {}): Promise<DirectusTestimonial[]> {
    const params = new URLSearchParams({
      fields: 'id,quote,client_name,client_title,client_company,client_logo,client_photo,project_context,rating,featured,service_category,related_portfolio',
      limit: String(options.limit ?? 20),
      sort: '-featured,sort',
    })
    if (options.featured) params.set('filter[featured][_eq]', 'true')
    const res = await $fetch<{ data: DirectusTestimonial[] }>(`${baseUrl}/items/client_testimonials?${params}`)
    return res.data ?? []
  }

  /** Submit a contact/enquiry form — writes to the `requests` collection */
  async function submitRequest(payload: DirectusRequestPayload): Promise<boolean> {
    try {
      await $fetch(`${baseUrl}/items/requests`, {
        method: 'POST',
        body: { ...payload, status: 'published', date_submitted: new Date().toISOString() },
      })
      return true
    } catch (e) {
      console.error('[useDirectus] submitRequest failed:', e)
      return false
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  function primaryImageId(item: DirectusPortfolioItem): string | null {
    return item.featured_image ?? item.images?.[0]?.directus_files_id ?? null
  }

  function resolvedBeforeAfters(item: DirectusPortfolioItem): DirectusBeforeAndAfter[] {
    return (item.before_and_afters ?? [])
      .map((j) => j.before_and_afters_id)
      .filter((b): b is DirectusBeforeAndAfter => b !== null)
  }

  function primaryIndustryName(item: DirectusPortfolioItem): string {
    const raw = item.industries?.[0]?.industries_id?.name ?? ''
    return raw.split('/')[0].split('&')[0].trim()
  }

  function primaryIndustryUrl(item: DirectusPortfolioItem): string {
    return item.industries?.[0]?.industries_id?.url ?? ''
  }

  function stripHtml(html: string | null | undefined): string {
    return html?.replace(/<[^>]+>/g, '') ?? ''
  }

  return {
    baseUrl,
    assetsBase,
    assetUrl,
    fetchPortfolio,
    fetchPortfolioItem,
    fetchIndustries,
    fetchServices,
    fetchCaseStudies,
    fetchCaseStudyByUrl,
    fetchTestimonials,
    submitRequest,
    primaryImageId,
    resolvedBeforeAfters,
    primaryIndustryName,
    primaryIndustryUrl,
    stripHtml,
  }
}

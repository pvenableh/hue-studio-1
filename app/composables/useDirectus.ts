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
  headline: string | null
  description: string | null
  status: string
  portfolio?: { portfolio_id: DirectusPortfolioItem | null }[]
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

export interface DirectusClient {
  id: string
  name: string | null
  slug: string | null
  code: string | null
  website: string | null
  logo: string | null
  industry: string | null
  organization: DirectusOrganization | null
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
  results: string | null
  caption: string | null
  slug: string | null
  url: string
  featured_image: string | null
  featured: boolean | null
  parent_id: string | null
  project_year: string | null
  project_duration: string | null
  date_created: string | null
  date_updated: string | null
  client: DirectusClient | null
  service: DirectusService | null
  industries: DirectusPortfolioIndustry[]
  images: DirectusPortfolioFile[]
  before_and_afters: DirectusPortfolioBeforeAndAfter[]
  projects: DirectusPortfolioItem[]
}

export interface DirectusCaseStudyPortfolioItem {
  portfolio_id: DirectusPortfolioItem | null
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
  industries: { industries_id: DirectusIndustry | null }[]
  portfolio_items: DirectusCaseStudyPortfolioItem[]
}

export interface DirectusBlogCategory {
  id: string
  name: string | null
  slug: string | null
  description: string | null
  color: string | null
}

export interface DirectusBlogAuthor {
  id: number
  first_name: string | null
  last_name: string | null
  title: string | null
  bio: string | null
  image: string | null
  photo: string | null
  url: string | null
  linkedin_url: string | null
  headline: string | null
  extended_bio: string | null
  resume_highlights: { year: string; role: string; company: string; description: string }[] | null
  education: { degree: string; school: string; year: string }[] | null
  specialties: string[] | null
  is_team_member: boolean | null
}

export interface DirectusBlogPost {
  id: number
  status: string
  title: string | null
  slug: string | null
  excerpt: string | null
  body: string | null
  featured_image: string | null
  seo: { title?: string; description?: string; image?: string } | null
  date_published: string | null
  date_created: string | null
  date_updated: string | null
  reading_time: number | null
  featured: boolean | null
  author: DirectusBlogAuthor | null
  categories: { blog_categories_id: DirectusBlogCategory | null }[]
  services: { services_id: DirectusService | null }[]
  industries: { industries_id: DirectusIndustry | null }[]
  images: { directus_files_id: string }[]
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

export interface SubmitContactPayload {
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  company?: string
  title?: string
  project?: string
  explanation?: string
  budget?: string
  contact_preference?: string
}

export interface SubmitAuditPayload {
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  company?: string
  explanation?: string
  audit_answers?: Record<string, string>
}

export interface SubmitSubscribePayload {
  email: string
  first_name?: string
  list_id?: number
}

export interface SubmitMeetingPayload {
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  company?: string
  meeting_type?: string
  preferred_date?: string
  preferred_time?: string
  duration?: number
  explanation?: string
}

export function useDirectus() {
  const config  = useRuntimeConfig()
  const baseUrl = (config.public.directusUrl as string).replace(/\/$/, '')
  const assetsBase = `${baseUrl}/assets`

  // Auth headers for server-side fetches (token only available server-side via runtimeConfig)
  const fetchHeaders: Record<string, string> = {}
  if (import.meta.server && config.directusStaticToken) {
    fetchHeaders['Authorization'] = `Bearer ${config.directusStaticToken}`
  }

  /**
   * Fetch from Directus — on the server uses the Directus URL directly with
   * the static token; on the client proxies through /api/directus/ to avoid
   * CORS issues and keep the token server-side.
   */
  function directusFetch<T>(path: string, params?: URLSearchParams): Promise<T> {
    if (import.meta.server) {
      const url = params ? `${baseUrl}/${path}?${params}` : `${baseUrl}/${path}`
      return $fetch<T>(url, { headers: fetchHeaders })
    }
    // Client-side: proxy through Nuxt server route
    const url = params ? `/api/directus/${path}?${params}` : `/api/directus/${path}`
    return $fetch<T>(url)
  }

  /**
   * Build an asset URL using a Directus transformation preset.
   * Presets: thumbnail (75), small (300), medium (600), medium-contain,
   *          large (1200), large-contain, xlarge (2000), xlarge-contain,
   *          hero (1920x1080), avatar (100), email-small, email-large
   */
  function assetUrl(id: string, preset?: string): string {
    if (!id) return ''
    const url = new URL(`${assetsBase}/${id}`)
    if (preset) url.searchParams.set('key', preset)
    return url.toString()
  }

  const PORTFOLIO_FIELDS = [
    'id', 'name', 'slug', 'url', 'status', 'sort',
    'caption', 'description', 'synopsis', 'challenge', 'creation', 'results',
    'featured_image', 'featured', 'parent_id',
    'project_year', 'project_duration',
    'date_created', 'date_updated',
    'client.id', 'client.name', 'client.slug', 'client.code',
    'client.website', 'client.logo', 'client.industry',
    'client.organization.id', 'client.organization.name', 'client.organization.short_name',
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
    'projects.id', 'projects.name', 'projects.slug', 'projects.url', 'projects.status',
    'projects.caption', 'projects.featured_image',
    'projects.service.id', 'projects.service.name', 'projects.service.url',
    'projects.images.directus_files_id', 'projects.images.sort',
    'videos.id', 'videos.platform', 'videos.link', 'videos.title', 'videos.description',
    'hero',
  ].join(',')

  async function fetchPortfolio(options: { limit?: number; parentOnly?: boolean } = {}): Promise<DirectusPortfolioItem[]> {
    const params = new URLSearchParams({
      fields: PORTFOLIO_FIELDS,
      'filter[status][_eq]': 'published',
      limit: String(options.limit ?? 100),
      sort: 'sort',
    })
    if (options.parentOnly) params.set('filter[parent_id][_null]', 'true')
    const res = await directusFetch<{ data: DirectusPortfolioItem[] }>('items/portfolio', params)
    return res.data ?? []
  }

  async function fetchPortfolioItem(slug: string): Promise<DirectusPortfolioItem | null> {
    const params = new URLSearchParams({
      fields: PORTFOLIO_FIELDS,
      'filter[slug][_eq]': slug,
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await directusFetch<{ data: DirectusPortfolioItem[] }>('items/portfolio', params)
    return res.data?.[0] ?? null
  }

  async function fetchIndustries(): Promise<DirectusIndustry[]> {
    const params = new URLSearchParams({
      'filter[status][_eq]': 'published',
      sort: 'sort',
      fields: 'id,name,class,color,url,status',
    })
    const res = await directusFetch<{ data: DirectusIndustry[] }>('items/industries', params)
    return res.data ?? []
  }

  /** Fetch a single industry by URL slug (without portfolio — fetch those separately) */
  async function fetchIndustryByUrl(url: string): Promise<DirectusIndustry | null> {
    const params = new URLSearchParams({
      fields: 'id,name,class,color,url,headline,description,status',
      'filter[url][_eq]': url,
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await directusFetch<{ data: DirectusIndustry[] }>('items/industries', params)
    return res.data?.[0] ?? null
  }

  /** Fetch portfolio items linked to an industry via the M2M (lighter fields to avoid permission issues) */
  async function fetchIndustryPortfolio(industryId: string): Promise<DirectusPortfolioItem[]> {
    const params = new URLSearchParams({
      fields: [
        'id', 'name', 'slug', 'url', 'status', 'sort',
        'synopsis', 'challenge', 'creation', 'results',
        'featured_image', 'featured', 'parent_id',
        'client.id', 'client.name',
        'service.id', 'service.name', 'service.url',
        'images.directus_files_id',
        'before_and_afters.before_and_afters_id.id',
        'before_and_afters.before_and_afters_id.title',
        'before_and_afters.before_and_afters_id.before_image',
        'before_and_afters.before_and_afters_id.after_image',
        'projects.id', 'projects.name', 'projects.slug', 'projects.url',
        'projects.featured_image', 'projects.service.name',
        'projects.images.directus_files_id',
      ].join(','),
      'filter[status][_eq]': 'published',
      'filter[industries][industries_id][_eq]': industryId,
      limit: '100',
      sort: 'sort',
    })
    const res = await directusFetch<{ data: DirectusPortfolioItem[] }>('items/portfolio', params)
    return res.data ?? []
  }

  async function fetchServices(): Promise<DirectusService[]> {
    const params = new URLSearchParams({
      'filter[status][_eq]': 'published',
      sort: 'sort',
      fields: [
        'id', 'name', 'title', 'url', 'color', 'class', 'caption', 'word', 'description',
        'sort', 'status', 'featured_image', 'tags',
        'capabilities.capabilities_id.id', 'capabilities.capabilities_id.title',
        'capabilities.capabilities_id.description', 'capabilities.capabilities_id.features',
        'capabilities.capabilities_id.sort',
      ].join(','),
    })
    const res = await directusFetch<{ data: DirectusService[] }>('items/services', params)
    return res.data ?? []
  }

  /** Fetch a single service by URL slug */
  async function fetchServiceByUrl(url: string): Promise<DirectusService | null> {
    const params = new URLSearchParams({
      fields: 'id,name,title,url,color,class,caption,word,description,sort,status,featured_image',
      'filter[url][_eq]': url,
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await directusFetch<{ data: DirectusService[] }>('items/services', params)
    return res.data?.[0] ?? null
  }

  /** Fetch portfolio items linked to a service */
  async function fetchServicePortfolio(serviceId: string): Promise<DirectusPortfolioItem[]> {
    const params = new URLSearchParams({
      fields: [
        'id', 'name', 'slug', 'url', 'status', 'sort',
        'synopsis', 'challenge', 'creation', 'results',
        'featured_image', 'featured', 'parent_id',
        'client.id', 'client.name',
        'service.id', 'service.name', 'service.url',
        'images.directus_files_id',
        'projects.id', 'projects.name', 'projects.slug', 'projects.url',
        'projects.featured_image', 'projects.service.name',
        'projects.images.directus_files_id',
      ].join(','),
      'filter[status][_eq]': 'published',
      'filter[service][_eq]': serviceId,
      limit: '100',
      sort: 'sort',
    })
    const res = await directusFetch<{ data: DirectusPortfolioItem[] }>('items/portfolio', params)
    return res.data ?? []
  }

  /** Fetch case studies linked to a service via the M2M */
  async function fetchServiceCaseStudies(serviceId: string): Promise<DirectusCaseStudy[]> {
    const params = new URLSearchParams({
      fields: [
        'id', 'status', 'title', 'url', 'excerpt', 'featured_image',
        'challenge', 'solution', 'results', 'client', 'project_year',
        'project_duration', 'tags', 'featured', 'date_created',
        'organization.id', 'organization.name', 'organization.short_name',
        'organization.logo', 'organization.icon',
        'services.services_id.id', 'services.services_id.name', 'services.services_id.url',
        ...CASE_STUDY_PORTFOLIO_FIELDS,
      ].join(','),
      'filter[status][_eq]': 'published',
      'filter[services][services_id][_eq]': serviceId,
      limit: '50',
      sort: 'sort,-date_created',
    })
    const res = await directusFetch<{ data: DirectusCaseStudy[] }>('items/case_studies', params)
    return res.data ?? []
  }

  /** Fetch portfolio items that are case studies (parent items with narrative content) */
  async function fetchFeaturedPortfolio(options: { limit?: number } = {}): Promise<DirectusPortfolioItem[]> {
    const params = new URLSearchParams({
      fields: PORTFOLIO_FIELDS,
      'filter[status][_eq]': 'published',
      'filter[featured][_eq]': 'true',
      'filter[parent_id][_null]': 'true',
      limit: String(options.limit ?? 10),
      sort: 'sort',
    })
    const res = await directusFetch<{ data: DirectusPortfolioItem[] }>('items/portfolio', params)
    return res.data ?? []
  }

  const CASE_STUDY_PORTFOLIO_FIELDS = [
    'portfolio_items.portfolio_id.id',
    'portfolio_items.portfolio_id.name',
    'portfolio_items.portfolio_id.slug',
    'portfolio_items.portfolio_id.url',
    'portfolio_items.portfolio_id.featured_image',
    'portfolio_items.portfolio_id.service.id',
    'portfolio_items.portfolio_id.service.name',
    'portfolio_items.portfolio_id.images.directus_files_id',
    'portfolio_items.portfolio_id.before_and_afters.before_and_afters_id.id',
    'portfolio_items.portfolio_id.before_and_afters.before_and_afters_id.title',
    'portfolio_items.portfolio_id.before_and_afters.before_and_afters_id.caption',
    'portfolio_items.portfolio_id.before_and_afters.before_and_afters_id.before_image',
    'portfolio_items.portfolio_id.before_and_afters.before_and_afters_id.after_image',
    'portfolio_items.portfolio_id.videos.id',
    'portfolio_items.portfolio_id.videos.platform',
    'portfolio_items.portfolio_id.videos.link',
    'portfolio_items.portfolio_id.videos.title',
    'portfolio_items.portfolio_id.videos.description',
    'portfolio_items.portfolio_id.hero',
    'portfolio_items.portfolio_id.projects.id',
    'portfolio_items.portfolio_id.projects.name',
    'portfolio_items.portfolio_id.projects.featured_image',
    'portfolio_items.portfolio_id.projects.images.directus_files_id',
  ]

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
        'industries.industries_id.id', 'industries.industries_id.name', 'industries.industries_id.url',
        ...CASE_STUDY_PORTFOLIO_FIELDS,
      ].join(','),
      'filter[status][_eq]': 'published',
      limit: String(options.limit ?? 50),
      sort: 'sort,-date_created',
    })
    if (options.featured) params.set('filter[featured][_eq]', 'true')
    const res = await directusFetch<{ data: DirectusCaseStudy[] }>('items/case_studies', params)
    return res.data ?? []
  }

  /** Fetch case studies linked to an industry via the M2M */
  async function fetchIndustryCaseStudies(industryId: string): Promise<DirectusCaseStudy[]> {
    const params = new URLSearchParams({
      fields: [
        'id', 'status', 'title', 'url', 'excerpt', 'featured_image',
        'challenge', 'solution', 'results', 'client', 'project_year',
        'project_duration', 'tags', 'featured', 'date_created',
        'organization.id', 'organization.name', 'organization.short_name',
        'organization.logo', 'organization.icon',
        'services.services_id.id', 'services.services_id.name', 'services.services_id.url',
        ...CASE_STUDY_PORTFOLIO_FIELDS,
      ].join(','),
      'filter[status][_eq]': 'published',
      'filter[industries][industries_id][_eq]': industryId,
      limit: '50',
      sort: 'sort,-date_created',
    })
    const res = await directusFetch<{ data: DirectusCaseStudy[] }>('items/case_studies', params)
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
        'industries.industries_id.id', 'industries.industries_id.name', 'industries.industries_id.url',
        ...CASE_STUDY_PORTFOLIO_FIELDS,
      ].join(','),
      'filter[url][_eq]': url,
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await directusFetch<{ data: DirectusCaseStudy[] }>('items/case_studies', params)
    return res.data?.[0] ?? null
  }

  async function fetchTestimonials(options: { limit?: number; featured?: boolean } = {}): Promise<DirectusTestimonial[]> {
    const params = new URLSearchParams({
      fields: 'id,quote,client_name,client_title,client_company,client_logo,client_photo,project_context,rating,featured,service_category,related_portfolio',
      limit: String(options.limit ?? 20),
      sort: '-featured,sort',
    })
    if (options.featured) params.set('filter[featured][_eq]', 'true')
    const res = await directusFetch<{ data: DirectusTestimonial[] }>('items/client_testimonials', params)
    return res.data ?? []
  }

  /** Submit a strategy session / contact form → creates contact + lead + request */
  async function submitContact(payload: SubmitContactPayload): Promise<{ success: boolean; leadId?: string; contactId?: string }> {
    try {
      const res = await $fetch<{ success: boolean; leadId: string; contactId: string }>('/api/submit', {
        method: 'POST',
        body: { type: 'contact', ...payload },
      })
      return res
    } catch (e) {
      console.error('[useDirectus] submitContact failed:', e)
      return { success: false }
    }
  }

  /** Submit a brand audit form → creates contact + lead + request (mid-funnel) */
  async function submitAudit(payload: SubmitAuditPayload): Promise<{ success: boolean; leadId?: string; contactId?: string }> {
    try {
      const res = await $fetch<{ success: boolean; leadId: string; contactId: string }>('/api/submit', {
        method: 'POST',
        body: { type: 'audit', ...payload },
      })
      return res
    } catch (e) {
      console.error('[useDirectus] submitAudit failed:', e)
      return { success: false }
    }
  }

  /** Subscribe to the newsletter → creates/upserts contact + mailing list entry */
  async function submitSubscribe(payload: SubmitSubscribePayload): Promise<{ success: boolean }> {
    try {
      const res = await $fetch<{ success: boolean }>('/api/submit', {
        method: 'POST',
        body: { type: 'subscribe', ...payload },
      })
      return res
    } catch (e) {
      console.error('[useDirectus] submitSubscribe failed:', e)
      return { success: false }
    }
  }

  /** Request a meeting — creates contact + lead + meeting_request (highest-intent) */
  async function submitMeeting(payload: SubmitMeetingPayload): Promise<{ success: boolean; leadId?: string; contactId?: string }> {
    try {
      const res = await $fetch<{ success: boolean; leadId: string; contactId: string }>('/api/submit', {
        method: 'POST',
        body: { type: 'meeting', ...payload },
      })
      return res
    } catch (e) {
      console.error('[useDirectus] submitMeeting failed:', e)
      return { success: false }
    }
  }

  /** @deprecated Use submitContact, submitAudit, submitMeeting, or submitSubscribe instead */
  async function submitRequest(payload: DirectusRequestPayload): Promise<boolean> {
    const result = await submitContact({ ...payload, email: payload.email ?? '' })
    return result.success
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  function primaryImageId(item: DirectusPortfolioItem): string | null {
    return item.featured_image
      ?? item.images?.[0]?.directus_files_id
      ?? item.projects?.[0]?.featured_image
      ?? item.projects?.[0]?.images?.[0]?.directus_files_id
      ?? null
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

  // ── Blog / Magazine ────────────────────────────────────────────

  const BLOG_FIELDS = [
    'id', 'status', 'title', 'slug', 'excerpt', 'body', 'featured_image', 'seo',
    'date_published', 'date_created', 'date_updated', 'reading_time', 'featured',
    'author.id', 'author.first_name', 'author.last_name', 'author.title',
    'author.image', 'author.photo', 'author.url',
    'categories.blog_categories_id.id', 'categories.blog_categories_id.name',
    'categories.blog_categories_id.slug', 'categories.blog_categories_id.color',
    'services.services_id.id', 'services.services_id.name', 'services.services_id.url',
    'industries.industries_id.id', 'industries.industries_id.name', 'industries.industries_id.url',
    'images.directus_files_id',
  ]

  async function fetchBlogPosts(options: {
    limit?: number
    offset?: number
    category?: string
    featured?: boolean
  } = {}): Promise<DirectusBlogPost[]> {
    const params = new URLSearchParams({
      fields: BLOG_FIELDS.join(','),
      'filter[status][_eq]': 'published',
      limit: String(options.limit ?? 20),
      sort: '-date_published,-date_created',
    })
    if (options.offset) params.set('offset', String(options.offset))
    if (options.featured) params.set('filter[featured][_eq]', 'true')
    if (options.category) params.set('filter[categories][blog_categories_id][slug][_eq]', options.category)
    const res = await directusFetch<{ data: DirectusBlogPost[] }>('items/blog', params)
    return res.data ?? []
  }

  async function fetchBlogPost(slug: string): Promise<DirectusBlogPost | null> {
    const params = new URLSearchParams({
      fields: BLOG_FIELDS.join(','),
      'filter[slug][_eq]': slug,
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await directusFetch<{ data: DirectusBlogPost[] }>('items/blog', params)
    return res.data?.[0] ?? null
  }

  async function fetchBlogCategories(): Promise<DirectusBlogCategory[]> {
    const params = new URLSearchParams({
      fields: 'id,name,slug,description,color',
      'filter[status][_eq]': 'published',
      sort: 'sort,name',
      limit: '50',
    })
    const res = await directusFetch<{ data: DirectusBlogCategory[] }>('items/blog_categories', params)
    return res.data ?? []
  }

  // ── Team / People ──────────────────────────────────────────────

  const TEAM_MEMBER_FIELDS = [
    'id', 'first_name', 'last_name', 'title', 'headline', 'bio', 'extended_bio',
    'image', 'photo', 'url', 'email', 'linkedin_url', 'instagram_handle',
    'resume_highlights', 'education', 'specialties', 'is_team_member',
  ]

  async function fetchTeamMember(url: string): Promise<DirectusBlogAuthor | null> {
    const params = new URLSearchParams({
      fields: TEAM_MEMBER_FIELDS.join(','),
      'filter[url][_eq]': url,
      'filter[is_team_member][_eq]': 'true',
      'filter[status][_eq]': 'published',
      limit: '1',
    })
    const res = await directusFetch<{ data: DirectusBlogAuthor[] }>('items/people', params)
    return res.data?.[0] ?? null
  }

  async function fetchTeamMemberPosts(authorId: number, limit = 6): Promise<DirectusBlogPost[]> {
    const params = new URLSearchParams({
      fields: BLOG_FIELDS.join(','),
      'filter[status][_eq]': 'published',
      'filter[author][_eq]': String(authorId),
      sort: '-date_published,-date_created',
      limit: String(limit),
    })
    const res = await directusFetch<{ data: DirectusBlogPost[] }>('items/blog', params)
    return res.data ?? []
  }

  return {
    baseUrl,
    assetsBase,
    assetUrl,
    fetchPortfolio,
    fetchPortfolioItem,
    fetchFeaturedPortfolio,
    fetchIndustries,
    fetchIndustryByUrl,
    fetchIndustryPortfolio,
    fetchServices,
    fetchServiceByUrl,
    fetchServicePortfolio,
    fetchServiceCaseStudies,
    fetchCaseStudies,
    fetchIndustryCaseStudies,
    fetchCaseStudyByUrl,
    fetchTestimonials,
    submitContact,
    submitAudit,
    submitMeeting,
    submitSubscribe,
    submitRequest,
    primaryImageId,
    resolvedBeforeAfters,
    primaryIndustryName,
    primaryIndustryUrl,
    stripHtml,
    fetchBlogPosts,
    fetchBlogPost,
    fetchBlogCategories,
    fetchTeamMember,
    fetchTeamMemberPosts,
  }
}

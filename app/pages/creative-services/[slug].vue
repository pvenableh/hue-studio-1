<template>
  <div v-if="service">
    <BackLink to="/creative-services">All Services</BackLink>

    <!-- Hero (pinned) -->
    <section ref="heroRef" class="relative overflow-x-clip bg-white px-2 md:px-6 py-16 lg:py-20">
      <span
        ref="bgWordRef"
        class="pointer-events-none absolute bottom-0 left-0 font-serif italic font-light text-[8rem] md:text-[14rem] lg:text-[20rem] leading-[1] opacity-[0.04] select-none translate-y-[0.2em]"
      >{{ service.word || service.name?.split(' ')[0] }}</span>
      <div class="hue-container relative">
        <p ref="heroLabel" class="hue-label mb-4">Service</p>
        <h1 ref="heroTitle" class="mb-5 max-w-[14ch] uppercase tracking-[0.08em] leading-[0.95] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]" style="font-family: var(--font)">
          {{ service.name?.split(/\s*[\/]\s*/)[0] }}<br />
          <template v-if="service.name?.includes('/')">/ {{ service.name?.split(/\s*[\/]\s*/)[1] }}</template>
        </h1>
        <p v-if="service.caption" ref="heroHeadline" class="hue-editorial-md mb-6">"{{ service.caption }}"</p>
        <div v-if="service.description" ref="heroDesc" class="hue-body-lg max-w-lg" v-html="service.description" />
      </div>
    </section>

    <!-- Industries we serve -->
    <section v-if="allIndustries?.length" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-8">Industries we serve</p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="ind in allIndustries"
            :key="ind.id"
            :to="`/industries/${ind.url}`"
            class="rounded-full border border-[var(--silk)] bg-white px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ ind.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Work for this service (case studies + portfolio merged) -->
    <section v-if="allWork.length" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Work in this service</p>
          <NuxtLink to="/portfolio" class="hue-label hue-link">
            See all <Icon name="lucide:arrow-right" class="size-3" />
          </NuxtLink>
        </div>

        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="card in allWork"
            :key="card.id"
            :to="card.to"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div class="relative flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img
                v-if="card.image"
                :src="card.image"
                :alt="card.name"
                class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-[var(--cloud)]">
                <span class="hue-label-sm">{{ card.name }}</span>
              </div>
            </div>
            <div class="p-6">
              <span class="hue-label-sm">{{ card.service }}</span>
              <span v-if="card.type === 'case-study'" class="hue-label-sm ml-2 text-[var(--silver)]">Case Study</span>
              <h3 class="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1">{{ card.name }}</h3>
              <p v-if="card.excerpt" class="mt-1.5 font-sans text-[0.75rem] font-light leading-snug text-[var(--grey)] line-clamp-2">{{ card.excerpt }}</p>
              <p v-else-if="card.client" class="mt-1 text-[0.75rem] text-[var(--color-text-muted)]">{{ card.client }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <div v-else-if="!allWork.length" class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container rounded-sm border border-[var(--silk)] bg-[var(--snow)] py-16 text-center">
        <p class="hue-editorial-md">Portfolio for this service coming soon.</p>
        <NuxtLink to="/portfolio" class="hue-link mt-4 inline-flex">Browse all work <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
      </div>
    </div>

    <!-- Other services -->
    <section class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">Explore other services</p>
          <NuxtLink
            v-for="s in otherServices"
            :key="s.id"
            :to="`/creative-services/${s.url}`"
            class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ s.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <InlineCapture
      :dark="true"
      label="Quick Start"
      :headline="`Need ${service.name}? Let's talk about your brand.`"
      button-text="Send"
      :context="`Service: ${service.name}`"
    />
  </div>

  <div v-else class="flex min-h-[60vh] items-center justify-center text-center">
    <div>
      <h1 class="hue-display-lg mb-4">Service Not Found</h1>
      <NuxtLink to="/creative-services" class="hue-link">← All Services</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem, DirectusCaseStudy } from '~/composables/useDirectus'

const route = useRoute()
const slug = route.params.slug as string

const { fetchServiceByUrl, fetchServicePortfolio, fetchServiceCaseStudies, fetchServices, fetchIndustries, assetUrl } = useDirectus()
const { parallaxElement, staggerEntrance } = useHeroAnimations()

const heroRef = ref<HTMLElement | null>(null)
const bgWordRef = ref<HTMLElement | null>(null)
const heroLabel = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroHeadline = ref<HTMLElement | null>(null)
const heroDesc = ref<HTMLElement | null>(null)

parallaxElement(bgWordRef, 0.3)
staggerEntrance([heroLabel, heroTitle, heroHeadline, heroDesc])

const { data: service } = await useAsyncData(`service-${slug}`, () => fetchServiceByUrl(slug))

if (!service.value) throw createError({ statusCode: 404, statusMessage: 'Service not found' })

const [{ data: portfolioItems }, { data: allServicesData }, { data: allIndustries }, { data: serviceCaseStudies }] = await Promise.all([
  useAsyncData(`service-portfolio-${slug}`, () => fetchServicePortfolio(service.value!.id)),
  useAsyncData('services-all', () => fetchServices()),
  useAsyncData('industries-all', () => fetchIndustries()),
  useAsyncData(`service-case-studies-${slug}`, () => fetchServiceCaseStudies(service.value!.id)),
])

/** Other services for cross-link */
const otherServices = computed(() =>
  (allServicesData.value ?? []).filter((s) => s.url !== slug)
)

/** Unified work grid: case studies first, then portfolio */
interface WorkCard {
  id: string
  type: 'portfolio' | 'case-study'
  name: string
  excerpt: string | null
  to: string
  image: string | null
  service: string | null
  client: string | null
}

const allWork = computed<WorkCard[]>(() => {
  const cards: WorkCard[] = []

  // Case studies first
  for (const cs of (serviceCaseStudies.value ?? [])) {
    if (!cs.id) continue
    cards.push({
      id: cs.id,
      type: 'case-study',
      name: cs.title ?? '',
      excerpt: cs.excerpt ?? null,
      to: `/case-studies/${cs.url}`,
      image: csImage(cs),
      service: cs.services?.[0]?.services_id?.name ?? service.value?.name ?? null,
      client: cs.organization?.name ?? cs.client ?? null,
    })
  }

  // Then portfolio items
  const seen = new Set<string>()
  for (const p of (portfolioItems.value ?? [])) {
    if (!p.id || seen.has(p.id)) continue
    seen.add(p.id)
    cards.push({
      id: p.id,
      type: 'portfolio',
      name: p.name ?? '',
      excerpt: null,
      to: `/portfolio/${p.url}`,
      image: imgUrl(p),
      service: p.service?.name ?? null,
      client: p.client?.name ?? null,
    })
  }

  return cards.slice(0, 12)
})

function imgUrl(item: DirectusPortfolioItem) {
  if (item.featured_image) return assetUrl(item.featured_image, 'medium-contain')
  if (item.images?.[0]?.directus_files_id) return assetUrl(item.images[0].directus_files_id, 'medium-contain')
  for (const child of (item.projects ?? []) as DirectusPortfolioItem[]) {
    const id = child.featured_image ?? child.images?.[0]?.directus_files_id
    if (id) return assetUrl(id, 'medium-contain')
  }
  return null
}

function csImage(cs: DirectusCaseStudy): string | null {
  if (cs.featured_image) return assetUrl(cs.featured_image, 'medium-contain')
  if (cs.organization?.logo) return assetUrl(cs.organization.logo, 'medium-contain')
  if (cs.organization?.icon) return assetUrl(cs.organization.icon, 'medium-contain')
  const pi = cs.portfolio_items?.find((p) => p.portfolio_id?.featured_image)
  if (pi?.portfolio_id?.featured_image) return assetUrl(pi.portfolio_id.featured_image, 'medium-contain')
  const piGallery = cs.portfolio_items?.find((p) => p.portfolio_id?.images?.[0]?.directus_files_id)
  if (piGallery?.portfolio_id?.images?.[0]?.directus_files_id) return assetUrl(piGallery.portfolio_id.images[0].directus_files_id, 'medium-contain')
  for (const link of (cs.portfolio_items ?? [])) {
    for (const child of (link.portfolio_id?.projects ?? []) as any[]) {
      const id = child.featured_image ?? child.images?.[0]?.directus_files_id
      if (id) return assetUrl(id, 'medium-contain')
    }
  }
  return null
}

useSeoMeta({
  title: `${service.value?.name ?? 'Service'} | Creative Services | Hue Studios`,
  description: service.value?.caption ?? `Creative ${service.value?.name} services by Hue.`,
})

useSchemaOrg([
  {
    '@type': 'Service',
    'name': service.value?.name ?? '',
    'description': service.value?.caption ?? '',
    'provider': { '@id': 'https://huestudios.com' },
  },
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://huestudios.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Creative Services', 'item': 'https://huestudios.com/creative-services' },
      { '@type': 'ListItem', 'position': 3, 'name': service.value?.name ?? 'Service' },
    ],
  },
])

defineOgImage({
  component: 'HueOg',
  props: {
    title: service.value?.name,
    description: service.value?.caption,
    label: 'Services',
  },
})
</script>

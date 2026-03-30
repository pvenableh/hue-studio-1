<template>
  <div v-if="industry">
    <div class="bg-white px-4 md:px-6 py-2">
      <NuxtLink to="/industries" class="hue-link text-[0.6875rem] text-[var(--silver)]">
        <Icon name="lucide:arrow-left" class="size-3" /> All Industries
      </NuxtLink>
    </div>

    <!-- Hero -->
    <section class="relative overflow-hidden px-2 md:px-6 py-16 lg:py-20">
      <span
        class="pointer-events-none absolute bottom-0 left-0 font-serif italic font-light text-[8rem] md:text-[14rem] lg:text-[20rem] leading-[0.7] opacity-[0.04] select-none translate-y-[0.15em]"
      >{{ industry.name?.split(' ')[0] }}</span>
      <div class="hue-container relative">
        <p class="hue-label mb-4">Industry</p>
        <h1 class="mb-5 max-w-[14ch] uppercase tracking-[0.08em] leading-[0.95] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]" style="font-family: var(--font)">
          {{ industry.name?.split(' ')[0] }}<br />
          {{ industry.name?.split(' ').slice(1).join(' ').replace('& ', '/ ') }}
        </h1>
        <p v-if="industry.headline" class="hue-editorial-md mb-6">"{{ industry.headline }}"</p>
        <p v-if="industry.description" class="hue-body-lg max-w-lg">{{ industry.description }}</p>
      </div>
    </section>

    <!-- Services for this industry (derived from portfolio) -->
    <section v-if="serviceNames.length" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-8">Services we provide</p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="svc in serviceLinks"
            :key="svc.name"
            :to="svc.url ? `/creative-services/${svc.url}` : '/creative-services'"
            class="rounded-full border border-[var(--silk)] bg-white px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ svc.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Work in this industry (case studies + portfolio merged) -->
    <section v-if="allWork.length" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Work in this industry</p>
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
        <p class="hue-editorial-md">Portfolio for this industry coming soon.</p>
        <NuxtLink to="/portfolio" class="hue-link mt-4 inline-flex">Browse all work <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
      </div>
    </div>

    <!-- Other industries -->
    <section class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">Explore other industries</p>
          <NuxtLink
            v-for="ind in otherIndustries"
            :key="ind.id"
            :to="`/industries/${ind.url}`"
            class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ ind.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Inline capture -->
    <InlineCapture
      :dark="true"
      label="Quick Start"
      :headline="`In ${industry.name?.split('&')[0].trim()}? Let's talk about your brand.`"
      button-text="Send"
      :context="`Industry: ${industry.name}`"
    />
  </div>

  <div v-else class="flex min-h-[60vh] items-center justify-center text-center">
    <div>
      <h1 class="hue-display-lg mb-4">Industry Not Found</h1>
      <NuxtLink to="/industries" class="hue-link">← All Industries</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem, DirectusCaseStudy, DirectusIndustry } from '~/composables/useDirectus'

const route = useRoute()
const slug = route.params.slug as string

const { fetchIndustryByUrl, fetchIndustryPortfolio, fetchIndustries, fetchIndustryCaseStudies, fetchServices, assetUrl } = useDirectus()

const { data: industry } = await useAsyncData(`industry-${slug}`, () => fetchIndustryByUrl(slug))

if (!industry.value) throw createError({ statusCode: 404, statusMessage: 'Industry not found' })

const [{ data: portfolioItems }, { data: allIndustries }, { data: industryCaseStudyData }, { data: allServices }] = await Promise.all([
  useAsyncData(`industry-portfolio-${slug}`, () => fetchIndustryPortfolio(industry.value!.id)),
  useAsyncData('industries-all', () => fetchIndustries()),
  useAsyncData(`industry-case-studies-${slug}`, () => fetchIndustryCaseStudies(industry.value!.id)),
  useAsyncData('services-all', () => fetchServices()),
])

/** Portfolio items linked to this industry (parent items as they appear in Directus) */
const industryProjects = computed(() => {
  const seen = new Set<string>()
  return (portfolioItems.value ?? []).filter((p) => {
    if (!p.id || seen.has(p.id)) return false
    seen.add(p.id)
    return true
  }).slice(0, 9)
})

/** Client names derived from portfolio items in this industry */
const clientNames = computed(() => {
  const names = new Set<string>()
  ;(portfolioItems.value ?? []).forEach((p) => {
    if (p.client?.name) names.add(p.client.name)
    ;(p.projects ?? []).forEach((child: DirectusPortfolioItem) => {
      if ((child as any).client?.name) names.add((child as any).client.name)
    })
  })
  return [...names]
})

/** All services, ordered by relevance to this industry (services used in portfolio/case studies first) */
const serviceLinks = computed(() => {
  // Count how many times each service appears in this industry's work
  const counts = new Map<string, number>()
  ;(portfolioItems.value ?? []).forEach((p) => {
    if (p.service?.name) counts.set(p.service.name, (counts.get(p.service.name) ?? 0) + 1)
    ;((p.projects ?? []) as DirectusPortfolioItem[]).forEach((child) => {
      if (child.service?.name) counts.set(child.service.name, (counts.get(child.service.name) ?? 0) + 1)
    })
  })
  ;(industryCaseStudyData.value ?? []).forEach((cs) => {
    cs.services?.forEach((s) => {
      if (s.services_id?.name) counts.set(s.services_id.name, (counts.get(s.services_id.name) ?? 0) + 1)
    })
  })

  // Show all services, sorted: most relevant to this industry first, then by Directus sort
  return (allServices.value ?? []).map((s) => ({
    name: s.name,
    url: s.url ?? null,
    relevance: counts.get(s.name) ?? 0,
  })).sort((a, b) => b.relevance - a.relevance || 0)
})

const serviceNames = computed(() => serviceLinks.value.map((s) => s.name))

/** Case studies linked to this industry (directly from Directus M2M) */
const industryCaseStudies = computed(() => (industryCaseStudyData.value ?? []).slice(0, 6))

/** Unified work grid: portfolio items + case studies merged, deduped, sorted */
interface WorkCard {
  id: string
  type: 'portfolio' | 'case-study'
  name: string
  excerpt: string | null
  to: string
  image: string | null
  service: string | null
  client: string | null
  sort: number
}

const allWork = computed<WorkCard[]>(() => {
  const cards: WorkCard[] = []

  // Case studies first
  for (const cs of (industryCaseStudyData.value ?? [])) {
    if (!cs.id) continue
    cards.push({
      id: cs.id,
      type: 'case-study',
      name: cs.title ?? '',
      excerpt: cs.excerpt ?? null,
      to: `/case-studies/${cs.url}`,
      image: csImage(cs),
      service: cs.services?.[0]?.services_id?.name ?? null,
      client: cs.organization?.name ?? cs.client ?? null,
      sort: 0,
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
      to: `/portfolio/${p.slug || p.url}`,
      image: imgUrl(p),
      service: p.service?.name ?? null,
      client: p.client?.name ?? null,
      sort: p.sort ?? 999,
    })
  }

  return cards.slice(0, 12)
})

/** Other industries for the cross-link bar */
const otherIndustries = computed(() =>
  (allIndustries.value ?? []).filter((i) => i.url !== slug).slice(0, 6)
)

function imgUrl(item: DirectusPortfolioItem) {
  // 1. Item's own featured image
  if (item.featured_image) return assetUrl(item.featured_image, 'medium-contain')
  // 2. Item's own gallery
  if (item.images?.[0]?.directus_files_id) return assetUrl(item.images[0].directus_files_id, 'medium-contain')
  // 3. First child project's featured image or gallery
  for (const child of (item.projects ?? []) as DirectusPortfolioItem[]) {
    const id = child.featured_image ?? child.images?.[0]?.directus_files_id
    if (id) return assetUrl(id, 'medium-contain')
  }
  return null
}

function csImage(cs: DirectusCaseStudy): string | null {
  // 1. Case study's own featured image
  if (cs.featured_image) return assetUrl(cs.featured_image, 'medium-contain')
  // 2. Organization logo or icon
  if (cs.organization?.logo) return assetUrl(cs.organization.logo, 'medium-contain')
  if (cs.organization?.icon) return assetUrl(cs.organization.icon, 'medium-contain')
  // 3. Linked portfolio item's featured image
  const pi = cs.portfolio_items?.find((p) => p.portfolio_id?.featured_image)
  if (pi?.portfolio_id?.featured_image) return assetUrl(pi.portfolio_id.featured_image, 'medium-contain')
  // 4. Linked portfolio item's gallery
  const piGallery = cs.portfolio_items?.find((p) => p.portfolio_id?.images?.[0]?.directus_files_id)
  if (piGallery?.portfolio_id?.images?.[0]?.directus_files_id) return assetUrl(piGallery.portfolio_id.images[0].directus_files_id, 'medium-contain')
  // 5. Linked portfolio item's child project image
  for (const link of (cs.portfolio_items ?? [])) {
    for (const child of (link.portfolio_id?.projects ?? []) as any[]) {
      const id = child.featured_image ?? child.images?.[0]?.directus_files_id
      if (id) return assetUrl(id, 'medium-contain')
    }
  }
  return null
}

useSeoMeta({
  title: `${industry.value?.name ?? 'Industry'} | Industries | Hue Creative Agency`,
  description: industry.value?.description ?? `Creative marketing services for the ${industry.value?.name} industry.`,
})

defineOgImage({
  component: 'HueOg',
  props: {
    title: industry.value?.name ?? 'Industry',
    description: industry.value?.headline ?? industry.value?.description ?? '',
    label: 'Industries',
  },
})

useScrollReveal()
</script>

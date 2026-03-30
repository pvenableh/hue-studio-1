<template>
  <div v-if="industry">
    <div class="border-b border-[var(--silk)] bg-white px-2 md:px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/industries" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" /> All Industries
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="grid border-b border-[var(--silk)] lg:grid-cols-[1fr_360px]">
      <div class="px-8 py-16 lg:px-14 lg:py-20">
        <p class="hue-label mb-4">Industry</p>
        <h1 class="hue-display-lg mb-5">{{ industry.name }}</h1>
        <p v-if="industry.headline" class="hue-editorial-md mb-6">"{{ industry.headline }}"</p>
        <p v-if="industry.description" class="hue-body-lg max-w-lg">{{ industry.description }}</p>
      </div>
      <div class="bg-[var(--near-black)] px-10 py-16">
        <p class="hue-label-sm mb-5 text-white/30">Clients in this sector</p>
        <div class="mb-8 space-y-2">
          <p v-for="name in clientNames" :key="name" class="text-[0.875rem] text-white/60">{{ name }}</p>
          <p v-if="!clientNames.length" class="text-[0.875rem] text-white/30 italic">Portfolio work available — enquire directly.</p>
        </div>
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

    <!-- Case Studies for this industry -->
    <section v-if="industryCaseStudies.length" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Case studies</p>
          <NuxtLink to="/case-studies" class="hue-link text-[0.8125rem]">
            All case studies <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>

        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2">
          <NuxtLink
            v-for="cs in industryCaseStudies"
            :key="cs.id"
            :to="`/case-studies/${cs.url}`"
            class="group flex flex-col justify-between bg-white p-8 transition-colors hover:bg-[var(--snow)]"
          >
            <div>
              <div class="mb-4 flex flex-wrap gap-1.5">
                <span
                  v-for="svc in cs.services?.slice(0,2)"
                  :key="svc.services_id?.id"
                  class="hue-label-sm"
                >{{ svc.services_id?.name }}</span>
              </div>

              <div v-if="csImage(cs)" class="mb-5 flex items-center justify-center overflow-hidden rounded-lg bg-white" style="aspect-ratio:16/9;">
                <img
                  :src="csImage(cs)!"
                  :alt="cs.title ?? ''"
                  class="max-h-[70%] max-w-[75%] object-contain"
                  loading="lazy"
                />
              </div>

              <h3 class="hue-display-md mb-2 transition-transform duration-300 group-hover:translate-x-1">{{ cs.title }}</h3>
              <p v-if="cs.excerpt" class="hue-editorial-md line-clamp-2">{{ cs.excerpt }}</p>
            </div>

            <div class="mt-6 flex items-center justify-end">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--silk)] transition-all duration-300 group-hover:border-[var(--near-black)] group-hover:bg-[var(--near-black)]">
                <Icon name="lucide:arrow-right" class="size-3.5 text-[var(--silver)] transition-colors group-hover:text-white" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Portfolio for this industry (from Directus M2M) -->
    <section v-if="industryProjects.length" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Work in this industry</p>
          <NuxtLink to="/portfolio" class="hue-link text-[0.8125rem]">
            See all <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>

        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="item in industryProjects"
            :key="item.id"
            :to="`/portfolio/${item.slug || item.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div class="relative flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img
                v-if="imgUrl(item)"
                :src="imgUrl(item)"
                :alt="item.name"
                class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-[var(--cloud)]">
                <span class="hue-label-sm">{{ item.client?.name || item.name }}</span>
              </div>
            </div>
            <div class="p-6">
              <span class="hue-label-sm">{{ item.service?.name }}</span>
              <h3 class="mt-2 text-[1rem] font-light transition-transform duration-300 group-hover:translate-x-1">{{ item.name }}</h3>
              <p v-if="item.client" class="mt-1 text-[0.8125rem] text-[var(--color-text-muted)]">{{ item.client.name }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <div v-else-if="!industryProjects.length && !industryCaseStudies.length" class="hue-section px-2 md:px-6 py-16">
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

const { fetchIndustryByUrl, fetchIndustryPortfolio, fetchIndustries, fetchCaseStudies, assetUrl } = useDirectus()

const { data: industry } = await useAsyncData(`industry-${slug}`, () => fetchIndustryByUrl(slug))

if (!industry.value) throw createError({ statusCode: 404, statusMessage: 'Industry not found' })

const [{ data: portfolioItems }, { data: allIndustries }, { data: allCaseStudies }] = await Promise.all([
  useAsyncData(`industry-portfolio-${slug}`, () => fetchIndustryPortfolio(industry.value!.id)),
  useAsyncData('industries-all', () => fetchIndustries()),
  useAsyncData(`industry-case-studies-${slug}`, () => fetchCaseStudies({ limit: 50 })),
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

/** Service names and URLs derived from portfolio items + their children */
const serviceLinks = computed(() => {
  const map = new Map<string, string | null>()
  ;(portfolioItems.value ?? []).forEach((p) => {
    if (p.service?.name && !map.has(p.service.name)) {
      map.set(p.service.name, p.service.url ?? null)
    }
    // Children have expanded service from the fetch
    ;((p.projects ?? []) as DirectusPortfolioItem[]).forEach((child) => {
      if (child.service?.name && !map.has(child.service.name)) {
        map.set(child.service.name, child.service.url ?? null)
      }
    })
  })
  return [...map.entries()].map(([name, url]) => ({ name, url }))
})

const serviceNames = computed(() => serviceLinks.value.map((s) => s.name))

/** Case studies that share this industry */
const industryCaseStudies = computed(() =>
  (allCaseStudies.value ?? []).filter((cs) =>
    cs.industries?.some((i) => i.industries_id?.id === industry.value?.id)
  ).slice(0, 4)
)

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
  if (cs.featured_image) return assetUrl(cs.featured_image, 'medium-contain')
  const pi = cs.portfolio_items?.find((p) => p.portfolio_id?.featured_image)
  if (pi?.portfolio_id?.featured_image) return assetUrl(pi.portfolio_id.featured_image, 'medium-contain')
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

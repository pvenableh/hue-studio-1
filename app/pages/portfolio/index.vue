<template>
  <div>
    <!-- Hero -->
    <section class="hue-section relative overflow-x-clip px-2 md:px-6 pb-12 pt-20 md:pt-28">
      <SectionWatermark word="Work" />
      <div class="hue-container relative">
        <p class="hue-label mb-4">Our Work</p>
        <h1 class="hue-display-xl mb-5">
          Work that <span style="font-family:var(--font-editorial);font-style:italic;">performs</span><br>as well as it looks.
        </h1>
        <p class="hue-body max-w-lg">Every project starts with a business problem. Here's how we solved them.</p>
      </div>
    </section>

    <!-- Filters (hidden for now) -->
    <!-- <PortfolioFilters
      :service-filters="serviceFilters"
      :industries="dynamicIndustries"
      :active-service="activeService"
      :active-industry="activeIndustry"
      :count="filtered.length"
      @update:service="activeService = $event"
      @update:industry="activeIndustry = $event"
    /> -->

    <!-- Grid -->
    <section class="hue-section px-2 md:px-6 pb-24 pt-12">
      <div class="hue-container">
        <!-- Loading -->
        <div v-if="pending" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="h-80 animate-pulse rounded-sm bg-[var(--cloud)]" />
        </div>

        <!-- Empty -->
        <div v-else-if="!gridItems.length" class="py-20 text-center">
          <p class="hue-editorial-md">No projects match this combination.</p>
          <button class="hue-link mt-4" @click="activeService = 'All'; activeIndustry = 'All'">Clear filters</button>
        </div>

        <!-- Projects -->
        <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <PortfolioCard
            v-for="item in gridItems"
            :key="item.id"
            :item="item"
            :image-src="imgUrl(item)"
            aspect-ratio="3/2"
            compact
            overlay
            @click="onPortfolioCardClick(item)"
          />
        </div>
      </div>
    </section>

    <!-- Industry cross-links -->
    <section class="hue-section-alt px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">Browse by industry</p>
          <NuxtLink
            v-for="ind in staticIndustries"
            :key="ind.slug"
            :to="`/industries/${ind.slug}`"
            class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >
            {{ ind.name }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="hue-section-dark px-2 md:px-6 py-24 text-center">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-5 text-white">Your brand could be<br>the next case study<br>we're <span style="font-family:var(--font-editorial);font-style:italic;color:var(--color-accent-on-dark);">proud to show.</span></h2>
        <p class="mb-8 text-[0.9375rem] text-white/40">30-minute strategy session. No pitch decks. Just conversation.</p>
        <NuxtLink to="/contact" class="hue-btn-ghost">
          Book a Strategy Session
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'
import { industries as staticIndustries } from '~/data/industries'

useSeoMeta({
  title: 'Portfolio | Creative Marketing Work | Hue',
  description: 'Browse our portfolio of brand strategy, web design, print, and creative marketing work for growth-stage companies.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Portfolio', description: 'Selected work across brand, digital, print, and video.', label: 'Portfolio' } })

const { fetchPortfolio, assetUrl, primaryImageId, primaryIndustryName } = useDirectus()

const { data: allItems, pending } = await useAsyncData('portfolio-all', () => fetchPortfolio({ limit: 100, featured: true }))

const activeService  = ref('All')
const activeIndustry = ref('All')

const serviceFilters = computed(() => {
  const names = new Set<string>(['All'])
  ;(allItems.value ?? []).forEach((p) => { if (p.service?.name) names.add(p.service.name) })
  return [...names]
})

const dynamicIndustries = computed(() => {
  const names = new Set<string>()
  ;(allItems.value ?? []).forEach((p) =>
    p.industries?.forEach((i) => { if (i.industries_id?.name) names.add(i.industries_id.name) })
  )
  return [...names].sort()
})

const filtered = computed(() => {
  return (allItems.value ?? []).filter((p) => {
    const svc = activeService.value === 'All' || p.service?.name === activeService.value
    const ind = activeIndustry.value === 'All' ||
      p.industries?.some((i) => i.industries_id?.name === activeIndustry.value)
    return svc && ind
  })
})

const gridItems = computed(() => filtered.value)

const { trackPortfolioItemView, useScrollDepthTracker } = useTracking()

onMounted(() => {
  useScrollDepthTracker()
})

function onPortfolioCardClick(item: DirectusPortfolioItem) {
  trackPortfolioItemView(item.url ?? '', item.name ?? '')
}

function imgUrl(item: DirectusPortfolioItem) {
  const id = primaryImageId(item)
  return id ? assetUrl(id, 'medium-contain') : null
}
</script>

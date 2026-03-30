<template>
  <div>
    <!-- Hero -->
    <section class="hue-section relative overflow-hidden px-2 md:px-6 pb-12 pt-20 md:pt-28">
      <SectionWatermark word="Work" top="1rem" />
      <div class="hue-container relative">
        <p class="hue-label mb-4">Our Work</p>
        <h1 class="hue-display-xl mb-5">
          Work that <span style="font-family:var(--font-editorial);font-style:italic;">performs</span><br>as well as it looks.
        </h1>
        <p class="hue-body max-w-lg">Every project starts with a business problem. Here's how we solved them.</p>
      </div>
    </section>

    <!-- Filters -->
    <PortfolioFilters
      :service-filters="serviceFilters"
      :industries="dynamicIndustries"
      :active-service="activeService"
      :active-industry="activeIndustry"
      :count="filtered.length"
      @update:service="activeService = $event"
      @update:industry="activeIndustry = $event"
    />

    <!-- Featured Case Studies -->
    <section v-if="activeService === 'All' && activeIndustry === 'All' && featuredItems.length" class="px-2 md:px-6 pt-12">
      <div class="hue-container">
        <p class="hue-label mb-8">Featured Case Studies</p>
        <div class="space-y-12">
          <NuxtLink
            v-for="(item, i) in featuredItems"
            :key="item.id"
            :to="`/portfolio/${item.slug || item.url}`"
            class="group grid overflow-hidden md:grid-cols-2"
            :class="i % 2 === 1 ? 'md:[direction:rtl]' : ''"
          >
            <!-- Image -->
            <div class="relative flex items-center justify-center overflow-hidden bg-white" :class="i % 2 === 1 ? 'md:[direction:ltr]' : ''" style="aspect-ratio: 4/3">
              <img
                v-if="imgUrl(item, true)"
                :src="imgUrl(item, true)"
                :alt="item.name"
                class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-white">
                <span class="hue-label">{{ item.client?.short_name || item.name }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex flex-col justify-between p-10 md:[direction:ltr]">
              <div>
                <p class="mb-2 text-[0.625rem] tracking-widest text-[var(--silver)]">{{ String(i + 1).padStart(2, '0') }} / Featured</p>
                <p class="hue-label-sm mb-3" style="color: var(--color-accent);">{{ item.service?.name }}{{ industryName(item) ? ` · ${industryName(item)}` : '' }}</p>
                <h2 class="mb-4 text-[1.75rem] font-light leading-tight">{{ item.name }}</h2>
                <p
                  v-if="item.synopsis"
                  class="mb-6 line-clamp-3 text-[0.875rem] leading-relaxed text-[var(--grey)]"
                  v-html="stripTags(item.synopsis)"
                />
                <!-- Result callout -->
                <div v-if="item.results" class="mb-6 border-l-2 border-[var(--color-accent)] bg-[var(--snow)] py-2 pl-4">
                  <p class="mb-1 text-[0.5625rem] font-medium uppercase tracking-widest" style="color: var(--color-accent);">Business Outcome</p>
                  <p class="line-clamp-2 text-[0.9375rem] italic leading-snug" style="font-family:var(--font-editorial);" v-html="stripTags(item.results)" />
                </div>
              </div>
              <div class="flex items-end justify-between">
                <div class="flex gap-6">
                  <div>
                    <p class="hue-label-sm mb-1 text-[var(--silver)]">Services</p>
                    <p class="text-[0.75rem] text-[var(--grey)]">{{ item.service?.name }}</p>
                  </div>
                  <!-- Year hidden until data is updated -->
                  <!-- <div v-if="item.project_year">
                    <p class="hue-label-sm mb-1 text-[var(--silver)]">Year</p>
                    <p class="text-[0.75rem]" :class="i % 2 === 1 ? 'text-white/50' : 'text-[var(--grey)]'">{{ item.project_year }}</p>
                  </div> -->
                </div>
                <span class="text-[0.6875rem] uppercase tracking-wider" style="color: var(--color-accent);">View Case Study →</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="hue-section px-2 md:px-6 pb-24 pt-12">
      <div class="hue-container">
        <p v-if="featuredItems.length && activeService === 'All' && activeIndustry === 'All'" class="hue-label mb-8">More Work</p>

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
          <NuxtLink
            v-for="item in gridItems"
            :key="item.id"
            :to="`/portfolio/${item.slug || item.url}`"
            class="group relative block overflow-hidden bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <!-- Image -->
            <div class="relative flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 3/2">
              <img
                v-if="imgUrl(item)"
                :src="imgUrl(item)"
                :alt="item.name"
                class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-white">
                <span class="hue-label-sm">{{ item.client?.short_name || item.name }}</span>
              </div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 flex flex-col justify-center bg-[var(--color-accent)]/90 p-7 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
                <p class="mb-3 text-lg italic text-white" style="font-family:var(--font-editorial);">{{ item.name }}</p>
                <p v-if="item.synopsis" class="mb-4 line-clamp-3 text-[0.8125rem] leading-relaxed text-white/80" v-html="stripTags(item.synopsis)" />
                <span class="inline-block border-b border-white/40 pb-0.5 text-[0.625rem] uppercase tracking-widest text-white">View Case Study →</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-5">
              <p class="hue-label-sm mb-1.5" style="color: var(--color-accent);">{{ item.service?.name }}{{ industryName(item) ? ` · ${industryName(item)}` : '' }}</p>
              <h2 class="text-[1rem] font-light leading-snug">{{ item.name }}</h2>
              <p v-if="item.client" class="mt-1 text-[0.75rem] text-[var(--grey)]">{{ item.client.name }}</p>
            </div>
          </NuxtLink>
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

const { fetchPortfolio, fetchFeaturedPortfolio, assetUrl, primaryImageId, primaryIndustryName, stripHtml } = useDirectus()

const [{ data: allItems, pending }, { data: featured }] = await Promise.all([
  useAsyncData('portfolio-all', () => fetchPortfolio({ limit: 100, parentOnly: true })),
  useAsyncData('portfolio-featured', () => fetchFeaturedPortfolio({ limit: 3 })),
])

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

const featuredItems = computed(() => featured.value ?? [])
const featuredIds = computed(() => new Set(featuredItems.value.map((f) => f.id)))

// Grid shows filtered items minus featured (when unfiltered)
const gridItems = computed(() => {
  if (activeService.value !== 'All' || activeIndustry.value !== 'All') return filtered.value
  return filtered.value.filter((p) => !featuredIds.value.has(p.id))
})

function imgUrl(item: DirectusPortfolioItem, wide = false) {
  const id = primaryImageId(item)
  return id ? assetUrl(id, wide ? 'large' : 'medium') : null
}

function industryName(item: DirectusPortfolioItem) {
  return primaryIndustryName(item)
}

function stripTags(html: string) {
  return stripHtml(html)
}
</script>

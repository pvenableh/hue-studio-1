<template>
  <div>
    <!-- Hero -->
    <section class="hue-section px-6 pb-12 pt-20 md:pt-28">
      <div class="hue-container">
        <p class="hue-label mb-4">Portfolio</p>
        <h1 class="hue-display-xl mb-5">
          Work that <span style="font-family:var(--font-editorial);font-style:italic;">performs</span><br>as well as it looks.
        </h1>
        <p class="hue-body max-w-lg">Every project starts with understanding why. Browse by service or industry below.</p>
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

    <!-- Grid -->
    <section class="hue-section px-6 pb-24 pt-8">
      <div class="hue-container">
        <!-- Loading -->
        <div v-if="pending" class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="h-80 animate-pulse bg-[var(--cloud)]" />
        </div>

        <!-- Empty -->
        <div v-else-if="!filtered.length" class="py-20 text-center">
          <p class="hue-editorial-md">No projects match this combination.</p>
          <button class="hue-link mt-4" @click="activeService = 'All'; activeIndustry = 'All'">Clear filters</button>
        </div>

        <!-- Projects -->
        <div v-else class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="(item, i) in filtered"
            :key="item.id"
            :to="`/portfolio/${item.slug || item.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
            :class="{ 'md:col-span-2 lg:col-span-1': i === 0 }"
          >
            <!-- Image -->
            <div class="relative overflow-hidden" :style="i === 0 ? 'aspect-ratio: 16/9' : 'aspect-ratio: 4/3'">
              <img
                v-if="imgUrl(item)"
                :src="imgUrl(item, i === 0)"
                :alt="item.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                :loading="i < 3 ? 'eager' : 'lazy'"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-[var(--cloud)]">
                <span class="hue-label-sm">{{ item.client?.short_name }}</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-7">
              <div class="mb-2.5 flex items-center justify-between gap-2">
                <span class="hue-label-sm">{{ item.service?.name }}</span>
                <button
                  v-if="industryName(item)"
                  class="rounded-full border border-[var(--silk)] px-2.5 py-0.5 text-[0.7rem] text-[var(--silver)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
                  @click.prevent="activeIndustry = industryRaw(item)"
                >
                  {{ industryName(item) }}
                </button>
              </div>
              <h2 class="text-[1.05rem] font-light leading-snug transition-transform duration-300 group-hover:translate-x-1">
                {{ item.name }}
              </h2>
              <p v-if="item.client" class="mt-1 text-[0.8125rem] text-[var(--color-text-muted)]">{{ item.client.name }}</p>
              <p
                v-if="item.caption"
                class="mt-3 line-clamp-2 text-[0.8125rem] italic leading-relaxed text-[var(--dark-grey)]"
                v-html="stripTags(item.caption)"
              />
              <div class="mt-5 flex items-center justify-between">
                <span class="text-[0.75rem] text-[var(--silver)]">{{ item.slug || item.url }}</span>
                <div class="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--silk)] transition-all duration-200 group-hover:border-[var(--near-black)] group-hover:bg-[var(--near-black)]">
                  <Icon name="lucide:arrow-right" class="size-3 text-[var(--silver)] transition-colors group-hover:text-white" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Industry cross-links -->
    <section class="hue-section-alt px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">Browse by industry</p>
          <NuxtLink
            v-for="ind in staticIndustries"
            :key="ind.slug"
            :to="`/industries/${ind.slug}`"
            class="rounded-full border border-[var(--silk)] px-4 py-2 text-[0.8125rem] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >
            {{ ind.name }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="hue-section-dark px-6 py-24 text-center">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-5 text-white">Your brand could be<br>the next case study.</h2>
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
  title: 'Portfolio | B2B Creative Work | Hue Creative Agency',
  description: 'Browse our portfolio of brand strategy, web design, print, and corporate design work for B2B companies across construction, real estate, professional services, and more.',
})

const { fetchPortfolio, assetUrl, primaryImageId, primaryIndustryName, stripHtml } = useDirectus()

const { data: allItems, pending } = await useAsyncData('portfolio-all', () => fetchPortfolio({ limit: 100 }))

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

function imgUrl(item: DirectusPortfolioItem, wide = false) {
  const id = primaryImageId(item)
  return id ? assetUrl(id, { width: wide ? 800 : 600, height: wide ? 450 : 400, fit: 'cover', quality: 80 }) : null
}

function industryRaw(item: DirectusPortfolioItem) {
  return item.industries?.[0]?.industries_id?.name ?? 'All'
}

function industryName(item: DirectusPortfolioItem) {
  return primaryIndustryName(item)
}

function stripTags(html: string) {
  return stripHtml(html)
}
</script>

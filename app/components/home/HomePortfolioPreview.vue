<template>
  <div>
    <div v-if="pending" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-64 animate-pulse bg-[var(--cloud)]" />
    </div>

    <div v-else-if="featured.length" class="portfolio-carousel scrollbar-hide -mx-2 flex snap-x snap-mandatory gap-px overflow-x-auto px-2 md:-mx-0 md:px-0">
      <div
        v-for="(item, i) in featured"
        :key="item.id"
        class="w-[85%] flex-shrink-0 snap-start md:w-[calc(33.333%_-_1px)]"
      >
        <PortfolioCard
          :item="item"
          :image-src="imgUrl(item)"
          :eager="i === 0"
          aspect-ratio="4/3"
        />
      </div>
    </div>

    <div class="mt-8 flex justify-center sm:hidden">
      <NuxtLink to="/portfolio" class="hue-link">
        View all work
        <Icon name="lucide:arrow-right" class="size-3.5" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'

const { fetchFeaturedPortfolio, assetUrl } = useDirectus()

const { data: items, pending } = await useAsyncData('home-portfolio-featured', () =>
  fetchFeaturedPortfolio({ limit: 6 })
)

const featured = computed(() => items.value ?? [])

function imgUrl(item: DirectusPortfolioItem) {
  const id = item.featured_image ?? item.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'medium-contain') : null
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

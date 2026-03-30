<template>
  <div>
    <div v-if="pending" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-64 animate-pulse bg-[var(--cloud)]" />
    </div>

    <div v-else-if="featured.length" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-3">
      <NuxtLink
        v-for="(item, i) in featured"
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
            :loading="i === 0 ? 'eager' : 'lazy'"
          />
          <div v-else class="h-full w-full bg-white flex items-center justify-center">
            <span class="hue-label-sm">{{ item.client?.short_name }}</span>
          </div>
        </div>
        <div class="p-6">
          <div class="mb-2 flex items-center justify-between">
            <span class="hue-label-sm">{{ item.service?.name }}</span>
            <span class="hue-label-sm text-[var(--silver)]">{{ industryName(item) }}</span>
          </div>
          <h3 class="text-[1rem] font-light leading-snug transition-transform duration-300 group-hover:translate-x-1">{{ item.name }}</h3>
          <p v-if="item.client" class="mt-1 text-[0.8125rem] text-[var(--color-text-muted)]">{{ item.client.name }}</p>
          <p v-if="item.caption" class="mt-3 text-[0.8125rem] italic text-[var(--dark-grey)] leading-relaxed line-clamp-2" v-html="stripTags(item.caption)" />
        </div>
      </NuxtLink>
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

const { fetchPortfolio, assetUrl } = useDirectus()

const { data: items, pending } = await useAsyncData('home-portfolio', () =>
  fetchPortfolio({ limit: 6 })
)

const featured = computed(() => (items.value ?? []).slice(0, 3))

function imgUrl(item: DirectusPortfolioItem) {
  const id = item.featured_image ?? item.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'medium-contain') : null
}

function industryName(item: DirectusPortfolioItem) {
  return item.industries?.[0]?.industries_id?.name?.split('/')[0]?.trim() ?? ''
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, '')
}
</script>

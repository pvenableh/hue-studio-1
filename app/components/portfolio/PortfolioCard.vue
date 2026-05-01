<template>
  <NuxtLink
    :to="`/portfolio/${item.url}`"
    class="group relative block bg-white transition-colors hover:bg-[var(--snow)]"
  >
    <!-- Image -->
    <div class="relative flex items-center justify-center overflow-hidden bg-white" :style="{ aspectRatio }">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="item.name ?? ''"
        class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        :loading="eager ? 'eager' : 'lazy'"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-white">
        <span class="hue-label-sm">{{ item.client?.name || item.name }}</span>
      </div>
      <!-- Hover overlay -->
      <div v-if="overlay" class="absolute inset-0 flex flex-col justify-center bg-[var(--color-accent)]/90 p-7 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
        <p class="mb-3 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white">{{ item.name }}</p>
        <p v-if="item.synopsis" class="mb-4 line-clamp-3 text-[0.8125rem] leading-relaxed text-white/80" v-html="stripTags(item.synopsis ?? '')" />
        <span class="inline-block border-b border-white/40 pb-0.5 text-[0.625rem] uppercase tracking-widest text-white">View Project →</span>
      </div>
    </div>

    <!-- Info -->
    <div :class="compact ? 'p-5' : 'p-6'">
      <div class="mb-2 flex items-center justify-between">
        <span class="hue-label-sm" style="color: var(--color-accent);">{{ primaryService(item)?.name }}{{ industry ? ` · ${industry}` : '' }}</span>
        <span v-if="!compact && industry && !primaryService(item)?.name" class="hue-label-sm text-[var(--silver)]">{{ industry }}</span>
      </div>
      <h3 :class="compact ? 'text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-snug' : 'text-[1rem] font-light leading-snug'" class="transition-transform duration-300 group-hover:translate-x-1">{{ item.name }}</h3>
      <p v-if="item.client" class="mt-1 text-[0.625rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">{{ item.client.name }}</p>
      <p v-if="!compact && item.caption" class="mt-3 text-[0.8125rem] text-[var(--dark-grey)] leading-relaxed line-clamp-2" v-html="stripTags(item.caption ?? '')" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'

const props = withDefaults(defineProps<{
  item: DirectusPortfolioItem
  imageSrc?: string | null
  eager?: boolean
  aspectRatio?: string
  compact?: boolean
  overlay?: boolean
}>(), {
  aspectRatio: '4/3',
  compact: false,
  overlay: false,
})

const { stripHtml, primaryService } = useDirectus()

function stripTags(html: string) {
  return stripHtml(html)
}

const industry = computed(() =>
  props.item.industries?.[0]?.industries_id?.name?.split('/')[0]?.trim() ?? ''
)
</script>

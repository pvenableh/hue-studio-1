<template>
  <div>
    <!-- Carousel mode: horizontally scrollable -->
    <template v-if="carousel">
      <div ref="scrollContainer" class="flex gap-0 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory -mx-2 px-2">
        <component
          :is="item.to ? resolveComponent('NuxtLink') : 'div'"
          v-for="(item, i) in items"
          :key="item.number || i"
          v-bind="item.to ? { to: item.to } : {}"
          class="group relative shrink-0 snap-start"
          :style="{ width: `${100 / visibleCols}%`, minWidth: '220px' }"
        >
          <div class="relative flex items-center mb-6 overflow-visible">
            <span class="relative z-10 ml-7 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] bg-white text-[0.625rem] font-medium tracking-wider text-[var(--silver)]">
              {{ item.number || String(i + 1).padStart(2, '0') }}
            </span>
            <div v-if="i < items.length - 1" class="absolute left-[calc(1.75rem+2rem)] top-1/2 h-px bg-[var(--silk)]" style="right: -1.75rem" />
          </div>
          <div class="px-7 pb-7">
            <h3 class="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-transform duration-300" :class="item.to ? 'group-hover:translate-x-1' : ''">{{ item.title }}</h3>
            <p v-if="item.description" class="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ item.description }}</p>
            <div v-if="item.to" class="mt-4 flex items-center gap-2 text-[0.75rem] text-[var(--silver)] transition-all group-hover:gap-3 group-hover:text-[var(--near-black)]">
              {{ item.linkText || 'Learn more' }} <Icon name="lucide:arrow-right" class="size-3" />
            </div>
          </div>
        </component>
      </div>
      <!-- Scroll arrows -->
      <div v-if="items.length > visibleCols" class="mt-6 flex items-center justify-center gap-3">
        <button @click="scrollByDir(-1)" class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--silver)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]">
          <Icon name="lucide:arrow-left" class="size-3.5" />
        </button>
        <button @click="scrollByDir(1)" class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--silver)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]">
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </button>
      </div>
    </template>

    <!-- Mobile carousel + desktop grid mode -->
    <div
      v-else-if="mobileCarousel"
      class="flex gap-0 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory -mx-2 px-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 sm:snap-none"
      :class="[`lg:grid-cols-${cols}`]"
    >
      <component
        :is="item.to ? resolveComponent('NuxtLink') : 'div'"
        v-for="(item, i) in items"
        :key="'mc-' + (item.number || i)"
        v-bind="item.to ? { to: item.to } : {}"
        class="group relative shrink-0 snap-start sm:shrink sm:snap-align-none sm:!min-w-0"
        :style="{ minWidth: '260px' }"
      >
        <div class="relative flex items-center mb-6 overflow-visible">
          <span class="relative z-10 ml-7 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] bg-white text-[0.625rem] font-medium tracking-wider text-[var(--silver)]">
            {{ item.number || String(i + 1).padStart(2, '0') }}
          </span>
          <div v-if="i < items.length - 1" class="hidden lg:block absolute left-[calc(1.75rem+2rem)] top-1/2 h-px bg-[var(--silk)]" style="right: -1.75rem" />
        </div>
        <div class="px-7 pb-7">
          <h3 class="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-transform duration-300" :class="item.to ? 'group-hover:translate-x-1' : ''">{{ item.title }}</h3>
          <p v-if="item.description" class="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ item.description }}</p>
          <div v-if="item.to" class="mt-4 flex items-center gap-2 text-[0.75rem] text-[var(--silver)] transition-all group-hover:gap-3 group-hover:text-[var(--near-black)]">
            {{ item.linkText || 'Learn more' }} <Icon name="lucide:arrow-right" class="size-3" />
          </div>
        </div>
      </component>
    </div>

    <!-- Grid mode (default) -->
    <div v-else :class="['grid', 'sm:grid-cols-2', `lg:grid-cols-${cols}`]">
      <component
        :is="item.to ? resolveComponent('NuxtLink') : 'div'"
        v-for="(item, i) in items"
        :key="item.number || i"
        v-bind="item.to ? { to: item.to } : {}"
        class="group relative"
      >
        <!-- Number + connecting line — line overflows into next column -->
        <div class="relative flex items-center mb-6 overflow-visible">
          <span class="relative z-10 ml-7 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] bg-white text-[0.625rem] font-medium tracking-wider text-[var(--silver)]">
            {{ item.number || String(i + 1).padStart(2, '0') }}
          </span>
          <div v-if="i < items.length - 1" class="hidden lg:block absolute left-[calc(1.75rem+2rem)] top-1/2 h-px bg-[var(--silk)]" style="right: -1.75rem" />
        </div>
        <!-- Content — padded -->
        <div class="px-7 pb-7">
          <h3 class="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-transform duration-300" :class="item.to ? 'group-hover:translate-x-1' : ''">{{ item.title }}</h3>
          <p v-if="item.description" class="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ item.description }}</p>
          <div v-if="item.to" class="mt-4 flex items-center gap-2 text-[0.75rem] text-[var(--silver)] transition-all group-hover:gap-3 group-hover:text-[var(--near-black)]">
            {{ item.linkText || 'Learn more' }} <Icon name="lucide:arrow-right" class="size-3" />
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, resolveComponent } from 'vue'

export interface NumberedGridItem {
  number?: string
  title: string
  description?: string
  to?: string
  linkText?: string
}

const props = withDefaults(defineProps<{
  items: NumberedGridItem[]
  cols?: number
  carousel?: boolean
  visibleCols?: number
  mobileCarousel?: boolean
}>(), {
  cols: 4,
  carousel: false,
  visibleCols: 4,
  mobileCarousel: false,
})

const scrollContainer = ref<HTMLElement | null>(null)

function scrollByDir(direction: number) {
  if (!scrollContainer.value) return
  const itemWidth = scrollContainer.value.scrollWidth / props.items.length
  scrollContainer.value.scrollBy({ left: direction * itemWidth, behavior: 'smooth' })
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

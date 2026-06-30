<template>
  <div class="relative">
    <!-- Carousel track: native scroll-snap. Adapts to any number of items and
         to small screens (swipe), with a peek of the next tile to signal scroll. -->
    <div
      ref="trackRef"
      class="cw-track -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 md:mx-0 md:gap-4 md:px-0"
      @scroll.passive="onScroll"
    >
      <component
        :is="item.to ? NuxtLink : 'div'"
        v-for="(item, i) in items"
        :key="item.id"
        :to="item.to"
        :target="isExternal(item.to) ? '_blank' : undefined"
        :rel="isExternal(item.to) ? 'noopener noreferrer' : undefined"
        class="group reveal relative block aspect-[4/5] w-[82%] flex-shrink-0 snap-start overflow-hidden rounded-sm sm:aspect-[3/2] sm:w-[calc(50%-0.5rem)]"
        :style="{ transitionDelay: `${i * 80}ms` }"
      >
        <!-- Background: image when provided, otherwise a branded gradient -->
        <div class="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <img
            v-if="resolveImage(item.image)"
            :src="resolveImage(item.image)!"
            :alt="item.name"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            v-else
            class="h-full w-full"
            :style="{ background: gradientFor(item.tint) }"
          />
        </div>

        <!-- Readability scrim (stronger on hover) -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/85" />

        <!-- Status pill (top-left) -->
        <div class="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
          <span class="relative flex size-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-antique-gold)] opacity-75" />
            <span class="relative inline-flex size-1.5 rounded-full bg-[var(--accent-antique-gold)]" />
          </span>
          <span class="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-white/80">{{ item.status }}</span>
        </div>

        <!-- Content (bottom) -->
        <div class="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
          <p class="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/55">{{ item.category }}</p>
          <h3 class="hue-display-md text-white">{{ item.name }}</h3>

          <!-- Revealed on interaction: descriptor + disciplines.
               Hidden behind hover on desktop; always shown on touch/small screens. -->
          <div
            class="grid grid-rows-[1fr] opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:grid-rows-[0fr] sm:opacity-0 sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100"
          >
            <div class="overflow-hidden">
              <p class="mt-3 max-w-md text-[0.875rem] leading-relaxed text-white/70">{{ item.descriptor }}</p>
              <ul class="mt-4 flex flex-wrap gap-1.5">
                <li
                  v-for="d in item.disciplines"
                  :key="d"
                  class="rounded-full border border-white/20 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.1em] text-white/65"
                >
                  {{ d }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </component>
    </div>

    <!-- Prev / next controls — desktop only, shown when the track overflows -->
    <div v-show="scrollable" class="mt-6 hidden items-center justify-end gap-2 sm:flex">
      <button
        type="button"
        aria-label="Previous"
        class="cw-arrow"
        :disabled="!canPrev"
        @click="step(-1)"
      >
        <Icon name="lucide:arrow-left" class="size-4" />
      </button>
      <button
        type="button"
        aria-label="Next"
        class="cw-arrow"
        :disabled="!canNext"
        @click="step(1)"
      >
        <Icon name="lucide:arrow-right" class="size-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { NuxtLink } from '#components'
import { currentWork, type CurrentWorkItem } from '~/data/currentWork'

const { assetUrl, fetchCurrentWork } = useDirectus()

// CMS-managed via the `current_work` collection; falls back to the static
// data file if the collection is empty or the fetch fails.
const { data: cmsItems } = await useAsyncData('home-current-work', () => fetchCurrentWork({ limit: 12 }))

const items = computed<CurrentWorkItem[]>(() => {
  const rows = cmsItems.value
  if (!rows?.length) return currentWork
  return rows.map((r) => ({
    id: String(r.id),
    name: r.name,
    category: r.category ?? '',
    descriptor: r.descriptor ?? '',
    status: r.stage ?? 'In Progress',
    disciplines: r.disciplines ?? [],
    tint: r.tint ?? '#C4973B',
    image: r.image ?? undefined,
    to: r.link ?? undefined,
  }))
})

function resolveImage(src?: string): string | null {
  if (!src) return null
  if (src.startsWith('http') || src.startsWith('/')) return src
  return assetUrl(src, 'medium-contain')
}

function isExternal(to?: string): boolean {
  return !!to && /^https?:\/\//.test(to)
}

function gradientFor(tint: string): string {
  return `linear-gradient(145deg, ${tint} 0%, color-mix(in srgb, ${tint} 55%, #1d1d1f) 55%, #1d1d1f 100%)`
}

// --- Carousel navigation ---
const trackRef = ref<HTMLElement | null>(null)
const scrollable = ref(false)
const canPrev = ref(false)
const canNext = ref(false)

function onScroll() {
  const el = trackRef.value
  if (!el) return
  scrollable.value = el.scrollWidth - el.clientWidth > 4
  canPrev.value = el.scrollLeft > 4
  canNext.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 4
}

function step(dir: 1 | -1) {
  const el = trackRef.value
  if (!el) return
  // Advance by one tile (first child width + gap)
  const first = el.firstElementChild as HTMLElement | null
  const gap = parseFloat(getComputedStyle(el).columnGap || '16') || 16
  const amount = first ? first.offsetWidth + gap : el.clientWidth * 0.85
  el.scrollBy({ left: dir * amount, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('resize', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('resize', onScroll))

// Recompute once CMS data resolves / item count changes
watch(items, () => nextTick(onScroll))
</script>

<style scoped>
.cw-track {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.cw-track::-webkit-scrollbar {
  display: none;
}
.cw-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border-light);
  color: var(--color-text);
  transition: border-color 0.25s var(--ease), color 0.25s var(--ease), background 0.25s var(--ease);
}
.cw-arrow:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
.cw-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>

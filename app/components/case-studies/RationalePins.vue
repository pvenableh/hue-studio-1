<template>
  <div class="flex flex-col gap-16 md:gap-24">
    <figure
      v-for="(group, gi) in groups"
      :key="group.image"
      class="relative"
    >
      <div class="relative bg-[var(--stone)]">
        <img
          :src="assetUrl(group.image, 'large')"
          :alt="`${title} — annotated image ${gi + 1}`"
          class="block h-auto w-full"
          loading="lazy"
        />
        <button
          v-for="pin in group.pins"
          :key="pin.key"
          type="button"
          class="pin absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-medium tabular-nums shadow-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          :class="active === pin.key
            ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
            : 'border-[var(--color-border)] bg-white text-[var(--near-black)] hover:border-[var(--near-black)]'"
          :style="{ left: `${pin.x}%`, top: `${pin.y}%` }"
          :aria-expanded="active === pin.key"
          :aria-controls="`pin-card-${uid}-${pin.key}`"
          :aria-label="`Rationale ${pin.n}: ${pin.title}`"
          @click="toggle(pin.key)"
        >
          {{ pin.n }}
        </button>
      </div>

      <!-- Marginalia card: below the image on mobile, beside the pin from md up -->
      <template v-for="pin in group.pins" :key="`card-${pin.key}`">
        <div
          v-if="active === pin.key"
          :id="`pin-card-${uid}-${pin.key}`"
          role="note"
          class="pin-card relative z-20 mt-4 border border-[var(--color-border)] bg-white p-5 md:absolute md:mt-0 md:w-[280px]"
          :class="pin.x > 60 ? 'md:-translate-x-[calc(100%+24px)]' : 'md:translate-x-6'"
          :style="{ '--pin-x': `${pin.x}%`, '--pin-y': `${pin.y}%` }"
        >
          <p class="hue-marginalia mb-2">{{ String(pin.n).padStart(2, '0') }} / Rationale</p>
          <p class="mb-2 text-[0.9375rem] font-medium leading-snug text-[var(--near-black)]">{{ pin.title }}</p>
          <p class="text-[0.875rem] leading-relaxed text-[var(--dark-grey)]">{{ pin.note }}</p>
          <button
            type="button"
            class="absolute right-3 top-3 flex size-6 items-center justify-center text-[var(--grey)] hover:text-[var(--near-black)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            aria-label="Close note"
            @click="close(pin.key)"
          >
            <Icon name="lucide:x" class="size-3.5" />
          </button>
        </div>
      </template>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { DirectusRationalePin } from '~/composables/useDirectus'

const props = defineProps<{ pins: DirectusRationalePin[], title: string }>()

const { assetUrl } = useDirectus()
const uid = useId()
const active = ref<string | null>(null)

/** Pins grouped by image, numbered in reading order across the whole case study */
const groups = computed(() => {
  const map = new Map<string, { image: string, pins: (DirectusRationalePin & { key: string, n: number })[] }>()
  props.pins
    .filter(p => p?.image && Number.isFinite(p.x) && Number.isFinite(p.y))
    .forEach((p, i) => {
      if (!map.has(p.image)) map.set(p.image, { image: p.image, pins: [] })
      map.get(p.image)!.pins.push({
        ...p,
        x: Math.min(100, Math.max(0, p.x)),
        y: Math.min(100, Math.max(0, p.y)),
        key: String(i),
        n: i + 1,
      })
    })
  return [...map.values()]
})

function toggle(key: string) {
  active.value = active.value === key ? null : key
}

function close(key: string) {
  active.value = null
  nextTick(() => {
    document.querySelector<HTMLButtonElement>(`[aria-controls="pin-card-${uid}-${key}"]`)?.focus()
  })
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && active.value) close(active.value)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
@media (min-width: 768px) {
  .pin-card {
    left: var(--pin-x);
    top: var(--pin-y);
    margin-top: -1.25rem;
  }
}
</style>

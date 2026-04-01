<template>
  <section class="relative flex min-h-screen items-center overflow-hidden" style="background: var(--color-bg);">
    <!-- Radial gradient bloom -->
    <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 60% 50% at 75% 20%, rgba(196, 151, 59, 0.05), transparent 70%);" />

    <div class="intel-container relative z-10 flex w-full flex-col lg:flex-row lg:items-center lg:justify-between px-6 md:px-10 py-20">
      <!-- Text block -->
      <div class="max-w-[720px]">
        <p ref="eyebrowEl" class="intel-eyebrow mb-6">Introducing Hue&reg; Intelligence</p>

        <h1 ref="h1El" class="intel-h1 mb-8">
          Your data,<br>
          <em class="italic" style="color: var(--color-accent);">finally</em> working for you.
        </h1>

        <p ref="subEl" class="intel-body-lg mb-10 max-w-[520px]">
          AI-powered intelligence and automation for small and mid-sized
          organizations — built on your existing data, delivered by a
          boutique team that understands design as much as technology.
        </p>

        <div ref="ctaEl" class="flex flex-wrap items-center gap-4">
          <a href="#contact" class="intel-btn-gold">
            Book a free audit
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </a>
          <a href="#services" class="intel-link-ghost">
            See how it works &darr;
          </a>
        </div>
      </div>

      <!-- Geometric SVG grid -->
      <div ref="gridEl" class="mt-16 hidden lg:block lg:mt-0" aria-hidden="true">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g v-for="row in 10" :key="'r'+row">
            <rect
              v-for="col in 10"
              :key="'c'+col"
              :x="(col - 1) * 40 + 4"
              :y="(row - 1) * 40 + 4"
              width="32"
              height="32"
              rx="2"
              :fill="isGoldCell(row, col) ? '#D4973A' : '#F0EDE8'"
              :opacity="cellOpacity(row, col)"
              class="intel-grid-cell"
              :style="{ transitionDelay: `${(row + col) * 40}ms` }"
            />
          </g>
        </svg>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollEl" class="absolute bottom-8 left-1/2 -translate-x-1/2 intel-scroll-indicator">
      <Icon name="lucide:chevron-down" class="size-5" style="color: var(--color-text-muted);" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const eyebrowEl = ref<HTMLElement | null>(null)
const h1El = ref<HTMLElement | null>(null)
const subEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const gridEl = ref<HTMLElement | null>(null)
const scrollEl = ref<HTMLElement | null>(null)

// Gold-highlighted cells in the grid
const goldCells = new Set(['3-5', '3-6', '4-5', '5-7', '6-6', '7-4', '7-5', '8-6'])

function isGoldCell(row: number, col: number): boolean {
  return goldCells.has(`${row}-${col}`)
}

function cellOpacity(row: number, col: number): number {
  const cx = 5.5, cy = 5.5
  const dist = Math.sqrt((row - cy) ** 2 + (col - cx) ** 2)
  if (isGoldCell(row, col)) return 0.6 + ((row * 7 + col * 13) % 10) * 0.03
  return Math.max(0.03, 0.25 - dist * 0.035)
}

const { staggerEntrance } = useHeroAnimations()
staggerEntrance([eyebrowEl, h1El, subEl, ctaEl], { delay: 0.2, stagger: 0.06, duration: 0.6 })

onMounted(async () => {
  await nextTick()
  if (import.meta.server) return

  // Animate grid cells in
  if (gridEl.value) {
    const cells = gridEl.value.querySelectorAll('.intel-grid-cell')
    gsap.fromTo(cells, { opacity: 0 }, {
      opacity: (i: number) => {
        const el = cells[i] as SVGRectElement
        return parseFloat(el.getAttribute('opacity') || '0.1')
      },
      duration: 0.8,
      stagger: { each: 0.02, from: 'center' },
      delay: 0.5,
      ease: 'power2.out',
    })
  }

  // Hide scroll indicator on scroll
  if (scrollEl.value) {
    ScrollTrigger.create({
      trigger: scrollEl.value,
      start: 'top 90%',
      end: 'top 50%',
      onLeave: () => { if (scrollEl.value) gsap.to(scrollEl.value, { opacity: 0, duration: 0.3 }) },
    })
  }
})
</script>

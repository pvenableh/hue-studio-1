<template>
  <section
    ref="sliderRef"
    class="relative overflow-hidden bg-black cursor-grab select-none"
    :style="{ height: heroHeight }"
    tabindex="0"
    aria-roledescription="carousel"
    aria-label="Featured highlights"
    @mouseenter="pause"
    @mouseleave="onMouseLeave"
    @keydown="onKeydown"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
    @mousedown.prevent="onDragStart"
    @mousemove.prevent="onDragMove"
    @mouseup.prevent="onDragEnd"
  >
    <!-- Slides — stacked absolutely, only active one visible -->
    <div
      v-for="(slide, i) in slides"
      :key="slide.id"
      :ref="(el) => { if (el) slideEls[i] = el as HTMLElement }"
      class="absolute inset-0 h-full w-full"
      :class="i === 0 ? '' : 'opacity-0 pointer-events-none'"
      role="group"
      :aria-roledescription="'slide'"
      :aria-label="`Slide ${i + 1} of ${slides.length}`"
    >
      <!-- Background -->
      <div class="absolute inset-0" :style="{ backgroundColor: slide.background.color }">
        <div
          v-if="slide.background.image"
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${resolveImage(slide.background.image)})` }"
        />
        <div
          v-if="slide.background.image"
          class="absolute inset-0"
          :style="{ backgroundColor: `rgba(0,0,0,${slide.background.overlay ?? 0.55})` }"
        />
        <div
          v-if="slide.background.gradient"
          class="absolute inset-0"
          :style="{ background: slide.background.gradient }"
        />
        <div
          v-if="!slide.background.image"
          class="pointer-events-none absolute -bottom-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.015] blur-3xl"
        />
      </div>

      <!-- Content -->
      <div class="relative z-10 flex h-full items-center px-5 md:px-6">
        <div class="hue-container">
          <div class="grid gap-12 lg:grid-cols-2">
            <div class="max-w-xl">
              <p
                :data-anim="`${i}-label`"
                class="hue-label mb-5 text-white/40"
                style="opacity: 0"
              >{{ slide.label }}</p>
              <h2
                :data-anim="`${i}-title`"
                class="hue-display-xl text-white"
                style="opacity: 0"
              >
                {{ slide.title }}
                <span style="font-family: var(--font-editorial); font-style: italic;">{{ slide.titleAccent }}</span>
              </h2>
              <p
                :data-anim="`${i}-sub`"
                class="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-white/45"
                style="opacity: 0"
              >{{ slide.description }}</p>
              <div
                :data-anim="`${i}-cta`"
                class="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                style="opacity: 0"
              >
                <template v-for="cta in slide.ctas" :key="cta.text">
                  <NuxtLink v-if="cta.style === 'primary'" :to="cta.to" class="hue-btn-ghost">
                    {{ cta.text }}
                    <Icon name="lucide:arrow-right" class="size-3.5" />
                  </NuxtLink>
                  <NuxtLink v-else :to="cta.to" class="inline-flex items-center gap-1.5 text-[0.75rem] font-medium uppercase tracking-wider text-white/50 transition-all hover:gap-2 hover:text-white/70">
                    {{ cta.text }}
                    <Icon name="lucide:arrow-right" class="size-3.5" />
                  </NuxtLink>
                </template>
              </div>
            </div>

            <!-- Foreground image -->
            <div v-if="slide.foreground?.image" class="hidden items-center justify-center lg:flex">
              <img
                :src="resolveImage(slide.foreground.image)"
                :alt="slide.title + ' ' + slide.titleAccent"
                class="max-h-[60vh] object-contain drop-shadow-2xl"
              />
            </div>

            <!-- Watermark text for brand-analysis slide -->
            <span
              v-if="slide.id === 'brand-analysis'"
              class="hero-watermark pointer-events-none absolute bottom-0 right-0 select-none italic opacity-0"
              style="font-family: var(--font-editorial); font-size: clamp(4rem, 12vw, 10rem); line-height: 0.72; font-weight: 300; color: rgba(255,255,255,0.04); transform: translateY(0.15em); text-align: right; padding-right: 1rem;"
              :data-anim="`${i}-watermark`"
            >Reason<br>creates<br>meaning.</span>

            <!-- Intelligence animated grid — behind text on small screens, beside on lg -->
            <div
              v-if="slide.id === 'intelligence'"
              class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08] lg:pointer-events-auto lg:relative lg:inset-auto lg:opacity-100"
              :data-anim="`${i}-grid`"
            >
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]">
                <g v-for="row in 10" :key="'r'+row">
                  <rect
                    v-for="col in 10"
                    :key="'c'+col"
                    :x="(col - 1) * 40 + 4"
                    :y="(row - 1) * 40 + 4"
                    width="32"
                    height="32"
                    rx="2"
                    :fill="intelGridGold.has(`${row}-${col}`) ? '#8A8A8A' : '#2A2A2A'"
                    :opacity="intelCellOpacity(row, col)"
                    :class="intelGridGold.has(`${row}-${col}`) ? 'intel-hero-grid-cell intel-lit-cell' : 'intel-hero-grid-cell'"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress indicators -->
    <div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
      <button
        v-for="(slide, i) in slides"
        :key="slide.id + '-dot'"
        :aria-label="`Go to slide ${i + 1}`"
        :aria-current="i === active ? 'true' : undefined"
        class="relative h-[3px] w-10 overflow-hidden rounded-full transition-all duration-300"
        :class="i === active ? 'bg-white/30' : 'bg-white/15 hover:bg-white/25'"
        @click="goTo(i)"
      >
        <div
          v-if="i === active && !paused"
          :key="progressKey"
          class="hero-progress-bar absolute inset-y-0 left-0 rounded-full bg-white/80"
        />
      </button>
    </div>

    <!-- Arrows (hidden for cleaner look — nav via dots, keyboard, drag/swipe) -->
    <button
      class="hidden"
      aria-label="Previous slide"
      @click="goTo(active - 1)"
    >
      <Icon name="lucide:chevron-left" class="size-5" />
    </button>
    <button
      class="hidden"
      aria-label="Next slide"
      @click="goTo(active + 1)"
    >
      <Icon name="lucide:chevron-right" class="size-5" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { heroSlides } from '~/data/heroSlides'

// A/B test: 50% chance Intelligence slide leads instead of Brand slide
// Swap is deferred to onMounted to avoid hydration mismatch
const slides = reactive([...heroSlides])
const sliderRef = ref<HTMLElement | null>(null)

// Intelligence slide SVG grid helpers
// Continuous animation timeline for active slide graphics
let continuousTl: gsap.core.Timeline | null = null

const intelGridGold = new Set(['3-5', '3-6', '4-5', '5-7', '6-6', '7-4', '7-5', '8-6'])
function intelCellOpacity(row: number, col: number): number {
  const cx = 5.5, cy = 5.5
  const dist = Math.sqrt((row - cy) ** 2 + (col - cx) ** 2)
  if (intelGridGold.has(`${row}-${col}`)) return 0.7 + ((row * 7 + col * 13) % 10) * 0.025
  return Math.max(0.08, 0.4 - dist * 0.05)
}
const slideEls = reactive<Record<number, HTMLElement>>({})

const active = ref(0)
const transitioning = ref(false)
const paused = ref(false)
const progressKey = ref(0)
const heroHeight = ref('100dvh')

const INTERVAL = 7000
let timer: ReturnType<typeof setInterval> | null = null

// Calculate height: viewport minus header
function calcHeight() {
  const header = document.querySelector('header')
  if (header) {
    const h = header.offsetHeight
    heroHeight.value = `calc(100dvh - ${h}px)`
  }
}


// --- Get animated elements for a slide ---
function getEls(i: number) {
  const root = slideEls[i]
  if (!root) return []
  return ['label', 'title', 'sub', 'cta']
    .map((key) => root.querySelector(`[data-anim="${i}-${key}"]`) as HTMLElement)
    .filter(Boolean)
}

// Track last transition direction for content animations
let lastDir = 1

// Default animation configs per element key
const DEFAULTS: Record<string, { offset: number; duration: number; delay: number; ease: string }> = {
  label: { offset: 20, duration: 0.6, delay: 0, ease: 'power3.out' },
  title: { offset: 60, duration: 1.1, delay: 0, ease: 'power3.out' },
  sub:   { offset: 35, duration: 0.8, delay: 0, ease: 'power3.out' },
  cta:   { offset: 15, duration: 0.7, delay: 0, ease: 'power3.out' },
}
const KEYS = ['label', 'title', 'sub', 'cta'] as const

function getAnimConfig(slideIndex: number, key: string) {
  const slide = slides[slideIndex]
  const override = slide?.animation?.[key as keyof typeof slide.animation]
  const def = DEFAULTS[key]
  return {
    offset: override?.offset ?? def.offset,
    duration: override?.duration ?? def.duration,
    delay: override?.delay ?? def.delay,
    ease: override?.ease ?? def.ease,
  }
}

// --- Entrance animation (horizontal parallax with per-slide speeds) ---
function animateIn(i: number, done?: () => void) {
  const els = getEls(i)

  // Set start positions
  els.forEach((el, idx) => {
    const cfg = getAnimConfig(i, KEYS[idx])
    gsap.set(el, { opacity: 0, x: lastDir * cfg.offset })
  })

  const tl = gsap.timeline({ onComplete: done })
  els.forEach((el, idx) => {
    const cfg = getAnimConfig(i, KEYS[idx])
    tl.to(el, {
      opacity: 1,
      x: 0,
      duration: cfg.duration,
      ease: cfg.ease,
    }, cfg.delay)
  })

  // Animate slide-specific graphics on enter
  const gridEl = slideEls[i]?.querySelector(`[data-anim="${i}-grid"]`)
  if (gridEl) {
    // Intelligence grid cells — set hidden first, then animate
    const cells = gridEl.querySelectorAll('.intel-hero-grid-cell')
    const litCells = gridEl.querySelectorAll('.intel-lit-cell')
    if (cells.length) {
      gsap.set(cells, { opacity: 0 })
      gsap.fromTo(cells, { opacity: 0 }, {
        opacity: (idx: number) => {
          const el = cells[idx] as SVGRectElement
          return parseFloat(el.getAttribute('opacity') || '0.1')
        },
        duration: 0.5,
        stagger: { each: 0.008, from: 'center' },
        delay: 0.2,
        ease: 'power2.out',
      })

      // Continuous ambient animation — smooth, overlapping, organic
      if (cells.length) {
        const allCells = Array.from(cells)
        const litSet = new Set(Array.from(litCells))
        let illuminateInterval: ReturnType<typeof setInterval> | null = null

        illuminateInterval = setInterval(() => {
          // Gently illuminate 2-3 random dark cells with long, overlapping fades
          const darkCells = allCells.filter((c) => !litSet.has(c))
          const count = 2 + Math.floor(Math.random() * 2)
          for (let n = 0; n < count; n++) {
            const rand = darkCells[Math.floor(Math.random() * darkCells.length)]
            if (rand) {
              const peakOpacity = 0.3 + Math.random() * 0.3
              const riseTime = 0.6 + Math.random() * 0.5
              const holdTime = 0.2 + Math.random() * 0.5
              const fadeTime = 0.7 + Math.random() * 0.5
              const baseOpacity = parseFloat(rand.getAttribute('opacity') || '0.1')
              gsap.to(rand, { fill: '#6A6A6A', opacity: peakOpacity, duration: riseTime, ease: 'sine.inOut' })
              gsap.to(rand, { fill: '#2A2A2A', opacity: baseOpacity, duration: fadeTime, delay: riseTime + holdTime, ease: 'sine.inOut' })
            }
          }
          // Gently breathe the lit cells
          const litArr = Array.from(litCells)
          const litRand = litArr[Math.floor(Math.random() * litArr.length)]
          if (litRand) {
            const dim = 0.35 + Math.random() * 0.2
            gsap.to(litRand, { opacity: dim, duration: 0.7, ease: 'sine.inOut' })
            gsap.to(litRand, { opacity: 0.7 + Math.random() * 0.1, duration: 0.9, delay: 0.9, ease: 'sine.inOut' })
          }
        }, 600)

        // Store for cleanup
        continuousTl = gsap.timeline()
        ;(continuousTl as any)._illuminateInterval = illuminateInterval
      }
    }

  }

  // Watermark text — fade and drift up
  const watermark = slideEls[i]?.querySelector(`[data-anim="${i}-watermark"]`)
  if (watermark) {
    gsap.fromTo(watermark,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.6, delay: 0.5, ease: 'power3.out' }
    )
  }
}

// --- Leave animation (horizontal — content drifts out) ---
function animateOut(i: number, done?: () => void) {
  const els = getEls(i)
  const tl = gsap.timeline({ onComplete: done })
  els.forEach((el, idx) => {
    const cfg = getAnimConfig(i, KEYS[idx])
    tl.to(el, {
      opacity: 0,
      x: -lastDir * (cfg.offset * 0.4),
      duration: 0.35,
      ease: 'power2.in',
    }, 0)
  })

  // Kill continuous animation + interval
  if (continuousTl) {
    if ((continuousTl as any)._illuminateInterval) clearInterval((continuousTl as any)._illuminateInterval)
    continuousTl.kill()
    continuousTl = null
  }

  // Also hide/reverse slide-specific graphics for next animateIn
  const gridEl = slideEls[i]?.querySelector(`[data-anim="${i}-grid"]`)
  if (gridEl) {
    // Intel cells — fade out
    const others = gridEl.querySelectorAll('.intel-hero-grid-cell')
    if (others.length) {
      gsap.to(others, { opacity: 0, duration: 0.3 })
    }
  }

  // Watermark — fade out
  const watermark = slideEls[i]?.querySelector(`[data-anim="${i}-watermark"]`)
  if (watermark) {
    gsap.to(watermark, { opacity: 0, duration: 0.3 })
  }
}

// --- Go to slide ---
function goTo(target: number) {
  if (transitioning.value) return
  let idx = target
  if (idx < 0) idx = slides.length - 1
  if (idx >= slides.length) idx = 0
  if (idx === active.value) return

  transitioning.value = true
  const from = active.value
  const dir = idx > from ? 1 : -1
  lastDir = dir

  // Phase 1: Animate out current content
  animateOut(from, () => {
    // Phase 2: Crossfade slides with horizontal shift
    const fromEl = slideEls[from]
    const toEl = slideEls[idx]

    if (fromEl && toEl) {
      // Incoming slide layers on top — outgoing stays fully visible as backdrop
      gsap.set(toEl, { opacity: 0, x: dir * 60, zIndex: 2, pointerEvents: 'auto' })
      gsap.set(fromEl, { zIndex: 1 })
      toEl.classList.remove('pointer-events-none')

      const tl = gsap.timeline({
        onComplete: () => {
          // Clean up z-index and hide old slide
          gsap.set(fromEl, { opacity: 0, zIndex: '', x: 0 })
          gsap.set(toEl, { zIndex: '' })
          fromEl.classList.add('pointer-events-none')

          // Phase 3: Animate in new content
          active.value = idx
          progressKey.value++
          animateIn(idx, () => {
            transitioning.value = false
            resetTimer()
          })
        },
      })

      // Bring in new slide over the old one — no opacity change on outgoing
      tl.to(toEl, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.inOut' })
    }
  })
}

// --- Auto-advance ---
function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    if (!paused.value && !transitioning.value) goTo(active.value + 1)
  }, INTERVAL)
}
function stopTimer() { if (timer) { clearInterval(timer); timer = null } }
function resetTimer() { startTimer() }
function pause() { paused.value = true }
function resume() { paused.value = false }

// --- Keyboard ---
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active.value + 1) }
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active.value - 1) }
}

// --- Touch swipe ---
const touchX = ref(0)
const touchY = ref(0)
function onTouchStart(e: TouchEvent) {
  touchX.value = e.touches[0].clientX
  touchY.value = e.touches[0].clientY
  pause()
}
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchX.value
  const dy = e.changedTouches[0].clientY - touchY.value
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    goTo(active.value + (dx < 0 ? 1 : -1))
  }
  resume()
}

// --- Mouse drag ---
const dragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)

function onDragStart(e: MouseEvent) {
  dragging.value = true
  dragStartX.value = e.clientX
  dragStartY.value = e.clientY
  pause()
}
function onDragMove(e: MouseEvent) {
  if (!dragging.value) return
  // Change cursor while dragging
  if (sliderRef.value) sliderRef.value.style.cursor = 'grabbing'
}
function onDragEnd(e: MouseEvent) {
  if (!dragging.value) return
  dragging.value = false
  if (sliderRef.value) sliderRef.value.style.cursor = ''
  const dx = e.clientX - dragStartX.value
  const dy = e.clientY - dragStartY.value
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    goTo(active.value + (dx < 0 ? 1 : -1))
  }
  resume()
}
function onMouseLeave() {
  if (dragging.value) {
    dragging.value = false
    if (sliderRef.value) sliderRef.value.style.cursor = ''
  }
  resume()
}

// --- Image resolver ---
const { assetUrl } = useDirectus()
function resolveImage(src: string): string {
  if (src.startsWith('http') || src.startsWith('/')) return src
  return assetUrl(src, 'hero')
}

// --- Lifecycle ---
onMounted(async () => {
  await nextTick()
  calcHeight()
  window.addEventListener('resize', calcHeight)

  // A/B test: 50% chance swap brand & intelligence slides (after hydration)
  if (Math.random() < 0.5) {
    const brandIdx = slides.findIndex((s) => s.id === 'brand')
    const intelIdx = slides.findIndex((s) => s.id === 'intelligence')
    if (brandIdx !== -1 && intelIdx !== -1) {
      const temp = slides[brandIdx]
      slides[brandIdx] = slides[intelIdx]
      slides[intelIdx] = temp
    }
  }

  // Wait for DOM to reflect any A/B swap before animating
  await nextTick()

  // First slide is visible, animate its content in
  animateIn(0)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startTimer()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', calcHeight)
  stopTimer()
  gsap.killTweensOf('*')
})
</script>

<style scoped>
.hero-progress-bar {
  animation: hero-progress v-bind('INTERVAL + "ms"') linear forwards;
}
@keyframes hero-progress {
  from { width: 0%; }
  to { width: 100%; }
}

/* Hide animated SVG elements until GSAP reveals them */
.intel-hero-grid-cell {
  opacity: 0;
}
</style>

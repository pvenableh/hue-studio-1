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
      <div class="relative z-10 flex h-full items-center px-2 md:px-6">
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

    <!-- Arrows -->
    <button
      class="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white/40 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white/70 md:flex"
      aria-label="Previous slide"
      @click="goTo(active - 1)"
    >
      <Icon name="lucide:chevron-left" class="size-5" />
    </button>
    <button
      class="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white/40 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white/70 md:flex"
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

const slides = heroSlides
const sliderRef = ref<HTMLElement | null>(null)
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
</style>

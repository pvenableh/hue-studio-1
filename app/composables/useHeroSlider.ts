import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

interface SlideContentRefs {
  label: HTMLElement | null
  title: HTMLElement | null
  sub: HTMLElement | null
  cta: HTMLElement | null
}

export function useHeroSlider(slideCount: number) {
  const currentIndex = ref(0)
  const isTransitioning = ref(false)
  const isPaused = ref(false)
  const progressKey = ref(0)

  const trackRef = ref<HTMLElement | null>(null)
  const bgRefs = reactive<Record<number, HTMLElement | null>>({})
  const contentRefs = reactive<Record<number, SlideContentRefs>>({})

  const tweens: (gsap.core.Tween | gsap.core.Timeline)[] = []

  let autoTimer: ReturnType<typeof setInterval> | null = null
  const AUTO_INTERVAL = 7000

  // --- Ensure content ref exists ---
  function ensureContentRef(index: number) {
    if (!contentRefs[index]) {
      contentRefs[index] = { label: null, title: null, sub: null, cta: null }
    }
  }

  // --- Content animation builders ---

  function animateEnter(index: number, onDone?: () => void) {
    ensureContentRef(index)
    const refs = contentRefs[index]
    const els = [refs.label, refs.title, refs.sub, refs.cta].filter(Boolean) as HTMLElement[]

    // Reset
    els.forEach((el) => gsap.set(el, { opacity: 0, y: 30 }))

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: onDone,
    })

    if (refs.label) tl.to(refs.label, { opacity: 1, y: 0, duration: 0.7 })
    if (refs.title) tl.to(refs.title, { opacity: 1, y: 0, duration: 1.1 }, '-=0.4')
    if (refs.sub) tl.to(refs.sub, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    if (refs.cta) tl.to(refs.cta, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')

    tweens.push(tl)
  }

  function animateLeave(index: number, onDone?: () => void) {
    ensureContentRef(index)
    const refs = contentRefs[index]
    const els = [refs.label, refs.title, refs.sub, refs.cta].filter(Boolean) as HTMLElement[]

    if (!els.length) { onDone?.(); return }

    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(els, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' })
    tweens.push(tl)
  }

  // --- Navigation ---

  function goToSlide(targetIndex: number) {
    if (isTransitioning.value || targetIndex === currentIndex.value) return
    if (targetIndex < 0) targetIndex = slideCount - 1
    if (targetIndex >= slideCount) targetIndex = 0

    isTransitioning.value = true
    const direction = targetIndex > currentIndex.value ? 1 : -1
    const fromIndex = currentIndex.value

    // Phase 1: Leave current
    animateLeave(fromIndex, () => {
      // Phase 2: Slide track + parallax bg
      const masterTl = gsap.timeline({
        onComplete: () => {
          // Phase 3: Enter target
          currentIndex.value = targetIndex
          progressKey.value++
          animateEnter(targetIndex, () => {
            isTransitioning.value = false
            resetAutoAdvance()
          })
        },
      })

      masterTl.to(trackRef.value, {
        xPercent: -targetIndex * 100,
        duration: 0.8,
        ease: 'power2.inOut',
      })

      // Parallax on incoming bg
      const bgEl = bgRefs[targetIndex]
      if (bgEl) {
        masterTl.fromTo(
          bgEl,
          { x: direction * 40 },
          { x: 0, duration: 1.0, ease: 'power2.out' },
          '<'
        )
      }

      tweens.push(masterTl)
    })
  }

  function next() {
    goToSlide(currentIndex.value + 1)
  }

  function prev() {
    goToSlide(currentIndex.value - 1)
  }

  // --- Auto-advance ---

  function startAutoAdvance() {
    stopAutoAdvance()
    autoTimer = setInterval(() => {
      if (!isPaused.value && !isTransitioning.value) {
        next()
      }
    }, AUTO_INTERVAL)
  }

  function stopAutoAdvance() {
    if (autoTimer) {
      clearInterval(autoTimer)
      autoTimer = null
    }
  }

  function resetAutoAdvance() {
    startAutoAdvance()
  }

  function pause() {
    isPaused.value = true
  }

  function resume() {
    isPaused.value = false
  }

  // --- Keyboard ---

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  }

  // --- Lifecycle ---

  onMounted(async () => {
    await nextTick()
    await nextTick()

    if (trackRef.value) {
      gsap.set(trackRef.value, { xPercent: 0 })
    }

    // Play entrance on first slide
    animateEnter(0)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      startAutoAdvance()
    }
  })

  onUnmounted(() => {
    stopAutoAdvance()
    tweens.forEach((t) => t.kill())
  })

  return {
    currentIndex,
    isTransitioning,
    isPaused,
    progressKey,
    trackRef,
    bgRefs,
    contentRefs,
    ensureContentRef,
    goToSlide,
    next,
    prev,
    pause,
    resume,
    onKeydown,
    AUTO_INTERVAL,
  }
}

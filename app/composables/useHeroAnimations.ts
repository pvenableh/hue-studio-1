import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Hero scroll animations composable.
 *
 * Provides three effects:
 * 1. Pinned hero — hero stays fixed while content scrolls over it
 * 2. Parallax element — an element scrolls at a different rate for depth
 * 3. Staggered entrance — elements animate in on page load
 */
export function useHeroAnimations() {
  const triggers: ScrollTrigger[] = []
  const tweens: gsap.core.Tween[] = []

  /**
   * Pin the hero section so content scrolls over it.
   * Wraps the hero in a ScrollTrigger pin that holds it in place
   * for its own height, then releases.
   */
  function pinHero(heroEl: Ref<HTMLElement | null>) {
    onMounted(async () => {
      await nextTick()
      if (!heroEl.value || import.meta.server) return

      const st = ScrollTrigger.create({
        trigger: heroEl.value,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: true,
      })
      triggers.push(st)
    })
  }

  /**
   * Parallax an element (e.g. the decorative background word).
   * Moves it slower than scroll for a depth effect.
   * @param speed — 0 = fixed, 1 = normal scroll. Default 0.3 for subtle parallax.
   */
  function parallaxElement(el: Ref<HTMLElement | null>, speed = 0.3) {
    onMounted(async () => {
      await nextTick()
      if (!el.value || import.meta.server) return

      const tween = gsap.to(el.value, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.value.parentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      tweens.push(tween)
    })
  }

  /**
   * Stagger entrance animation for hero elements.
   * Pass an array of refs — they animate in sequentially on mount.
   */
  function staggerEntrance(
    elements: Ref<HTMLElement | null>[],
    options: { delay?: number; duration?: number; stagger?: number; y?: number } = {},
  ) {
    const { delay = 0.1, duration = 0.8, stagger = 0.12, y = 30 } = options

    onMounted(async () => {
      await nextTick()
      if (import.meta.server) return

      const els = elements.map((r) => r.value).filter(Boolean) as HTMLElement[]
      if (!els.length) return

      // Set initial state
      gsap.set(els, { opacity: 0, y })

      const tl = gsap.timeline({ delay, defaults: { ease: 'power3.out' } })
      tl.to(els, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
      })
    })
  }

  // Cleanup on unmount
  onUnmounted(() => {
    triggers.forEach((t) => t.kill())
    tweens.forEach((t) => t.kill())
    triggers.length = 0
    tweens.length = 0
  })

  return { pinHero, parallaxElement, staggerEntrance }
}

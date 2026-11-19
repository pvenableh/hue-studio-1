import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Job = () => void

const REDUCE = '(prefers-reduced-motion: reduce)'
const FULL = '(prefers-reduced-motion: no-preference)'

/**
 * Editorial motion helpers. Call in component setup; call reveal / maskHeadline /
 * parallax from onMounted (or later). Everything runs inside one gsap.context,
 * reverted on unmount. Under prefers-reduced-motion only opacity animates.
 */
export function useEditorialMotion(scope?: Ref<HTMLElement | null | undefined>) {
  let ctx: gsap.Context | null = null
  const queue: Job[] = []

  const run = (job: Job) => {
    if (ctx) ctx.add(job)
    else queue.push(job)
  }

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    ctx = gsap.context(() => {}, scope?.value || undefined)
    queue.splice(0).forEach(j => ctx!.add(j))
  })

  onUnmounted(() => {
    ctx?.revert() // also reverts matchMedia instances created inside the context
    ctx = null
  })

  /** Fade + rise targets as they scroll into view (opacity only when reduced). */
  function reveal(
    targets: gsap.TweenTarget,
    opts: { y?: number, duration?: number, stagger?: number, delay?: number, start?: string } = {},
  ) {
    run(() => {
      const { y = 24, duration = 0.9, stagger = 0.08, delay = 0, start = 'top 88%' } = opts
      const first = gsap.utils.toArray(targets as any)[0] as Element | undefined
      const mm = gsap.matchMedia()
      mm.add({ reduce: REDUCE, full: FULL }, (c) => {
        const reduce = c.conditions?.reduce
        gsap.fromTo(
          targets,
          reduce ? { opacity: 0 } : { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: reduce ? 0.4 : duration,
            delay,
            stagger: reduce ? 0 : stagger,
            ease: 'power3.out',
            scrollTrigger: { trigger: first, start, once: true },
          },
        )
      })
    })
  }

  /** Masked word-up headline reveal. Fade only when reduced. */
  function maskHeadline(el: HTMLElement | null | undefined, opts: { duration?: number, stagger?: number, delay?: number } = {}) {
    if (!el) return
    run(() => {
      const { duration = 1, stagger = 0.06, delay = 0 } = opts
      const mm = gsap.matchMedia()
      mm.add({ reduce: REDUCE, full: FULL }, (c) => {
        if (c.conditions?.reduce) {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.inOut' })
          return
        }
        const original = el.innerHTML
        const text = el.textContent || ''
        el.setAttribute('aria-label', text)
        el.textContent = ''
        const inners: HTMLElement[] = []
        text.split(/\s+/).filter(Boolean).forEach((word, i, all) => {
          const mask = document.createElement('span')
          mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;'
          mask.setAttribute('aria-hidden', 'true')
          const inner = document.createElement('span')
          inner.style.cssText = 'display:inline-block;will-change:transform;'
          inner.textContent = word
          mask.appendChild(inner)
          el.appendChild(mask)
          if (i < all.length - 1) el.appendChild(document.createTextNode(' '))
          inners.push(inner)
        })
        gsap.fromTo(inners, { yPercent: 110 }, { yPercent: 0, duration, stagger, delay, ease: 'power3.out' })
        return () => {
          el.innerHTML = original
          el.removeAttribute('aria-label')
        }
      })
    })
  }

  /** Scroll-linked move between two states, e.g. parallax(img, { scale: 1.04 }, { scale: 1 }). No-op when reduced. */
  function parallax(el: HTMLElement | null | undefined, from: gsap.TweenVars, to: gsap.TweenVars) {
    if (!el) return
    run(() => {
      const mm = gsap.matchMedia()
      mm.add(FULL, () => {
        gsap.fromTo(el, from, {
          ...to,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    })
  }

  return { reveal, maskHeadline, parallax }
}

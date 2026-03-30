// composables/useScrollReveal.ts
export function useScrollReveal(selector = '.reveal') {
  if (import.meta.server) return

  let io: IntersectionObserver | null = null
  let mo: MutationObserver | null = null

  function ensureObserver(): IntersectionObserver {
    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              io?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12 }
      )
    }
    return io
  }

  /** Observe any .reveal elements that haven't been revealed yet */
  function observeNew() {
    const observer = ensureObserver()
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el)
      }
    })
  }

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observeNew()

    // Watch for dynamically added .reveal elements (v-for, async data, etc.)
    mo = new MutationObserver(() => observeNew())
    mo.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    io?.disconnect()
    mo?.disconnect()
    io = null
    mo = null
  })
}

// composables/useScrollReveal.ts
export function useScrollReveal(selector = '.reveal') {
  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll(selector).forEach((el) => observer.observe(el))
    onUnmounted(() => observer.disconnect())
  })
}

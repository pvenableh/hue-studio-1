/**
 * Client-only plugin that tracks CTA clicks, nav clicks, and outbound links
 * via event delegation on the document body.
 */
export default defineNuxtPlugin(() => {
  const { trackCtaClick, trackNavClick, trackOutboundClick } = useAnalytics()

  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement)?.closest('a, button') as HTMLElement | null
    if (!el) return

    // Outbound links (external URLs opening in new tab)
    if (el.tagName === 'A') {
      const href = (el as HTMLAnchorElement).href
      if (href && !href.startsWith(window.location.origin) && href.startsWith('http')) {
        trackOutboundClick(href, el.textContent?.trim()?.substring(0, 50))
      }
    }

    // Nav link clicks (inside the header nav)
    if (el.closest('header nav') && el.tagName === 'A') {
      const href = (el as HTMLAnchorElement).getAttribute('href')
      if (href) trackNavClick(href)
      return
    }

    // CTA button clicks — links/buttons with CTA-like classes or text
    const text = el.textContent?.trim()?.toUpperCase() ?? ''
    const isCta = text.includes('LEARN MORE')
      || text.includes('VIEW')
      || text.includes('START FREE')
      || text.includes('ENQUIRE')
      || text.includes('SCHEDULE')
      || text.includes('BOOK')
      || text.includes('SUBSCRIBE')
      || text.includes('BUILD YOUR')
      || text.includes('EXPLORE')
      || text.includes('WATCH')
    if (isCta) {
      const location = el.closest('section')?.querySelector('.hue-label')?.textContent?.trim() ?? 'unknown'
      trackCtaClick(text.substring(0, 50), location)
    }
  })
})

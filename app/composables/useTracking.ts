/**
 * GA4 event tracking composable — centralizes all custom event tracking.
 *
 * Uses `useTrackEvent` from nuxt-gtag (auto-imported).
 * All events use GA4-recommended snake_case naming.
 * SSR-safe — nuxt-gtag no-ops on the server automatically.
 */

type FormType = 'contact' | 'audit' | 'subscribe'

function useScrollDepthTracker() {
  if (import.meta.server) return

  const route = useRoute()
  const page = route.path
  const fired = new Set<25 | 50 | 75 | 100>()
  const thresholds = [25, 50, 75, 100] as const

  useEventListener('scroll', () => {
    const depth = ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100

    for (const t of thresholds) {
      if (depth >= t && !fired.has(t)) {
        fired.add(t)
        useTrackEvent('scroll_depth', { page_path: page, depth_percent: t })
      }
    }
  })
}

export const useTracking = () => {
  function trackFormStart(formType: FormType) {
    useTrackEvent('form_start', { form_type: formType })
  }

  function trackFormSubmit(formType: FormType) {
    useTrackEvent('form_submit', { form_type: formType })
  }

  function trackFormSuccess(formType: FormType) {
    useTrackEvent('form_success', { form_type: formType })
  }

  function trackFormError(formType: FormType, errorMessage: string) {
    useTrackEvent('form_error', { form_type: formType, error_message: errorMessage })
  }

  function trackPortfolioFilter(filterType: 'service' | 'industry', value: string) {
    useTrackEvent('portfolio_filter', { filter_type: filterType, filter_value: value })
  }

  function trackPortfolioItemView(slug: string, title: string) {
    useTrackEvent('portfolio_item_view', { item_slug: slug, item_title: title })
  }

  function trackCaseStudyView(url: string, title: string, industry?: string) {
    useTrackEvent('case_study_view', { case_study_url: url, case_study_title: title, industry: industry ?? 'unknown' })
  }

  function trackCtaClick(label: string, location: string) {
    useTrackEvent('cta_click', { cta_label: label, cta_location: location })
  }

  function trackPackageView(packageName: string, price: string) {
    useTrackEvent('package_view', { package_name: packageName, package_price: price })
  }

  function trackIndustryView(slug: string, name: string) {
    useTrackEvent('industry_page_view', { industry_slug: slug, industry_name: name })
  }

  function trackScrollDepth(page: string, depth: 25 | 50 | 75 | 100) {
    useTrackEvent('scroll_depth', { page_path: page, depth_percent: depth })
  }

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormSuccess,
    trackFormError,
    trackPortfolioFilter,
    trackPortfolioItemView,
    trackCaseStudyView,
    trackCtaClick,
    trackPackageView,
    trackIndustryView,
    trackScrollDepth,
    useScrollDepthTracker,
  }
}

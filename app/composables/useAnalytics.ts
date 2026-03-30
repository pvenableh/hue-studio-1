/**
 * GA4 event tracking composable
 *
 * Wraps nuxt-gtag's useGtag() with typed, domain-specific event helpers.
 * All events use the recommended GA4 naming conventions (snake_case).
 */
export function useAnalytics() {
  const { gtag } = useGtag()

  function trackEvent(name: string, params?: Record<string, any>) {
    gtag('event', name, params)
  }

  return {
    /** Form was successfully submitted */
    trackFormSubmit(formName: string, extra?: Record<string, any>) {
      trackEvent('form_submit', { form_name: formName, ...extra })
    },

    /** CTA button was clicked */
    trackCtaClick(label: string, location: string) {
      trackEvent('cta_click', { cta_label: label, cta_location: location })
    },

    /** Meeting request modal was opened */
    trackMeetingModalOpen() {
      trackEvent('meeting_modal_open')
    },

    /** Service was toggled in the scope builder */
    trackScopeServiceSelected(serviceName: string, selected: boolean) {
      trackEvent('scope_service_toggle', { service_name: serviceName, selected })
    },

    /** Scope builder proposal was requested */
    trackScopeProposalRequested(estimateRange: string, serviceCount: number) {
      trackEvent('scope_proposal_requested', { estimate_range: estimateRange, service_count: serviceCount })
    },

    /** Brand questions section was expanded on contact form */
    trackBrandQuestionsExpanded() {
      trackEvent('brand_questions_expanded')
    },

    /** Navigation link clicked */
    trackNavClick(destination: string) {
      trackEvent('nav_click', { destination })
    },

    /** Before/After slider was interacted with */
    trackBeforeAfterInteraction(projectName: string, direction: 'before' | 'after' | 'drag') {
      trackEvent('before_after_interaction', { project_name: projectName, direction })
    },

    /** Portfolio item was viewed */
    trackPortfolioView(projectName: string, service?: string, industry?: string) {
      trackEvent('portfolio_view', { project_name: projectName, service, industry })
    },

    /** Case study was viewed */
    trackCaseStudyView(title: string, service?: string) {
      trackEvent('case_study_view', { case_study_title: title, service })
    },

    /** Generic event pass-through */
    trackEvent,
  }
}

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

    /** Generic event pass-through */
    trackEvent,
  }
}

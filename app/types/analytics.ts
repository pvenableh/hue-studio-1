export type DateRange = '7d' | '14d' | '30d' | '90d'

export interface AnalyticsData {
  // Core lead metrics
  dailyLeads: { date: string; count: number }[]
  sources: { source: string; sessions: number; conversions: number }[]
  funnel: { form_start: number; form_submit: number; form_success: number; form_error: number }
  pages: { path: string; sessions: number; conversions: number }[]

  // Traffic overview
  traffic: {
    totalSessions: number
    activeUsers: number
    engagementRate: number
    avgSessionDuration: number
  }
  dailySessions: { date: string; sessions: number }[]
  devices: { category: string; sessions: number }[]
  landingPages: { path: string; sessions: number; bounceRate: number; conversions: number; engagementRate: number }[]

  // User data
  cities: { city: string; region: string; sessions: number; users: number; engagementRate: number; avgDuration: number }[]
  ageGroups: { bracket: string; users: number }[]
  genders: { gender: string; users: number }[]

  // Event deep-dive
  ctaClicks: { label: string; location: string; count: number }[]
  portfolioViews: { project: string; count: number }[]
  outboundClicks: { url: string; label: string; count: number }[]

  // Cross-dimensional
  cityPages: { city: string; path: string; sessions: number }[]
  cityLeads: { city: string; region: string; leads: number }[]
  sourcePages: { source: string; page: string; sessions: number; conversions: number }[]

  // Comparison period (null when compare is off)
  comparison: null | {
    totalLeads: number
    totalSessions: number
    activeUsers: number
    engagementRate: number
    avgSessionDuration: number
    formStarts: number
    conversionRate: number
  }
}

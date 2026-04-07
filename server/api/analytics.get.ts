import { BetaAnalyticsDataClient } from '@google-analytics/data'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  let credentials
  try {
    credentials = JSON.parse(config.googleServiceAccount as string)
  } catch {
    throw createError({ statusCode: 500, message: 'Invalid GOOGLE_SERVICE_ACCOUNT_JSON — check your .env file' })
  }

  const propertyId = config.ga4PropertyId as string
  if (!propertyId) throw createError({ statusCode: 500, message: 'GA4_PROPERTY_ID not set in .env' })

  const client = new BetaAnalyticsDataClient({ credentials })

  const usaFilter = {
    filter: {
      fieldName: 'country',
      stringFilter: { matchType: 'EXACT' as const, value: 'United States' }
    }
  }

  const [dailyRes, sourcesRes, funnelRes, pagesRes] = await Promise.all([

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            usaFilter,
            { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'form_success' } } }
          ]
        }
      },
      orderBys: [{ dimension: { dimensionName: 'date' } }]
    }),

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionSourceMedium' }],
      metrics: [{ name: 'sessions' }, { name: 'conversions' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'conversions' }, desc: true }],
      limit: 10
    }),

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            usaFilter,
            { filter: { fieldName: 'eventName', inListFilter: { values: ['form_start', 'form_submit', 'form_success', 'form_error'] } } }
          ]
        }
      }
    }),

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'sessions' }, { name: 'conversions' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'conversions' }, desc: true }],
      limit: 10
    })

  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = (r: any) => ({
    dim: (i: number) => String(r.dimensionValues?.[i]?.value ?? ''),
    met: (i: number) => parseInt(String(r.metricValues?.[i]?.value ?? '0'))
  })

  const dailyLeads = (dailyRes[0]?.rows ?? []).map(r => {
    const v = row(r)
    return { date: v.dim(0), count: v.met(0) }
  })

  const sources = (sourcesRes[0]?.rows ?? []).map(r => {
    const v = row(r)
    return { source: v.dim(0), sessions: v.met(0), conversions: v.met(1) }
  }).filter(s => s.sessions > 0)

  const funnelMap: Record<string, number> = {}
  for (const r of funnelRes[0]?.rows ?? []) {
    const v = row(r)
    funnelMap[v.dim(0)] = v.met(0)
  }
  const funnel = {
    form_start: funnelMap['form_start'] || 0,
    form_submit: funnelMap['form_submit'] || 0,
    form_success: funnelMap['form_success'] || 0,
    form_error: funnelMap['form_error'] || 0
  }

  const pages = (pagesRes[0]?.rows ?? []).map(r => {
    const v = row(r)
    return { path: v.dim(0), sessions: v.met(0), conversions: v.met(1) }
  }).filter(p => p.conversions > 0)

  return { dailyLeads, sources, funnel, pages }
})

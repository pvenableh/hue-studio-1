import { BetaAnalyticsDataClient } from '@google-analytics/data'

const VALID_RANGES = ['7d', '14d', '30d', '90d'] as const

function daysBetween(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return Math.max(1, Math.round((e.getTime() - s.getTime()) / 86400000))
}

function shiftDate(dateStr: string, offsetDays: number) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // Support custom date range or preset
  let startDate: string
  let endDate: string
  let days: number

  const customStart = query.start as string | undefined
  const customEnd = query.end as string | undefined

  if (customStart && customEnd && /^\d{4}-\d{2}-\d{2}$/.test(customStart) && /^\d{4}-\d{2}-\d{2}$/.test(customEnd)) {
    startDate = customStart
    endDate = customEnd
    days = daysBetween(startDate, endDate)
  } else {
    const range = VALID_RANGES.includes(query.range as typeof VALID_RANGES[number])
      ? (query.range as string)
      : '30d'
    days = parseInt(range)
    startDate = `${days}daysAgo`
    endDate = 'today'
  }

  // Comparison period
  const compare = query.compare !== 'false'
  let compStartDate: string
  let compEndDate: string

  if (customStart && customEnd && /^\d{4}-\d{2}-\d{2}$/.test(customStart)) {
    compEndDate = shiftDate(customStart, -1)
    compStartDate = shiftDate(customStart, -days)
  } else {
    compStartDate = `${days * 2}daysAgo`
    compEndDate = `${days + 1}daysAgo`
  }

  let credentials
  try {
    credentials = JSON.parse(config.googleServiceAccount as string)
  } catch {
    throw createError({ statusCode: 500, message: 'Invalid GOOGLE_SERVICE_ACCOUNT_JSON — check your .env file' })
  }

  const propertyId = config.ga4PropertyId as string
  if (!propertyId) throw createError({ statusCode: 500, message: 'GA4_PROPERTY_ID not set in .env' })

  const client = new BetaAnalyticsDataClient({ credentials })
  const property = `properties/${propertyId}`

  const usaFilter = {
    filter: {
      fieldName: 'country',
      stringFilter: { matchType: 'EXACT' as const, value: 'United States' }
    }
  }

  const currentRange = [{ startDate, endDate }]
  const compRange = [{ startDate: compStartDate, endDate: compEndDate }]

  // Dummy resolved promise for when comparison is disabled
  const noOp = Promise.resolve([{ rows: [] }] as unknown as Awaited<ReturnType<typeof client.runReport>>)

  const [
    dailyRes, sourcesRes, funnelRes, pagesRes,
    trafficRes, sessionsRes, devicesRes, landingRes,
    ctaRes, portfolioRes, outboundRes,
    citiesRes, ageRes, genderRes,
    compTrafficRes, compLeadsRes, compFunnelRes
  ] = await Promise.all([

    // 1. Daily leads (existing)
    client.runReport({
      property,
      dateRanges: currentRange,
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

    // 2. Traffic sources (existing)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'sessionSourceMedium' }],
      metrics: [{ name: 'sessions' }, { name: 'conversions' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'conversions' }, desc: true }],
      limit: 50
    }),

    // 3. Funnel events (existing)
    client.runReport({
      property,
      dateRanges: currentRange,
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

    // 4. Top converting pages (existing)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'sessions' }, { name: 'conversions' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'conversions' }, desc: true }],
      limit: 10
    }),

    // 5. Traffic overview (new)
    client.runReport({
      property,
      dateRanges: currentRange,
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' }
      ],
      dimensionFilter: usaFilter
    }),

    // 6. Daily sessions (new)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }],
      dimensionFilter: usaFilter,
      orderBys: [{ dimension: { dimensionName: 'date' } }]
    }),

    // 7. Device breakdown (new)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
    }),

    // 8. Landing pages (new)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'landingPagePlusQueryString' }],
      metrics: [{ name: 'sessions' }, { name: 'bounceRate' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 50
    }),

    // 9. CTA clicks (new)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'eventName' }, { name: 'customEvent:cta_label' }, { name: 'customEvent:cta_location' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            usaFilter,
            { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'cta_click' } } }
          ]
        }
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 15
    }).catch(() => [null]),

    // 10. Portfolio & case study views (new)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'eventName' }, { name: 'customEvent:item_title' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            usaFilter,
            { filter: { fieldName: 'eventName', inListFilter: { values: ['portfolio_item_view', 'case_study_view'] } } }
          ]
        }
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 10
    }).catch(() => [null]),

    // 11. Outbound clicks (new)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'customEvent:link_url' }, { name: 'customEvent:link_label' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            usaFilter,
            { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'outbound_click' } } }
          ]
        }
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 10
    }).catch(() => [null]),

    // 12. Top cities (with region/state)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'city' }, { name: 'region' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 50
    }),

    // 13. Age groups (requires Google Signals enabled)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'userAgeBracket' }],
      metrics: [{ name: 'activeUsers' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
    }).catch(() => [null]),

    // 14. Gender (requires Google Signals enabled)
    client.runReport({
      property,
      dateRanges: currentRange,
      dimensions: [{ name: 'userGender' }],
      metrics: [{ name: 'activeUsers' }],
      dimensionFilter: usaFilter,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }]
    }).catch(() => [null]),

    // --- Comparison period queries (skipped when compare=false) ---

    compare ? client.runReport({
      property,
      dateRanges: compRange,
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' }
      ],
      dimensionFilter: usaFilter
    }) : noOp,

    compare ? client.runReport({
      property,
      dateRanges: compRange,
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            usaFilter,
            { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'form_success' } } }
          ]
        }
      }
    }) : noOp,

    compare ? client.runReport({
      property,
      dateRanges: compRange,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            usaFilter,
            { filter: { fieldName: 'eventName', inListFilter: { values: ['form_start', 'form_success'] } } }
          ]
        }
      }
    }) : noOp
  ])

  // --- Parse results ---

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = (r: any) => ({
    dim: (i: number) => String(r.dimensionValues?.[i]?.value ?? ''),
    met: (i: number) => parseFloat(String(r.metricValues?.[i]?.value ?? '0'))
  })

  // Existing data
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

  // Traffic overview
  const trafficRow = trafficRes[0]?.rows?.[0]
  const tv = trafficRow ? row(trafficRow) : null
  const traffic = {
    totalSessions: tv?.met(0) ?? 0,
    activeUsers: tv?.met(1) ?? 0,
    engagementRate: tv?.met(2) ?? 0,
    avgSessionDuration: tv?.met(3) ?? 0
  }

  // Daily sessions
  const dailySessions = (sessionsRes[0]?.rows ?? []).map(r => {
    const v = row(r)
    return { date: v.dim(0), sessions: v.met(0) }
  })

  // Devices
  const devices = (devicesRes[0]?.rows ?? []).map(r => {
    const v = row(r)
    return { category: v.dim(0), sessions: v.met(0) }
  })

  // Landing pages
  const landingPages = (landingRes[0]?.rows ?? []).map(r => {
    const v = row(r)
    return { path: v.dim(0), sessions: v.met(0), bounceRate: v.met(1) }
  }).filter(p => p.sessions > 0)

  // Cities
  const cities = (citiesRes[0]?.rows ?? []).map(r => {
    const v = row(r)
    return { city: v.dim(0), region: v.dim(1), sessions: v.met(0), users: v.met(1) }
  }).filter(c => c.city && c.city !== '(not set)')

  // Age groups (may be empty if Google Signals not enabled)
  const ageData = Array.isArray(ageRes) ? null : ageRes[0]
  const ageGroups = (ageData?.rows ?? []).map(r => {
    const v = row(r)
    return { bracket: v.dim(0), users: v.met(0) }
  }).filter(a => a.bracket && a.bracket !== 'unknown')

  // Gender (may be empty if Google Signals not enabled)
  const genderData = Array.isArray(genderRes) ? null : genderRes[0]
  const genders = (genderData?.rows ?? []).map(r => {
    const v = row(r)
    return { gender: v.dim(0), users: v.met(0) }
  }).filter(g => g.gender && g.gender !== 'unknown')

  // CTA clicks (may fail if custom dimensions not registered)
  const ctaData = Array.isArray(ctaRes) ? null : ctaRes[0]
  const ctaClicks = (ctaData?.rows ?? []).map(r => {
    const v = row(r)
    return { label: v.dim(1) || '(unknown)', location: v.dim(2) || '(unknown)', count: v.met(0) }
  })

  // Portfolio views
  const portfolioData = Array.isArray(portfolioRes) ? null : portfolioRes[0]
  const portfolioViews = (portfolioData?.rows ?? []).map(r => {
    const v = row(r)
    return { project: v.dim(1) || v.dim(0), count: v.met(0) }
  })

  // Outbound clicks
  const outboundData = Array.isArray(outboundRes) ? null : outboundRes[0]
  const outboundClicks = (outboundData?.rows ?? []).map(r => {
    const v = row(r)
    return { url: v.dim(0) || '(unknown)', label: v.dim(1) || '', count: v.met(0) }
  })

  // --- Comparison period ---
  let comparison = null
  if (compare) {
    const compTrafficRow = compTrafficRes[0]?.rows?.[0]
    const ctv = compTrafficRow ? row(compTrafficRow) : null

    const compLeadsTotal = (compLeadsRes[0]?.rows ?? []).reduce((sum, r) => sum + row(r).met(0), 0)

    const compFunnelMap: Record<string, number> = {}
    for (const r of compFunnelRes[0]?.rows ?? []) {
      const v = row(r)
      compFunnelMap[v.dim(0)] = v.met(0)
    }
    const compFormStarts = compFunnelMap['form_start'] || 0
    const compFormSuccess = compFunnelMap['form_success'] || 0

    comparison = {
      totalLeads: compLeadsTotal,
      totalSessions: ctv?.met(0) ?? 0,
      activeUsers: ctv?.met(1) ?? 0,
      engagementRate: ctv?.met(2) ?? 0,
      avgSessionDuration: ctv?.met(3) ?? 0,
      formStarts: compFormStarts,
      conversionRate: compFormStarts > 0 ? compFormSuccess / compFormStarts : 0
    }
  }

  return {
    dailyLeads, sources, funnel, pages,
    traffic, dailySessions, devices, landingPages,
    cities, ageGroups, genders,
    ctaClicks, portfolioViews, outboundClicks,
    comparison
  }
})

<template>
  <div class="analytics-dashboard">
    <div v-if="pending" class="analytics-loading">Fetching analytics...</div>
    <div v-else-if="error" class="analytics-error">{{ error.message || 'Failed to load analytics' }}</div>
    <template v-else-if="data">
      <!-- Scorecard Row -->
      <div class="scorecard-row">
        <div class="card scorecard">
          <span class="scorecard-label">Total Leads</span>
          <span class="scorecard-value scorecard-value--accent">{{ totalLeads }}</span>
          <span v-if="data.comparison" :class="deltaClass(leadsDelta)">{{ formatDelta(leadsDelta) }}</span>
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Sessions</span>
          <span class="scorecard-value">{{ fmtNum(data.traffic.totalSessions) }}</span>
          <span v-if="data.comparison" :class="deltaClass(sessionsDelta)">{{ formatDelta(sessionsDelta) }}</span>
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Active Users</span>
          <span class="scorecard-value">{{ fmtNum(data.traffic.activeUsers) }}</span>
          <span v-if="data.comparison" :class="deltaClass(usersDelta)">{{ formatDelta(usersDelta) }}</span>
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Conversion Rate</span>
          <span class="scorecard-value">{{ conversionRate }}%</span>
          <span v-if="data.comparison" :class="deltaClass(convRateDelta)">{{ formatDeltaPts(convRateDelta) }}</span>
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Engagement</span>
          <span class="scorecard-value">{{ (data.traffic.engagementRate * 100).toFixed(1) }}%</span>
          <span v-if="data.comparison" :class="deltaClass(engagementDelta)">{{ formatDeltaPts(engagementDelta) }}</span>
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Avg Duration</span>
          <span class="scorecard-value scorecard-value--small">{{ fmtDuration(data.traffic.avgSessionDuration) }}</span>
          <span v-if="data.comparison" :class="deltaClass(durationDelta)">{{ formatDelta(durationDelta) }}</span>
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Form Starts</span>
          <span class="scorecard-value">{{ data.funnel.form_start }}</span>
          <span v-if="data.comparison" :class="deltaClass(formStartsDelta)">{{ formatDelta(formStartsDelta) }}</span>
        </div>
        <div v-if="data.funnel.form_error > 0" class="card scorecard">
          <span class="scorecard-label">Form Errors</span>
          <span class="scorecard-value scorecard-value--warning">{{ data.funnel.form_error }}</span>
        </div>
      </div>

      <!-- Charts: Daily Leads + Daily Sessions -->
      <div class="two-col">
        <div class="card chart-card">
          <h3 class="panel-title">Daily Leads</h3>
          <div v-if="data.dailyLeads.length === 0" class="empty-state">No lead data yet</div>
          <template v-else>
            <div class="chart-wrap">
              <svg class="chart-svg" viewBox="0 -30 560 170" preserveAspectRatio="xMidYMid meet">
                <line x1="8" y1="35" x2="552" y2="35" class="chart-grid" />
                <line x1="8" y1="70" x2="552" y2="70" class="chart-grid" />
                <line x1="8" y1="105" x2="552" y2="105" class="chart-grid" />
                <path :d="leadsChart.areaPath" class="chart-area" />
                <polyline :points="leadsChart.linePoints" class="chart-line" />
                <g v-for="(pt, i) in leadsChart.points" :key="i" class="chart-point-group">
                  <circle :cx="pt.x" :cy="pt.y" r="12" class="chart-hit-area" />
                  <circle :cx="pt.x" :cy="pt.y" r="3" class="chart-dot" />
                  <g class="chart-tooltip">
                    <rect :x="pt.x - 30" :y="pt.y - 28" width="60" height="20" rx="4" class="tooltip-bg" />
                    <text :x="pt.x" :y="pt.y - 15" text-anchor="middle" class="tooltip-text">{{ pt.label }}</text>
                  </g>
                </g>
              </svg>
              <div class="chart-labels">
                <span v-for="(label, i) in leadsChart.xLabels" :key="i">{{ label }}</span>
              </div>
            </div>
          </template>
        </div>
        <div class="card chart-card">
          <h3 class="panel-title">Daily Sessions</h3>
          <div v-if="data.dailySessions.length === 0" class="empty-state">No session data yet</div>
          <template v-else>
            <div class="chart-wrap">
              <svg class="chart-svg" viewBox="0 -30 560 170" preserveAspectRatio="xMidYMid meet">
                <line x1="8" y1="35" x2="552" y2="35" class="chart-grid" />
                <line x1="8" y1="70" x2="552" y2="70" class="chart-grid" />
                <line x1="8" y1="105" x2="552" y2="105" class="chart-grid" />
                <path :d="sessionsChart.areaPath" class="chart-area chart-area--blue" />
                <polyline :points="sessionsChart.linePoints" class="chart-line chart-line--blue" />
                <g v-for="(pt, i) in sessionsChart.points" :key="i" class="chart-point-group">
                  <circle :cx="pt.x" :cy="pt.y" r="12" class="chart-hit-area" />
                  <circle :cx="pt.x" :cy="pt.y" r="3" class="chart-dot chart-dot--blue" />
                  <g class="chart-tooltip">
                    <rect :x="pt.x - 30" :y="pt.y - 28" width="60" height="20" rx="4" class="tooltip-bg tooltip-bg--blue" />
                    <text :x="pt.x" :y="pt.y - 15" text-anchor="middle" class="tooltip-text">{{ pt.label }}</text>
                  </g>
                </g>
              </svg>
              <div class="chart-labels">
                <span v-for="(label, i) in sessionsChart.xLabels" :key="i">{{ label }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Device Breakdown + Landing Pages -->
      <div class="two-col">
        <div class="card">
          <h3 class="panel-title">Devices</h3>
          <div v-if="data.devices.length === 0" class="empty-state">No device data yet</div>
          <div v-else class="device-list">
            <div v-for="d in deviceRows" :key="d.category" class="device-row">
              <div class="device-header">
                <span class="device-label">{{ d.category }}</span>
                <span class="device-count">{{ fmtNum(d.sessions) }} <span class="device-pct">{{ d.pct }}%</span></span>
              </div>
              <div class="funnel-bar-track">
                <div class="funnel-bar-fill step--default" :style="{ width: d.pct + '%' }" />
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <h3 class="panel-title">Top Landing Pages</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Page</th>
                <th class="col-num">Sessions</th>
                <th class="col-num">Leads</th>
                <th class="col-num">Engage</th>
                <th class="col-num">Bounce</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.landingPages.length === 0">
                <td colspan="5" class="empty-state">No data yet</td>
              </tr>
              <tr v-for="p in pagedLanding" :key="p.path">
                <td class="col-path">{{ p.path }}</td>
                <td class="col-num">{{ fmtNum(p.sessions) }}</td>
                <td class="col-num col-lead">{{ p.conversions > 0 ? p.conversions : '—' }}</td>
                <td class="col-num">{{ (p.engagementRate * 100).toFixed(0) }}%</td>
                <td class="col-num">{{ (p.bounceRate * 100).toFixed(0) }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-if="landingTotalPages > 1" class="pagination">
            <button class="page-btn" :disabled="landingPage === 0" @click="landingPage--">&larr;</button>
            <span class="page-info">{{ landingPage + 1 }} / {{ landingTotalPages }}</span>
            <button class="page-btn" :disabled="landingPage >= landingTotalPages - 1" @click="landingPage++">&rarr;</button>
          </div>
        </div>
      </div>

      <!-- User Data: Cities + Demographics -->
      <h2 class="section-title">Users</h2>
      <div class="two-col">
        <div class="card">
          <h3 class="panel-title">Top Cities</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>City</th>
                <th class="col-num">Sessions</th>
                <th class="col-num">Users</th>
                <th class="col-num">Engage</th>
                <th class="col-num">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.cities?.length">
                <td colspan="5" class="empty-state">No city data yet</td>
              </tr>
              <tr v-for="c in pagedCities" :key="c.city + c.region">
                <td>{{ c.city }}<span v-if="c.region && c.region !== '(not set)'" class="col-muted">, {{ c.region }}</span></td>
                <td class="col-num">{{ fmtNum(c.sessions) }}</td>
                <td class="col-num">{{ fmtNum(c.users) }}</td>
                <td class="col-num">{{ (c.engagementRate * 100).toFixed(0) }}%</td>
                <td class="col-num">{{ fmtDuration(c.avgDuration) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="citiesTotalPages > 1" class="pagination">
            <button class="page-btn" :disabled="citiesPage === 0" @click="citiesPage--">&larr;</button>
            <span class="page-info">{{ citiesPage + 1 }} / {{ citiesTotalPages }}</span>
            <button class="page-btn" :disabled="citiesPage >= citiesTotalPages - 1" @click="citiesPage++">&rarr;</button>
          </div>
        </div>
        <div class="card">
          <h3 class="panel-title">Demographics</h3>
          <div v-if="!data.ageGroups?.length && !data.genders?.length" class="empty-state">
            No demographic data yet — requires Google Signals
          </div>
          <template v-else>
            <div v-if="data.genders?.length" class="demo-section">
              <h4 class="demo-subtitle">Gender</h4>
              <div class="demo-bars">
                <div v-for="g in genderRows" :key="g.gender" class="device-row">
                  <div class="device-header">
                    <span class="device-label">{{ g.gender }}</span>
                    <span class="device-count">{{ fmtNum(g.users) }} <span class="device-pct">{{ g.pct }}%</span></span>
                  </div>
                  <div class="funnel-bar-track">
                    <div class="funnel-bar-fill step--default" :style="{ width: g.pct + '%' }" />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="data.ageGroups?.length" class="demo-section">
              <h4 class="demo-subtitle">Age</h4>
              <div class="demo-bars">
                <div v-for="a in ageRows" :key="a.bracket" class="device-row">
                  <div class="device-header">
                    <span class="device-label">{{ a.bracket }}</span>
                    <span class="device-count">{{ fmtNum(a.users) }} <span class="device-pct">{{ a.pct }}%</span></span>
                  </div>
                  <div class="funnel-bar-track">
                    <div class="funnel-bar-fill step--default" :style="{ width: a.pct + '%' }" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Cross-Dimensional Insights -->
      <h2 class="section-title">Insights</h2>
      <div class="two-col">
        <div class="card">
          <h3 class="panel-title">Leads by City</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>City</th>
                <th class="col-num">Leads</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.cityLeads?.length">
                <td colspan="2" class="empty-state">No lead-by-city data yet</td>
              </tr>
              <tr v-for="c in data.cityLeads?.slice(0, 15)" :key="c.city + c.region">
                <td>{{ c.city }}<span v-if="c.region && c.region !== '(not set)'" class="col-muted">, {{ c.region }}</span></td>
                <td class="col-num col-lead">{{ c.leads }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card">
          <h3 class="panel-title">Source → Page Conversions</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Landing Page</th>
                <th class="col-num">Leads</th>
                <th class="col-num">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!data.sourcePages?.length">
                <td colspan="4" class="empty-state">No conversion path data yet</td>
              </tr>
              <tr v-for="s in data.sourcePages?.slice(0, 15)" :key="s.source + s.page">
                <td class="col-muted" style="font-size: 12px;">{{ s.source || '(direct)' }}</td>
                <td class="col-path" style="font-size: 12px;">{{ s.page }}</td>
                <td class="col-num col-lead">{{ s.conversions }}</td>
                <td class="col-num">{{ s.sessions > 0 ? ((s.conversions / s.sessions) * 100).toFixed(1) : '0.0' }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Pages by City -->
      <div class="card">
        <h3 class="panel-title">Top Pages by City</h3>
        <div v-if="!data.cityPages?.length" class="empty-state">No city-page data yet</div>
        <div v-else class="city-pages-grid">
          <div v-for="group in cityPageGroups" :key="group.city" class="city-page-group">
            <h4 class="city-page-city">{{ group.city }}</h4>
            <div v-for="p in group.pages" :key="p.path" class="city-page-row">
              <span class="city-page-path">{{ p.path }}</span>
              <span class="city-page-sessions">{{ p.sessions }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Funnel Health & Sources side by side -->
      <div class="two-col">
        <div class="card">
          <h3 class="panel-title">Funnel Health</h3>
          <div class="funnel-list">
            <div v-for="step in funnelSteps" :key="step.key" class="funnel-step">
              <div class="funnel-step-header">
                <span class="funnel-label">{{ step.label }}</span>
                <span class="funnel-count">{{ step.count }}</span>
              </div>
              <div class="funnel-bar-track">
                <div class="funnel-bar-fill" :class="step.cls" :style="{ width: step.pct + '%' }" />
              </div>
              <span class="funnel-pct">{{ step.pct }}%</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h3 class="panel-title">Leads by Source</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Source / Medium</th>
                <th class="col-num">Sessions</th>
                <th class="col-num">Leads</th>
                <th class="col-num">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.sources.length === 0">
                <td colspan="4" class="empty-state">No source data yet</td>
              </tr>
              <tr v-for="s in pagedSources" :key="s.source">
                <td>{{ s.source || '(direct)' }}</td>
                <td class="col-num">{{ s.sessions }}</td>
                <td class="col-num col-lead">{{ s.conversions }}</td>
                <td class="col-num">{{ s.sessions > 0 ? ((s.conversions / s.sessions) * 100).toFixed(1) : '0.0' }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-if="sourcesTotalPages > 1" class="pagination">
            <button class="page-btn" :disabled="sourcesPage === 0" @click="sourcesPage--">&larr;</button>
            <span class="page-info">{{ sourcesPage + 1 }} / {{ sourcesTotalPages }}</span>
            <button class="page-btn" :disabled="sourcesPage >= sourcesTotalPages - 1" @click="sourcesPage++">&rarr;</button>
          </div>
        </div>
      </div>

      <!-- Top Converting Pages -->
      <div class="card">
        <h3 class="panel-title">Top Converting Pages</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Page</th>
              <th class="col-num">Sessions</th>
              <th class="col-num">Leads</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="data.pages.length === 0">
              <td colspan="3" class="empty-state">No page data yet</td>
            </tr>
            <tr v-for="p in data.pages" :key="p.path">
              <td class="col-path">{{ p.path }}</td>
              <td class="col-num">{{ p.sessions }}</td>
              <td class="col-num col-lead">{{ p.conversions }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Event Deep-Dive -->
      <h2 class="section-title">Event Tracking</h2>
      <div class="two-col">
        <div class="card">
          <h3 class="panel-title">CTA Clicks</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Location</th>
                <th class="col-num">Clicks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.ctaClicks.length === 0">
                <td colspan="3" class="empty-state">No CTA data yet</td>
              </tr>
              <tr v-for="c in data.ctaClicks" :key="c.label + c.location">
                <td>{{ c.label }}</td>
                <td class="col-muted">{{ c.location }}</td>
                <td class="col-num">{{ c.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card">
          <h3 class="panel-title">Portfolio & Case Study Views</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th class="col-num">Views</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.portfolioViews.length === 0">
                <td colspan="2" class="empty-state">No view data yet</td>
              </tr>
              <tr v-for="p in data.portfolioViews" :key="p.project">
                <td>{{ p.project }}</td>
                <td class="col-num">{{ p.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="two-col">
        <div class="card">
          <h3 class="panel-title">Outbound Clicks</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Label</th>
                <th class="col-num">Clicks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.outboundClicks.length === 0">
                <td colspan="3" class="empty-state">No outbound data yet</td>
              </tr>
              <tr v-for="o in data.outboundClicks" :key="o.url">
                <td class="col-path">{{ o.url }}</td>
                <td class="col-muted">{{ o.label || '—' }}</td>
                <td class="col-num">{{ o.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { AnalyticsData, DateRange } from '~/types/analytics'

const props = defineProps<{
  range: DateRange
  customStart?: string
  customEnd?: string
  compare?: boolean
}>()

const { data, pending, error, refresh } = useFetch<AnalyticsData>('/api/analytics', {
  query: computed(() => {
    const q: Record<string, string> = { compare: String(props.compare ?? true) }
    if (props.customStart && props.customEnd) {
      q.start = props.customStart
      q.end = props.customEnd
    } else {
      q.range = props.range
    }
    return q
  }),
  watch: [() => props.range, () => props.customStart, () => props.customEnd, () => props.compare]
})

defineExpose({ refresh })

// --- Pagination ---

const PAGE_SIZE = 10

const citiesPage = ref(0)
const landingPage = ref(0)
const sourcesPage = ref(0)

// Reset pages when data changes
watch(data, () => {
  citiesPage.value = 0
  landingPage.value = 0
  sourcesPage.value = 0
})

function paginate<T>(items: T[], page: number) {
  const start = page * PAGE_SIZE
  return items.slice(start, start + PAGE_SIZE)
}

function totalPages(items: unknown[]) {
  return Math.ceil(items.length / PAGE_SIZE)
}

const pagedCities = computed(() => paginate(data.value?.cities ?? [], citiesPage.value))
const pagedLanding = computed(() => paginate(data.value?.landingPages ?? [], landingPage.value))
const pagedSources = computed(() => paginate(data.value?.sources ?? [], sourcesPage.value))

const citiesTotalPages = computed(() => totalPages(data.value?.cities ?? []))
const landingTotalPages = computed(() => totalPages(data.value?.landingPages ?? []))
const sourcesTotalPages = computed(() => totalPages(data.value?.sources ?? []))

// --- Helpers ---

function fmtNum(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(Math.round(n))
}

function fmtDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

function pctChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

function formatDelta(pct: number) {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

function formatDeltaPts(pct: number) {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}pts`
}

function deltaClass(pct: number) {
  return ['scorecard-delta', pct > 0 ? 'delta--up' : pct < 0 ? 'delta--down' : 'delta--flat']
}

// --- Comparison deltas ---

const totalLeads = computed(() =>
  data.value?.dailyLeads.reduce((sum, d) => sum + d.count, 0) ?? 0
)

const conversionRate = computed(() => {
  if (!data.value || data.value.funnel.form_start === 0) return '0.0'
  return ((data.value.funnel.form_success / data.value.funnel.form_start) * 100).toFixed(1)
})

const currentConvRate = computed(() => {
  if (!data.value || data.value.funnel.form_start === 0) return 0
  return (data.value.funnel.form_success / data.value.funnel.form_start) * 100
})

const leadsDelta = computed(() => pctChange(totalLeads.value, data.value?.comparison.totalLeads ?? 0))
const sessionsDelta = computed(() => pctChange(data.value?.traffic.totalSessions ?? 0, data.value?.comparison.totalSessions ?? 0))
const usersDelta = computed(() => pctChange(data.value?.traffic.activeUsers ?? 0, data.value?.comparison.activeUsers ?? 0))
const convRateDelta = computed(() => currentConvRate.value - (data.value?.comparison.conversionRate ?? 0) * 100)
const engagementDelta = computed(() => (data.value?.traffic.engagementRate ?? 0) * 100 - (data.value?.comparison.engagementRate ?? 0) * 100)
const durationDelta = computed(() => pctChange(data.value?.traffic.avgSessionDuration ?? 0, data.value?.comparison.avgSessionDuration ?? 0))
const formStartsDelta = computed(() => pctChange(data.value?.funnel.form_start ?? 0, data.value?.comparison.formStarts ?? 0))

// --- Funnel ---

const funnelSteps = computed(() => {
  if (!data.value) return []
  const f = data.value.funnel
  const top = f.form_start || 1
  return [
    { key: 'form_start', label: 'Form Starts', count: f.form_start, pct: +(f.form_start / top * 100).toFixed(1), cls: 'step--default' },
    { key: 'form_submit', label: 'Submits', count: f.form_submit, pct: +(f.form_submit / top * 100).toFixed(1), cls: 'step--default' },
    { key: 'form_success', label: 'Successful', count: f.form_success, pct: +(f.form_success / top * 100).toFixed(1), cls: 'step--success' },
    { key: 'form_error', label: 'Errors', count: f.form_error, pct: +(f.form_error / top * 100).toFixed(1), cls: 'step--error' },
  ]
})

// --- Devices ---

const deviceRows = computed(() => {
  if (!data.value) return []
  const total = data.value.devices.reduce((s, d) => s + d.sessions, 0) || 1
  return data.value.devices.map(d => ({
    ...d,
    pct: +((d.sessions / total) * 100).toFixed(1)
  }))
})

// --- Demographics ---

const genderRows = computed(() => {
  if (!data.value) return []
  const total = data.value.genders.reduce((s, g) => s + g.users, 0) || 1
  return data.value.genders.map(g => ({
    ...g,
    gender: g.gender.charAt(0).toUpperCase() + g.gender.slice(1),
    pct: +((g.users / total) * 100).toFixed(1)
  }))
})

const ageRows = computed(() => {
  if (!data.value) return []
  const total = data.value.ageGroups.reduce((s, a) => s + a.users, 0) || 1
  return data.value.ageGroups.map(a => ({
    ...a,
    pct: +((a.users / total) * 100).toFixed(1)
  }))
})

// --- Chart helper ---

function computeChart(items: { date: string; value: number }[]) {
  const pad = 8
  const w = 560 - pad * 2
  const h = 140 - pad * 2
  const maxVal = Math.max(...items.map(d => d.value), 1)

  const fmt = (raw: string) => {
    const m = parseInt(raw.slice(4, 6))
    const d = parseInt(raw.slice(6, 8))
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[m - 1]} ${d}`
  }

  let points: { x: number; y: number; label: string }[]
  if (items.length === 1) {
    points = [{ x: 560 / 2, y: pad + h - (items[0]!.value / maxVal) * h, label: `${fmt(items[0]!.date)}: ${items[0]!.value}` }]
  } else {
    points = items.map((d, i) => ({
      x: pad + (i / (items.length - 1)) * w,
      y: pad + h - (d.value / maxVal) * h,
      label: `${fmt(d.date)}: ${d.value}`
    }))
  }

  const linePoints = points.map(p => `${p.x},${p.y}`).join(' ')

  const bottom = 140 - pad
  let areaPath = ''
  if (points.length > 0) {
    areaPath = `M${points[0]!.x},${bottom} L${points[0]!.x},${points[0]!.y}`
    for (let i = 1; i < points.length; i++) {
      areaPath += ` L${points[i]!.x},${points[i]!.y}`
    }
    areaPath += ` L${points[points.length - 1]!.x},${bottom} Z`
  }

  let xLabels: string[] = []
  if (items.length === 1) {
    xLabels = [fmt(items[0]!.date)]
  } else if (items.length === 2) {
    xLabels = [fmt(items[0]!.date), fmt(items[1]!.date)]
  } else if (items.length > 2) {
    xLabels = [
      fmt(items[0]!.date),
      fmt(items[Math.floor(items.length / 2)]!.date),
      fmt(items[items.length - 1]!.date)
    ]
  }

  return { points, linePoints, areaPath, xLabels }
}

const leadsChart = computed(() =>
  computeChart((data.value?.dailyLeads ?? []).map(d => ({ date: d.date, value: d.count })))
)

const sessionsChart = computed(() =>
  computeChart((data.value?.dailySessions ?? []).map(d => ({ date: d.date, value: d.sessions })))
)

// --- City → Page groups (top 5 cities, top 5 pages each) ---
const cityPageGroups = computed(() => {
  const rows = data.value?.cityPages ?? []
  const grouped = new Map<string, { path: string; sessions: number }[]>()
  for (const r of rows) {
    if (!grouped.has(r.city)) grouped.set(r.city, [])
    grouped.get(r.city)!.push({ path: r.path, sessions: r.sessions })
  }
  // Top 5 cities by total sessions, top 5 pages per city
  return [...grouped.entries()]
    .map(([city, pages]) => ({ city, pages: pages.slice(0, 5), total: pages.reduce((s, p) => s + p.sessions, 0) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
</style>

<style scoped>
.analytics-dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 16px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a18;
}

/* Loading / Error */
.analytics-loading {
  text-align: center;
  padding: 64px 0;
  color: #6b6b67;
  font-size: 14px;
}
.analytics-error {
  text-align: center;
  padding: 64px 0;
  color: #c0392b;
  font-size: 14px;
}

/* Section title */
.section-title {
  font-size: 15px;
  font-weight: 500;
  color: #6b6b67;
  margin: 8px 0 -8px;
  letter-spacing: 0.02em;
}

/* Card */
.card {
  background: #ffffff;
  border: 1px solid #e8e8e4;
  border-radius: 12px;
  padding: 24px;
}

.panel-title {
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b6b67;
  margin: 0 0 16px;
}

/* Scorecard row */
.scorecard-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}
.scorecard {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.scorecard-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b6b67;
}
.scorecard-value {
  font-family: 'DM Mono', monospace;
  font-size: 28px;
  font-weight: 500;
  color: #1a1a18;
  line-height: 1.1;
}
.scorecard-value--small {
  font-size: 22px;
}
.scorecard-value--accent {
  color: #1a7a4a;
}
.scorecard-value--warning {
  color: #c0392b;
}

/* Comparison deltas */
.scorecard-delta {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}
.delta--up {
  color: #1a7a4a;
}
.delta--down {
  color: #c0392b;
}
.delta--flat {
  color: #6b6b67;
}

/* Chart */
.chart-card {
  overflow: visible;
}
.chart-svg {
  width: 100%;
  height: auto;
  display: block;
}
.chart-grid {
  stroke: #f0f0ec;
  stroke-width: 1;
}
.chart-area {
  fill: rgba(26, 122, 74, 0.08);
}
.chart-area--blue {
  fill: rgba(74, 111, 165, 0.08);
}
.chart-line {
  fill: none;
  stroke: #1a7a4a;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.chart-line--blue {
  stroke: #4a6fa5;
}
.chart-dot {
  fill: #1a7a4a;
}
.chart-dot--blue {
  fill: #4a6fa5;
}
/* Chart tooltips */
.chart-wrap {
  position: relative;
}
.chart-hit-area {
  fill: transparent;
  cursor: pointer;
}
.chart-tooltip {
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}
.chart-point-group:hover .chart-tooltip {
  opacity: 1;
}
.chart-point-group:hover .chart-dot {
  r: 5;
}
.tooltip-bg {
  fill: #1a1a18;
}
.tooltip-bg--blue {
  fill: #4a6fa5;
}
.tooltip-text {
  fill: #ffffff;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
}
.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 0;
  font-size: 11px;
  color: #6b6b67;
}

/* Two column layout */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 768px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}

/* Devices */
.device-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.device-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.device-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.device-label {
  font-size: 13px;
  color: #1a1a18;
  text-transform: capitalize;
}
.device-count {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
}
.device-pct {
  color: #6b6b67;
  font-weight: 400;
}

/* Demographics */
.demo-section {
  margin-bottom: 20px;
}
.demo-section:last-child {
  margin-bottom: 0;
}
.demo-subtitle {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b6b67;
  margin: 0 0 12px;
}
.demo-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Funnel */
.funnel-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.funnel-step-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}
.funnel-label {
  font-size: 13px;
  color: #1a1a18;
}
.funnel-count {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
}
.funnel-bar-track {
  height: 6px;
  background: #f0f0ec;
  border-radius: 3px;
  overflow: hidden;
}
.funnel-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}
.funnel-bar-fill.step--default {
  background: #1a7a4a;
}
.funnel-bar-fill.step--success {
  background: #1a7a4a;
}
.funnel-bar-fill.step--error {
  background: #c0392b;
}
.funnel-pct {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: #6b6b67;
  margin-top: 2px;
  display: inline-block;
}

/* Tables */
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b6b67;
  font-weight: 500;
  text-align: left;
  padding: 0 8px 10px;
  border-bottom: 1px solid #e8e8e4;
}
.data-table td {
  font-size: 14px;
  padding: 0 8px;
  height: 48px;
  vertical-align: middle;
}
.data-table tbody tr:hover {
  background: #fafaf8;
}
.col-num {
  text-align: right;
  font-family: 'DM Mono', monospace;
}
.col-lead {
  color: #1a7a4a;
  font-weight: 500;
}
.col-path {
  word-break: break-all;
  max-width: 400px;
}
.col-muted {
  color: #6b6b67;
  font-size: 13px;
}

/* Empty states */
.empty-state {
  text-align: center;
  color: #6b6b67;
  font-size: 13px;
  padding: 32px 0;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0ec;
  margin-top: 4px;
}
.page-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8e4;
  border-radius: 6px;
  background: #ffffff;
  color: #1a1a18;
  cursor: pointer;
  transition: all 0.15s;
}
.page-btn:hover:not(:disabled) {
  background: #f0f0ec;
}
.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.page-info {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: #6b6b67;
}

/* City → Pages grid */
.city-pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
.city-page-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.city-page-city {
  font-size: 13px;
  font-weight: 500;
  color: #1a1a18;
  margin: 0 0 4px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0ec;
}
.city-page-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}
.city-page-path {
  font-size: 12px;
  color: #6b6b67;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}
.city-page-sessions {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  color: #1a1a18;
  flex-shrink: 0;
}
</style>

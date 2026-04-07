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
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Form Starts</span>
          <span class="scorecard-value">{{ data.funnel.form_start }}</span>
        </div>
        <div class="card scorecard">
          <span class="scorecard-label">Conversion Rate</span>
          <span class="scorecard-value">{{ conversionRate }}%</span>
        </div>
        <div v-if="data.funnel.form_error > 0" class="card scorecard">
          <span class="scorecard-label">Form Errors</span>
          <span class="scorecard-value scorecard-value--warning">{{ data.funnel.form_error }}</span>
        </div>
      </div>

      <!-- Daily Leads Chart -->
      <div class="card chart-card">
        <h3 class="panel-title">Daily Leads</h3>
        <div v-if="data.dailyLeads.length === 0" class="empty-state">No lead data yet</div>
        <template v-else>
          <svg class="chart-svg" viewBox="0 0 560 140" preserveAspectRatio="xMidYMid meet">
            <!-- Grid lines -->
            <line x1="8" y1="35" x2="552" y2="35" class="chart-grid" />
            <line x1="8" y1="70" x2="552" y2="70" class="chart-grid" />
            <line x1="8" y1="105" x2="552" y2="105" class="chart-grid" />
            <!-- Area fill -->
            <path :d="areaPath" class="chart-area" />
            <!-- Line -->
            <polyline :points="linePoints" class="chart-line" />
            <!-- Dots -->
            <circle
              v-for="(pt, i) in chartPoints"
              :key="i"
              :cx="pt.x"
              :cy="pt.y"
              r="3"
              class="chart-dot"
            />
          </svg>
          <div class="chart-labels">
            <span v-for="(label, i) in xLabels" :key="i">{{ label }}</span>
          </div>
        </template>
      </div>

      <!-- Funnel Health & Sources side by side -->
      <div class="two-col">
        <!-- Funnel Health -->
        <div class="card">
          <h3 class="panel-title">Funnel Health</h3>
          <div class="funnel-list">
            <div v-for="step in funnelSteps" :key="step.key" class="funnel-step">
              <div class="funnel-step-header">
                <span class="funnel-label">{{ step.label }}</span>
                <span class="funnel-count">{{ step.count }}</span>
              </div>
              <div class="funnel-bar-track">
                <div
                  class="funnel-bar-fill"
                  :class="step.cls"
                  :style="{ width: step.pct + '%' }"
                />
              </div>
              <span class="funnel-pct">{{ step.pct }}%</span>
            </div>
          </div>
        </div>

        <!-- Leads by Source -->
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
              <tr v-for="s in data.sources" :key="s.source">
                <td>{{ s.source || '(direct)' }}</td>
                <td class="col-num">{{ s.sessions }}</td>
                <td class="col-num col-lead">{{ s.conversions }}</td>
                <td class="col-num">{{ s.sessions > 0 ? ((s.conversions / s.sessions) * 100).toFixed(1) : '0.0' }}%</td>
              </tr>
            </tbody>
          </table>
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
    </template>
  </div>
</template>

<script setup lang="ts">
interface AnalyticsData {
  dailyLeads: { date: string; count: number }[]
  sources: { source: string; sessions: number; conversions: number }[]
  funnel: { form_start: number; form_submit: number; form_success: number; form_error: number }
  pages: { path: string; sessions: number; conversions: number }[]
}

const { data, pending, error } = useFetch<AnalyticsData>('/api/analytics')

const totalLeads = computed(() =>
  data.value?.dailyLeads.reduce((sum, d) => sum + d.count, 0) ?? 0
)

const conversionRate = computed(() => {
  if (!data.value || data.value.funnel.form_start === 0) return '0.0'
  return ((data.value.funnel.form_success / data.value.funnel.form_start) * 100).toFixed(1)
})

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

const chartPoints = computed(() => {
  if (!data.value || data.value.dailyLeads.length === 0) return []
  const leads = data.value.dailyLeads
  const pad = 8
  const w = 560 - pad * 2
  const h = 140 - pad * 2
  const maxCount = Math.max(...leads.map(d => d.count), 1)

  if (leads.length === 1) {
    return [{ x: 560 / 2, y: pad + h - (leads[0]!.count / maxCount) * h }]
  }

  return leads.map((d, i) => ({
    x: pad + (i / (leads.length - 1)) * w,
    y: pad + h - (d.count / maxCount) * h
  }))
})

const linePoints = computed(() =>
  chartPoints.value.map(p => `${p.x},${p.y}`).join(' ')
)

const areaPath = computed(() => {
  const pts = chartPoints.value
  if (pts.length === 0) return ''
  const bottom = 140 - 8
  let d = `M${pts[0]!.x},${bottom} L${pts[0]!.x},${pts[0]!.y}`
  for (let i = 1; i < pts.length; i++) {
    d += ` L${pts[i]!.x},${pts[i]!.y}`
  }
  d += ` L${pts[pts.length - 1]!.x},${bottom} Z`
  return d
})

const xLabels = computed(() => {
  if (!data.value || data.value.dailyLeads.length === 0) return []
  const leads = data.value.dailyLeads
  const fmt = (raw: string) => {
    const m = parseInt(raw.slice(4, 6))
    const d = parseInt(raw.slice(6, 8))
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[m - 1]} ${d}`
  }
  const first = leads[0]!.date
  const mid = leads[Math.floor(leads.length / 2)]!.date
  const last = leads[leads.length - 1]!.date
  return [fmt(first), fmt(mid), fmt(last)]
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
.scorecard {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.scorecard-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b6b67;
}
.scorecard-value {
  font-family: 'DM Mono', monospace;
  font-size: 32px;
  font-weight: 500;
  color: #1a1a18;
  line-height: 1.1;
}
.scorecard-value--accent {
  color: #1a7a4a;
}
.scorecard-value--warning {
  color: #c0392b;
}

/* Chart */
.chart-card {
  overflow: hidden;
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
.chart-line {
  fill: none;
  stroke: #1a7a4a;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.chart-dot {
  fill: #1a7a4a;
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

/* Empty states */
.empty-state {
  text-align: center;
  color: #6b6b67;
  font-size: 13px;
  padding: 32px 0;
}
</style>

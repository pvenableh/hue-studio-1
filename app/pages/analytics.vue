<template>
  <div class="analytics-page">
    <div v-if="!authenticated" class="gate">
      <form class="gate-card" @submit.prevent="submit">
        <h1 class="gate-title">Analytics</h1>
        <p class="gate-subtitle">Enter the password to view the dashboard.</p>
        <input
          v-model="password"
          type="password"
          class="gate-input"
          placeholder="Password"
          autocomplete="off"
          autofocus
        />
        <p v-if="errorMsg" class="gate-error">{{ errorMsg }}</p>
        <button type="submit" class="gate-button" :disabled="loading">
          {{ loading ? 'Checking...' : 'Continue' }}
        </button>
      </form>
    </div>
    <template v-else>
      <div class="dashboard-header">
        <h1 class="dashboard-title">Analytics</h1>
        <div class="dashboard-controls">
          <div class="range-group">
            <button
              v-for="r in ranges"
              :key="r"
              :class="['range-btn', { 'range-btn--active': !useCustom && range === r }]"
              @click="selectPreset(r)"
            >{{ r }}</button>
          </div>
          <div class="date-picker-group">
            <input
              type="date"
              v-model="customStart"
              class="date-input"
              :max="today"
              @change="applyCustom"
            />
            <span class="date-separator">–</span>
            <input
              type="date"
              v-model="customEnd"
              class="date-input"
              :max="today"
              @change="applyCustom"
            />
          </div>
          <button class="refresh-btn" :class="{ 'refresh-btn--spinning': refreshing }" @click="handleRefresh">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.65 2.35A7.96 7.96 0 0 0 8 0C3.58 0 .01 3.58.01 8S3.58 16 8 16c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 8 14 6 6 0 1 1 8 2c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="dashboard-meta">
        <label class="compare-toggle">
          <input type="checkbox" v-model="compareEnabled" class="compare-checkbox" />
          <span class="compare-label">Compare to previous period</span>
        </label>
        <p v-if="useCustom" class="dashboard-range-label">
          {{ customStart }} to {{ customEnd }}{{ compareEnabled ? ' vs previous period' : '' }}
        </p>
        <p v-else class="dashboard-range-label">
          Last {{ range }}{{ compareEnabled ? ` vs previous ${range}` : '' }}
        </p>
      </div>
      <AnalyticsDashboard
        ref="dashboardRef"
        :range="range"
        :custom-start="useCustom ? customStart : undefined"
        :custom-end="useCustom ? customEnd : undefined"
        :compare="compareEnabled"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { DateRange } from '~/types/analytics'

definePageMeta({ layout: false })

useHead({ title: 'Analytics — Hue Studios' })

const password = ref('')
const authenticated = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const range = ref<DateRange>('30d')
const ranges: DateRange[] = ['7d', '14d', '30d', '90d']
const dashboardRef = ref<{ refresh: () => void } | null>(null)
const refreshing = ref(false)
const compareEnabled = ref(true)
const useCustom = ref(false)

const today = new Date().toISOString().slice(0, 10)
const customStart = ref(new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10))
const customEnd = ref(today)

function selectPreset(r: DateRange) {
  useCustom.value = false
  range.value = r
  const days = parseInt(r)
  customEnd.value = today
  customStart.value = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)
}

function applyCustom() {
  if (customStart.value && customEnd.value && customStart.value <= customEnd.value) {
    useCustom.value = true
  }
}

async function submit() {
  errorMsg.value = ''
  loading.value = true
  try {
    await $fetch('/api/analytics-auth', {
      method: 'POST',
      body: { password: password.value }
    })
    authenticated.value = true
  } catch {
    errorMsg.value = 'Wrong password'
    password.value = ''
  } finally {
    loading.value = false
  }
}

async function handleRefresh() {
  refreshing.value = true
  dashboardRef.value?.refresh()
  setTimeout(() => { refreshing.value = false }, 800)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');
</style>

<style scoped>
.analytics-page {
  min-height: 100vh;
  background: #fafaf8;
  font-family: 'DM Sans', sans-serif;
}

/* Gate */
.gate {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 16px;
}

.gate-card {
  background: #ffffff;
  border: 1px solid #e8e8e4;
  border-radius: 12px;
  padding: 40px 32px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gate-title {
  font-size: 22px;
  font-weight: 500;
  color: #1a1a18;
  margin: 0;
}

.gate-subtitle {
  font-size: 14px;
  color: #6b6b67;
  margin: 0;
}

.gate-input {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  padding: 10px 14px;
  border: 1px solid #e8e8e4;
  border-radius: 8px;
  outline: none;
  color: #1a1a18;
  background: #fafaf8;
  transition: border-color 0.15s;
}
.gate-input:focus {
  border-color: #1a7a4a;
}

.gate-error {
  font-size: 13px;
  color: #c0392b;
  margin: 0;
}

.gate-button {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #1a1a18;
  color: #ffffff;
  cursor: pointer;
  transition: opacity 0.15s;
}
.gate-button:hover {
  opacity: 0.85;
}
.gate-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dashboard header */
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 16px 0;
}

.dashboard-title {
  font-size: 22px;
  font-weight: 500;
  color: #1a1a18;
  margin: 0;
}

.dashboard-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.range-group {
  display: flex;
  background: #ffffff;
  border: 1px solid #e8e8e4;
  border-radius: 8px;
  overflow: hidden;
}

.range-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 14px;
  border: none;
  background: transparent;
  color: #6b6b67;
  cursor: pointer;
  transition: all 0.15s;
}
.range-btn:not(:last-child) {
  border-right: 1px solid #e8e8e4;
}
.range-btn--active {
  background: #1a7a4a;
  color: #ffffff;
}
.range-btn:hover:not(.range-btn--active) {
  background: #f0f0ec;
}

/* Date picker */
.date-picker-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-input {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  padding: 7px 10px;
  border: 1px solid #e8e8e4;
  border-radius: 8px;
  background: #ffffff;
  color: #1a1a18;
  outline: none;
  transition: border-color 0.15s;
}
.date-input:focus {
  border-color: #1a7a4a;
}

.date-separator {
  color: #6b6b67;
  font-size: 13px;
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e8e8e4;
  border-radius: 8px;
  background: #ffffff;
  color: #6b6b67;
  cursor: pointer;
  transition: all 0.15s;
}
.refresh-btn:hover {
  background: #f0f0ec;
  color: #1a1a18;
}
.refresh-btn--spinning svg {
  animation: spin 0.6s ease;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Meta row */
.dashboard-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1120px;
  margin: 8px auto 0;
  padding: 0 16px;
}

.compare-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.compare-checkbox {
  width: 14px;
  height: 14px;
  accent-color: #1a7a4a;
  cursor: pointer;
}

.compare-label {
  font-size: 12px;
  color: #6b6b67;
  user-select: none;
}

.dashboard-range-label {
  font-size: 12px;
  color: #6b6b67;
  margin: 0;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .dashboard-controls {
    width: 100%;
  }
  .date-picker-group {
    width: 100%;
  }
  .date-input {
    flex: 1;
    min-width: 0;
  }
  .dashboard-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>

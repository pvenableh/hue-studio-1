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
    <AnalyticsDashboard v-else />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({ title: 'Analytics — Hue Studios' })

const password = ref('')
const authenticated = ref(false)
const loading = ref(false)
const errorMsg = ref('')

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
</style>

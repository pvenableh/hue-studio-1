<template>
  <section id="contact" class="intel-section" style="background: var(--color-bg-alt);">
    <div class="intel-container-sm px-6 md:px-10 text-center">
      <h2 class="intel-h2-italic mb-6 reveal">"Let's find your first win."</h2>
      <p class="intel-body-lg mx-auto mb-12 max-w-lg reveal reveal-delay-1">
        Start with a free 30-minute AI Readiness conversation. We'll identify
        the highest-impact opportunity in your organization and show you exactly
        what's possible — no commitment required.
      </p>

      <!-- Form -->
      <form
        v-if="!submitted"
        class="mx-auto flex max-w-2xl flex-col gap-4 md:flex-row md:flex-wrap reveal reveal-delay-2"
        @submit.prevent="handleSubmit"
      >
        <input
          v-model="form.first_name"
          type="text"
          placeholder="First name"
          required
          class="intel-input md:flex-1"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="intel-input md:flex-1"
        />
        <select v-model="form.organization_type" class="intel-select md:flex-1" required>
          <option value="" disabled>Organization type</option>
          <option value="architecture-construction">Architecture / Construction</option>
          <option value="chamber-of-commerce">Chamber of Commerce</option>
          <option value="ngo-nonprofit">NGO / Nonprofit</option>
          <option value="small-business">Small Business</option>
          <option value="other">Other</option>
        </select>
        <button type="submit" class="intel-btn-gold w-full justify-center md:w-auto" :disabled="submitting">
          <span v-if="submitting">Submitting...</span>
          <span v-else>Book my free audit</span>
          <Icon v-if="!submitting" name="lucide:arrow-right" class="size-3.5" />
        </button>
      </form>

      <!-- Success state -->
      <div v-else class="mx-auto max-w-md reveal">
        <Icon name="lucide:check-circle-2" class="mx-auto mb-4 size-10" style="color: var(--color-accent);" />
        <p class="intel-h3 mb-2">We'll be in touch shortly.</p>
        <p class="intel-body">
          Thank you, {{ form.first_name }}. We'll reach out within one business day to schedule your free AI Readiness conversation.
        </p>
      </div>

      <p v-if="!submitted" class="mt-6 intel-body-sm reveal reveal-delay-3" style="color: var(--color-border-light);">
        No spam. No sales calls unless you want them. Just a conversation.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { trackFormSubmit, trackCtaClick } = useAnalytics()

const form = reactive({
  first_name: '',
  email: '',
  organization_type: '',
})

const submitting = ref(false)
const submitted = ref(false)

async function handleSubmit() {
  submitting.value = true
  try {
    await $fetch('/api/submit', {
      method: 'POST',
      body: {
        type: 'intelligence',
        first_name: form.first_name,
        email: form.email,
        organization_type: form.organization_type,
      },
    })
    submitted.value = true
    trackFormSubmit('intelligence_audit', { organization_type: form.organization_type })
  } catch (e) {
    console.error('Intelligence form submission failed:', e)
  } finally {
    submitting.value = false
  }
}
</script>

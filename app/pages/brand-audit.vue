<template>
  <div>
    <section class="hue-section px-6 pb-16 pt-24 md:pt-32">
      <div class="hue-container grid gap-16 lg:grid-cols-2">
        <div>
          <span class="mb-5 inline-flex items-center rounded-full bg-[var(--near-black)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-white">Free</span>
          <h1 class="hue-display-lg mt-4 mb-5">Brand Perception<br>Audit</h1>
          <p class="hue-body-lg mb-8 max-w-md">
            Not sure where your brand stands? In 8 questions and 15 minutes, we'll assess your current positioning and deliver a custom Brand Perception Presentation in 5 business days. Free. Confidential. No obligation.
          </p>
          <div class="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div v-for="s in stats" :key="s.label" class="text-center rounded-xl border border-[var(--silk)] p-5">
              <p class="hue-editorial-xl">{{ s.value }}</p>
              <p class="hue-label-sm mt-1">{{ s.label }}</p>
            </div>
          </div>
          <div class="space-y-3">
            <p class="hue-label mb-4">What you'll receive</p>
            <div v-for="item in deliverables" :key="item" class="flex items-center gap-3">
              <Icon name="lucide:check" class="size-4 shrink-0 text-[var(--near-black)]" />
              <span class="text-[0.9375rem] text-[var(--color-text-secondary)]">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="hue-card p-8 md:p-10">
          <p class="hue-label mb-8">Start your audit</p>
          <form @submit.prevent="submitForm" class="space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="hue-label-field">First name</label>
                <input v-model="form.firstName" type="text" class="hue-input" placeholder="Jane" required />
              </div>
              <div>
                <label class="hue-label-field">Last name</label>
                <input v-model="form.lastName" type="text" class="hue-input" placeholder="Smith" required />
              </div>
            </div>
            <div>
              <label class="hue-label-field">Work email</label>
              <input v-model="form.email" type="email" class="hue-input" placeholder="jane@company.com" required />
            </div>
            <div>
              <label class="hue-label-field">Company</label>
              <input v-model="form.company" type="text" class="hue-input" placeholder="Acme Corp" required />
            </div>
            <div>
              <label class="hue-label-field">Industry</label>
              <select v-model="form.industry" class="hue-input">
                <option value="">Select your industry</option>
                <option v-for="ind in industryOptions" :key="ind" :value="ind">{{ ind }}</option>
              </select>
            </div>
            <div>
              <label class="hue-label-field">What's your biggest brand challenge?</label>
              <textarea v-model="form.challenge" class="hue-input" rows="3" placeholder="e.g. We look dated compared to our competitors..." />
            </div>
            <div>
              <label class="hue-label-field">Annual revenue (optional — helps us calibrate)</label>
              <select v-model="form.revenue" class="hue-input">
                <option value="">Prefer not to say</option>
                <option value="under-1m">Under $1M</option>
                <option value="1m-5m">$1M – $5M</option>
                <option value="5m-25m">$5M – $25M</option>
                <option value="25m-100m">$25M – $100M</option>
                <option value="over-100m">Over $100M</option>
              </select>
            </div>
            <button type="submit" class="hue-btn w-full justify-center" :disabled="submitting">
              <span v-if="submitting">Submitting…</span>
              <span v-else>Submit Audit Request</span>
              <Icon v-if="!submitting" name="lucide:arrow-right" class="size-3.5" />
            </button>
            <p class="text-center text-[0.75rem] text-[var(--color-text-muted)]">Confidential. No spam. We'll follow up within 1 business day.</p>
          </form>

          <div v-if="submitted" class="mt-6 rounded-lg border border-[var(--silk)] bg-[var(--snow)] p-6 text-center">
            <Icon name="lucide:check-circle" class="mx-auto mb-3 size-8 text-[var(--near-black)]" />
            <p class="font-medium">Audit request received.</p>
            <p class="mt-1 text-[0.875rem] text-[var(--color-text-muted)]">We'll deliver your Brand Perception Presentation within 5 business days.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="hue-section-dark px-6 py-20 text-center">
      <div class="hue-container-sm">
        <p class="hue-pullquote text-white reveal">"Know where you stand before you decide where to go."</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { industries } from '~/data/industries'

useSeoMeta({
  title: 'Free Brand Perception Audit | Hue Creative Agency',
  description: '8 questions. 15 minutes. A custom Brand Perception Presentation delivered in 5 business days. Free, confidential, no obligation.',
})

const stats = [
  { value: '8', label: 'Questions' },
  { value: '15', label: 'Minutes' },
  { value: '5', label: 'Day Delivery' },
  { value: '$0', label: 'Cost' },
]

const deliverables = [
  'Custom Brand Perception Presentation',
  'Visual mood board aligned to your positioning',
  'Competitive landscape snapshot',
  'Directional brand recommendations',
  'No-obligation follow-up call',
]

const industryOptions = industries.map((i) => i.name)

const form = reactive({
  firstName: '', lastName: '', email: '', company: '',
  industry: '', challenge: '', revenue: '',
})

const { submitRequest } = useDirectus()
const submitting = ref(false)
const submitted  = ref(false)
const submitError = ref(false)

async function submitForm() {
  submitting.value = true
  submitError.value = false
  const ok = await submitRequest({
    first_name:  form.firstName,
    last_name:   form.lastName,
    email:       form.email,
    company:     form.company,
    project:     'Branding / Strategy',
    explanation: `[Brand Audit Request]\nIndustry: ${form.industry}\nRevenue: ${form.revenue}\nChallenge: ${form.challenge}`,
    contact_preference: 'email',
  })
  submitting.value = false
  if (ok) { submitted.value = true } else { submitError.value = true }
}

onMounted(() => useScrollReveal())
</script>

<template>
  <div>
    <section class="hue-section relative overflow-x-clip px-2 md:px-6 pb-16 pt-24 md:pt-32">
      <SectionWatermark word="Analysis" />
      <div class="hue-container relative grid gap-16 lg:grid-cols-2">
        <div>
          <span class="mb-5 inline-flex items-center rounded-full bg-[var(--near-black)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-white">Free</span>
          <h1 class="hue-display-lg mt-4 mb-5">Brand Perception<br>Analysis</h1>
          <p class="hue-body-lg mb-8 max-w-md">
            Not sure where your brand stands? In 10 questions and 15 minutes, we'll assess your current positioning and deliver a custom Brand Perception Presentation in 5 business days. Free. Confidential. No obligation.
          </p>
          <div class="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div v-for="s in stats" :key="s.label" class="text-center rounded-sm border border-[var(--silk)] p-5">
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
          <p class="hue-label mb-8">Start your analysis</p>
          <form @submit.prevent="submitForm" class="space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="hue-label-field">First name</label>
                <input v-model="form.firstName" type="text" class="hue-input" placeholder="Jane" required @focus="onFirstFocus" />
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

            <!-- Brand Perception Questions — inspired by Hue Brand Study -->
            <div class="border-t border-[var(--silk)] pt-5">
              <p class="hue-label-sm mb-1">Brand Perception</p>
              <p class="mb-5 text-[0.75rem] text-[var(--color-text-muted)]">These help us understand how you see your brand today.</p>

              <div class="space-y-5">
                <div>
                  <label class="hue-label-field">What words describe your brand?</label>
                  <input v-model="form.brandWords" type="text" class="hue-input" placeholder="e.g. sophisticated, approachable, bold" />
                </div>
                <div>
                  <label class="hue-label-field">What brands or logos inspire you — and why?</label>
                  <input v-model="form.brandInspiration" type="text" class="hue-input" placeholder="e.g. Apple — clean, purposeful design" />
                </div>
                <div>
                  <label class="hue-label-field">If your brand were a car, what would it be?</label>
                  <select v-model="form.brandCar" class="hue-input">
                    <option value="">Select one</option>
                    <option value="bmw">BMW — performance, precision</option>
                    <option value="porsche">Porsche — design-driven luxury</option>
                    <option value="volvo">Volvo — trustworthy, safe, Scandinavian</option>
                    <option value="tesla">Tesla — innovative, disruptive</option>
                    <option value="classic">1960s Cadillac — timeless, commanding</option>
                    <option value="honda">Honda — reliable, accessible, well-made</option>
                    <option value="other">Other (tell us below)</option>
                  </select>
                </div>
                <div>
                  <label class="hue-label-field">If your brand were a color, what would it be — and why?</label>
                  <input v-model="form.brandColor" type="text" class="hue-input" placeholder="e.g. Deep navy — authoritative but not aggressive" />
                </div>
                <div>
                  <label class="hue-label-field">If your brand were a season, which would it be?</label>
                  <select v-model="form.brandSeason" class="hue-input">
                    <option value="">Select one</option>
                    <option value="spring">Spring — fresh, new, optimistic</option>
                    <option value="summer">Summer — bold, energetic, confident</option>
                    <option value="autumn">Autumn — warm, established, sophisticated</option>
                    <option value="winter">Winter — clean, minimal, authoritative</option>
                  </select>
                </div>
                <div>
                  <label class="hue-label-field">Who is your ideal client?</label>
                  <input v-model="form.idealClient" type="text" class="hue-input" placeholder="e.g. C-suite executives at mid-market firms looking for a rebrand" />
                </div>
              </div>
            </div>

            <div>
              <label class="hue-label-field">Annual revenue (optional — helps us calibrate)</label>
              <select v-model="form.revenue" class="hue-input">
                <option value="">Prefer not to say</option>
                <option value="under-500k">Under $500K</option>
                <option value="500k-1m">$500K – $1M</option>
                <option value="1m-5m">$1M – $5M</option>
                <option value="5m-25m">$5M – $25M</option>
                <option value="25m-plus">$25M+</option>
              </select>
            </div>
            <button type="submit" class="hue-btn w-full justify-center" :disabled="submitting">
              <span v-if="submitting">Submitting…</span>
              <span v-else>Submit Analysis Request</span>
              <Icon v-if="!submitting" name="lucide:arrow-right" class="size-3.5" />
            </button>
            <p class="text-center text-[0.75rem] text-[var(--color-text-muted)]">Confidential. No spam. We'll follow up within 1 business day.</p>
          </form>

          <div v-if="submitted" class="mt-6 rounded-lg border border-[var(--silk)] bg-[var(--snow)] p-6 text-center">
            <Icon name="lucide:check-circle" class="mx-auto mb-3 size-8 text-[var(--near-black)]" />
            <p class="font-medium">Analysis request received.</p>
            <p class="mt-1 text-[0.875rem] text-[var(--color-text-muted)]">We'll deliver your Brand Perception Presentation within 5 business days.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="hue-section-dark px-2 md:px-6 py-20 text-center">
      <div class="hue-container-sm">
        <p class="hue-pullquote text-white reveal">"Know where you stand before you decide where to go."</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { industries } from '~/data/industries'

useSeoMeta({
  title: 'Free Brand Perception Analysis | Hue',
  description: '8 questions. 15 minutes. A custom Brand Perception Presentation delivered in 5 business days. Free, confidential, no obligation.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Free Brand Perception Analysis', description: '8 questions. 15 minutes. Custom presentation in 5 days.', label: 'Free Analysis' } })

const stats = [
  { value: '10', label: 'Questions' },
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
  // Brand perception questions
  brandWords: '', brandInspiration: '', brandCar: '', brandColor: '', brandSeason: '', idealClient: '',
})

const { submitAudit } = useDirectus()
const { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } = useTracking()
const submitting = ref(false)
const submitted  = ref(false)
const submitError = ref(false)

const formStarted = ref(false)
function onFirstFocus() {
  if (!formStarted.value) {
    formStarted.value = true
    trackFormStart('audit')
  }
}

async function submitForm() {
  submitting.value = true
  submitError.value = false
  trackFormSubmit('audit')
  // Build a rich explanation that includes all brand perception answers
  const parts = [form.challenge]
  if (form.brandWords) parts.push(`Brand words: ${form.brandWords}`)
  if (form.brandInspiration) parts.push(`Brand inspiration: ${form.brandInspiration}`)
  if (form.brandCar) parts.push(`Brand as car: ${form.brandCar}`)
  if (form.brandColor) parts.push(`Brand as color: ${form.brandColor}`)
  if (form.brandSeason) parts.push(`Brand as season: ${form.brandSeason}`)
  if (form.idealClient) parts.push(`Ideal client: ${form.idealClient}`)

  const result = await submitAudit({
    first_name:  form.firstName,
    last_name:   form.lastName,
    email:       form.email,
    company:     form.company,
    explanation: parts.join('\n\n'),
    audit_answers: {
      industry: form.industry,
      revenue: form.revenue,
      challenge: form.challenge,
      brand_words: form.brandWords,
      brand_inspiration: form.brandInspiration,
      brand_as_car: form.brandCar,
      brand_as_color: form.brandColor,
      brand_as_season: form.brandSeason,
      ideal_client: form.idealClient,
    },
  })
  submitting.value = false
  if (result.success) {
    submitted.value = true
    trackFormSuccess('audit')
  } else {
    submitError.value = true
    trackFormError('audit', 'Server error on audit form submission')
  }
}

useScrollReveal()
</script>

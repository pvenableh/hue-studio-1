<template>
  <div>
    <section class="hue-section px-6 pb-0 pt-24 md:pt-32">
      <div class="hue-container grid gap-16 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5">Let's Talk</p>
          <h1 class="hue-display-lg mb-6">
            Start your<br>
            <span style="font-family:var(--font-editorial);font-style:italic;">next project.</span>
          </h1>
          <p class="hue-body-lg mb-10 max-w-md">
            We'd love to learn about your business and discuss how we can create something meaningful — and measurable — together.
          </p>

          <div class="space-y-6">
            <div>
              <p class="hue-label-sm mb-1">Email</p>
              <a href="mailto:contact@huestudios.com" class="hue-link">contact@huestudios.com</a>
            </div>
            <div>
              <p class="hue-label-sm mb-1">Phone</p>
              <a href="tel:3056800485" class="hue-link">305.680.0485</a>
              <span class="mx-2 text-[var(--silver)]">·</span>
              <a href="tel:9177105381" class="hue-link">917.710.5381</a>
            </div>
            <div>
              <p class="hue-label-sm mb-1">Miami Beach</p>
              <p class="hue-body">605 Lincoln Road, Suite 200<br>Miami Beach, FL 33139</p>
            </div>
            <div>
              <p class="hue-label-sm mb-1">New York</p>
              <p class="hue-body">New York Metropolitan Area</p>
            </div>
          </div>

          <div class="mt-10 border-t border-[var(--silk)] pt-10">
            <p class="hue-label-sm mb-4 text-[var(--silver)]">Prefer to start with a free audit?</p>
            <NuxtLink to="/brand-audit" class="hue-btn-outline">
              Free Brand Perception Audit
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Form -->
        <div class="hue-card mb-0 rounded-b-none p-8 md:p-10">
          <p class="hue-label mb-8">Send us a message</p>
          <form @submit.prevent="submitForm" class="space-y-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="hue-label-field">First name</label>
                <input v-model="form.firstName" type="text" class="hue-input" required placeholder="Jane" />
              </div>
              <div>
                <label class="hue-label-field">Last name</label>
                <input v-model="form.lastName" type="text" class="hue-input" required placeholder="Smith" />
              </div>
            </div>
            <div>
              <label class="hue-label-field">Work email</label>
              <input v-model="form.email" type="email" class="hue-input" required placeholder="jane@company.com" />
            </div>
            <div>
              <label class="hue-label-field">Company</label>
              <input v-model="form.company" type="text" class="hue-input" required placeholder="Acme Corp" />
            </div>
            <div>
              <label class="hue-label-field">What are you looking to accomplish?</label>
              <select v-model="form.goal" class="hue-input">
                <option value="">Select a goal</option>
                <option v-for="g in goals" :key="g" :value="g">{{ g }}</option>
              </select>
            </div>
            <div>
              <label class="hue-label-field">Industry</label>
              <select v-model="form.industry" class="hue-input">
                <option value="">Select your industry</option>
                <option v-for="ind in industryOptions" :key="ind" :value="ind">{{ ind }}</option>
              </select>
            </div>
            <div>
              <label class="hue-label-field">Tell us about your project</label>
              <textarea v-model="form.message" class="hue-input" rows="4" placeholder="What's the business challenge you're trying to solve?" />
            </div>
            <div>
              <label class="hue-label-field">Budget range</label>
              <select v-model="form.budget" class="hue-input">
                <option value="">Select a range</option>
                <option value="under-15k">Under $15,000</option>
                <option value="15k-30k">$15,000 – $30,000</option>
                <option value="30k-50k">$30,000 – $50,000</option>
                <option value="50k-plus">$50,000+</option>
                <option value="retainer">Monthly Retainer</option>
              </select>
            </div>

            <!-- Brand questions — optional, collapsible -->
            <div class="border-t border-[var(--silk)] pt-5">
              <button
                type="button"
                class="flex w-full items-center justify-between text-left"
                @click="showBrandQuestions = !showBrandQuestions"
              >
                <div>
                  <span class="hue-label-sm">Help us understand your brand</span>
                  <p class="mt-0.5 text-[0.75rem] text-[var(--color-text-muted)]">Optional — but helps us prepare for our first conversation.</p>
                </div>
                <Icon :name="showBrandQuestions ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="size-4 shrink-0 text-[var(--silver)]" />
              </button>

              <Transition name="expand">
                <div v-if="showBrandQuestions" class="mt-5 space-y-5">
                  <div>
                    <label class="hue-label-field">How would you describe your brand in a few words?</label>
                    <input v-model="form.brandWords" type="text" class="hue-input" placeholder="e.g. modern, trustworthy, bold" />
                  </div>
                  <div>
                    <label class="hue-label-field">Do you have existing brand guidelines?</label>
                    <select v-model="form.hasGuidelines" class="hue-input">
                      <option value="">Select one</option>
                      <option value="yes-current">Yes — and they're current</option>
                      <option value="yes-outdated">Yes — but they're outdated</option>
                      <option value="partial">Partial (logo only, no full system)</option>
                      <option value="no">No — starting from scratch</option>
                    </select>
                  </div>
                  <div>
                    <label class="hue-label-field">Who is your ideal client or audience?</label>
                    <input v-model="form.audience" type="text" class="hue-input" placeholder="e.g. Government agencies, C-suite executives, homebuyers" />
                  </div>
                  <div>
                    <label class="hue-label-field">Any brands you admire — and why?</label>
                    <input v-model="form.brandInspiration" type="text" class="hue-input" placeholder="e.g. Apple — clean, purposeful design" />
                  </div>
                  <div>
                    <label class="hue-label-field">What's your timeline?</label>
                    <select v-model="form.timeline" class="hue-input">
                      <option value="">Select one</option>
                      <option value="urgent">ASAP — within 4 weeks</option>
                      <option value="normal">1–3 months</option>
                      <option value="planning">3–6 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                </div>
              </Transition>
            </div>
            <button type="submit" class="hue-btn w-full justify-center" :disabled="submitting">
              <span v-if="submitting">Sending…</span>
              <span v-else>Send Message</span>
              <Icon v-if="!submitting" name="lucide:arrow-right" class="size-3.5" />
            </button>
          </form>

          <div v-if="submitted" class="mt-6 rounded-lg border border-[var(--silk)] bg-[var(--snow)] p-6 text-center">
            <Icon name="lucide:check-circle" class="mx-auto mb-3 size-8 text-[var(--near-black)]" />
            <p class="font-medium">Message received.</p>
            <p class="mt-1 text-[0.875rem] text-[var(--color-text-muted)]">We'll be in touch within 1 business day.</p>
          </div>
          <div v-if="submitError" class="mt-4 rounded-lg border border-red-100 bg-red-50 p-4 text-center text-[0.875rem] text-red-600">
            Something went wrong. Please email us directly at <a href="mailto:contact@huestudios.com" class="underline">contact@huestudios.com</a>.
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { industries } from '~/data/industries'

useSeoMeta({
  title: 'Contact | Start a Project | Hue Creative Agency',
  description: 'Ready to start your next brand or creative project? Contact Hue Creative Agency in Miami Beach and New York.',
})

const form = reactive({
  firstName: '', lastName: '', email: '', company: '',
  goal: '', industry: '', message: '', budget: '',
  // Brand questions (optional)
  brandWords: '', hasGuidelines: '', audience: '', brandInspiration: '', timeline: '',
})

const showBrandQuestions = ref(false)

const industryOptions = industries.map((i) => i.name)

const goals = [
  'Rebrand / New Brand Identity',
  'Website Design & Development',
  'Lead Generation System',
  'Trade Show / Events',
  'Print & Collateral',
  'Corporate Presentations',
  'Monthly Retainer',
  'Not sure yet',
]

const submitting = ref(false)
const submitted  = ref(false)
const submitError = ref(false)

const { submitContact } = useDirectus()

async function submitForm() {
  submitting.value = true
  submitError.value = false

  // Build explanation that includes brand context if provided
  const parts = [form.message]
  if (form.industry) parts.push(`Industry: ${form.industry}`)
  if (form.brandWords) parts.push(`Brand description: ${form.brandWords}`)
  if (form.hasGuidelines) parts.push(`Existing guidelines: ${form.hasGuidelines}`)
  if (form.audience) parts.push(`Target audience: ${form.audience}`)
  if (form.brandInspiration) parts.push(`Brand inspiration: ${form.brandInspiration}`)
  if (form.timeline) parts.push(`Timeline: ${form.timeline}`)

  const result = await submitContact({
    first_name: form.firstName,
    last_name:  form.lastName,
    email:      form.email,
    company:    form.company,
    project:    form.goal || 'General Inquiry',
    explanation: parts.join('\n\n'),
    budget:     form.budget,
    contact_preference: 'email',
  })
  submitting.value = false
  if (result.success) { submitted.value = true } else { submitError.value = true }
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); overflow: hidden; }
.expand-enter-from,
.expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to,
.expand-leave-from { max-height: 600px; }
</style>

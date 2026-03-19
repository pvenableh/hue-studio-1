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
useSeoMeta({
  title: 'Contact | Start a Project | Hue Creative Agency',
  description: 'Ready to start your next brand or creative project? Contact Hue Creative Agency in Miami Beach and New York.',
})

const form = reactive({
  firstName: '', lastName: '', email: '', company: '',
  goal: '', message: '', budget: '',
})

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

const { submitRequest } = useDirectus()

// Map goal labels to the Request.project enum values in the schema
const goalToProjectMap: Record<string, string> = {
  'Rebrand / New Brand Identity':    'Branding / Strategy',
  'Website Design & Development':    'Digital / Web',
  'Lead Generation System':          'Digital / Web',
  'Trade Show / Events':             'Print / Graphic Design',
  'Print & Collateral':              'Print / Graphic Design',
  'Corporate Presentations':         'Corporate / Data Design',
  'Monthly Retainer':                'Other',
  'Not sure yet':                    'Other',
}

async function submitForm() {
  submitting.value = true
  submitError.value = false
  const ok = await submitRequest({
    first_name: form.firstName,
    last_name:  form.lastName,
    email:      form.email,
    company:    form.company,
    project:    goalToProjectMap[form.goal] ?? 'Other',
    explanation: form.message,
    budget:     form.budget,
    contact_preference: 'email',
  })
  submitting.value = false
  if (ok) { submitted.value = true } else { submitError.value = true }
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hue-section relative overflow-x-clip px-2 md:px-6 pb-12 pt-24 md:pt-32">
      <SectionWatermark word="Scope" />
      <div class="hue-container relative grid gap-12 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5">Project Scope Builder</p>
          <h1 class="hue-display-lg mb-5">
            Build your<br>
            <span style="font-family:var(--font-editorial);font-style:italic;">custom scope.</span>
          </h1>
          <p class="hue-body-lg max-w-md">
            Select the services you need, see a visual scope outline with timeline and investment range — then request a custom proposal. No obligation.
          </p>
        </div>
        <div class="flex items-end">
          <div class="w-full rounded-sm border border-[var(--silk)] bg-white p-8">
            <p class="hue-label-sm mb-1 text-[var(--silver)]">Your Estimate</p>
            <div class="flex items-baseline gap-3">
              <span class="text-[2.5rem] font-extralight tracking-tight" style="font-family: var(--font);">{{ estimateRange }}</span>
            </div>
            <p class="mt-1 text-[0.8125rem] text-[var(--grey)]">{{ estimatedWeeks }} · {{ selectedTracks.length }} track{{ selectedTracks.length !== 1 ? 's' : '' }}</p>
            <div class="mt-6 flex gap-3">
              <button
                :disabled="!selectedServices.length"
                class="hue-btn flex-1 justify-center"
                :class="{ 'opacity-40 cursor-not-allowed': !selectedServices.length }"
                @click="showForm = true"
              >
                Request Custom Proposal
                <Icon name="lucide:arrow-right" class="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Selection -->
    <section class="border-t border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Select your services</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="svc in scopeServices"
            :key="svc.id"
            class="flex flex-col bg-white p-7 text-left transition-all"
            :class="isSelected(svc.id) ? 'ring-2 ring-inset ring-[var(--color-accent)] bg-[var(--color-accent-tint)]' : 'hover:bg-[var(--snow)]'"
            @click="toggleServiceTracked(svc.id)"
          >
            <div class="mb-4 flex items-center justify-between">
              <span class="hue-label-sm" :style="isSelected(svc.id) ? 'color: var(--color-accent)' : ''">{{ svc.track }}</span>
              <div
                class="flex h-5 w-5 items-center justify-center rounded-sm border transition-colors"
                :class="isSelected(svc.id) ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--silver)]'"
              >
                <Icon v-if="isSelected(svc.id)" name="lucide:check" class="size-3 text-white" />
              </div>
            </div>
            <h3 class="mb-2 text-[1.05rem] font-light">{{ svc.name }}</h3>
            <p class="mb-4 flex-1 text-[0.8125rem] leading-relaxed text-[var(--grey)]">{{ svc.description }}</p>
            <div class="flex items-center justify-between text-[0.75rem] text-[var(--silver)]">
              <span>{{ svc.timeline }}</span>
              <span>{{ svc.priceLabel }}</span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Visual Scope Outline -->
    <section v-if="selectedServices.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Your scope at a glance</p>

        <!-- Tracks -->
        <div v-for="track in selectedTracks" :key="track" class="mb-6">
          <div class="mb-3 flex items-center gap-2.5">
            <div class="h-2 w-2 rounded-full" :style="`background: ${track === 'Brand Strategy' ? 'var(--color-accent)' : 'var(--near-black)'}`" />
            <span class="text-[0.625rem] uppercase tracking-widest text-[var(--grey)]">{{ track }}</span>
          </div>
          <div class="grid gap-px overflow-hidden rounded-lg border border-[var(--silk)] bg-[var(--silk)]"
            :class="trackServices(track).length >= 3 ? 'md:grid-cols-3' : trackServices(track).length === 2 ? 'md:grid-cols-2' : ''"
          >
            <div v-for="svc in trackServices(track)" :key="svc.id" class="bg-white p-6">
              <p class="mb-2 text-[0.9375rem] font-light">{{ svc.name }}</p>
              <ul class="space-y-1.5">
                <li v-for="d in svc.deliverables" :key="d" class="flex items-start gap-2 text-[0.75rem] text-[var(--grey)]">
                  <span class="mt-1.5 block h-px w-2.5 shrink-0" style="background: var(--color-accent);" />
                  {{ d }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Timeline bar -->
        <div class="mt-8 rounded-lg border border-[var(--silk)] bg-[var(--snow)] p-6">
          <div class="mb-4 flex items-center justify-between">
            <p class="hue-label-sm">Estimated Timeline</p>
            <p class="text-[0.875rem] font-medium">{{ estimatedWeeks }}</p>
          </div>
          <div class="flex gap-1">
            <div
              v-for="(phase, i) in timelinePhases"
              :key="i"
              class="rounded-sm px-3 py-2 text-center"
              :style="`flex: ${phase.weeks}; background: ${phase.color}; color: ${phase.textColor}`"
            >
              <p class="text-[0.5625rem] uppercase tracking-wider">{{ phase.label }}</p>
              <p class="text-[0.625rem] opacity-60">{{ phase.weeks }}wk</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What's Included in Every Engagement -->
    <section class="border-t border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <p class="hue-label">Always included</p>
        </div>
        <div class="grid gap-px overflow-hidden rounded-lg border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in alwaysIncluded" :key="item.title" class="bg-white p-6">
            <Icon :name="item.icon" class="mb-3 size-4 text-[var(--silver)]" />
            <h3 class="mb-1.5 text-[0.875rem] font-medium">{{ item.title }}</h3>
            <p class="text-[0.75rem] leading-relaxed text-[var(--grey)]">{{ item.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WhyHue -->
    <WhyHue variant="services" headline="Why clients choose Hue for their most important work." />

    <!-- CTA -->
    <section class="px-2 md:px-6 py-20" style="background: var(--color-accent);">
      <div class="hue-container flex flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <h2 class="text-[1.75rem] font-light text-white" style="font-family: var(--font-editorial);">
            Prefer to talk it through?
          </h2>
          <p class="mt-2 text-[0.9375rem] text-white/60">30-minute strategy session. No pitch decks. Just conversation.</p>
        </div>
        <NuxtLink to="/contact" class="inline-block rounded-sm border-[1.5px] border-white px-7 py-3.5 text-[0.6875rem] uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[var(--color-accent)]">
          Book a Strategy Session →
        </NuxtLink>
      </div>
    </section>

    <!-- Proposal request modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showForm" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6" @click.self="showForm = false">
          <div class="w-full max-w-lg rounded-sm bg-white p-8 shadow-lg">
            <div class="mb-6 flex items-center justify-between">
              <p class="hue-label">Request Custom Proposal</p>
              <button class="text-[var(--grey)] hover:text-[var(--near-black)]" @click="showForm = false">
                <Icon name="lucide:x" class="size-5" />
              </button>
            </div>

            <div v-if="!submitted" class="space-y-4">
              <p class="mb-4 text-[0.875rem] text-[var(--grey)]">
                You selected <strong>{{ selectedServices.length }} service{{ selectedServices.length !== 1 ? 's' : '' }}</strong> with an estimated range of <strong>{{ estimateRange }}</strong>. We'll prepare a custom proposal within 2 business days.
              </p>
              <div class="grid gap-4 sm:grid-cols-2">
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
                <input v-model="form.company" type="text" class="hue-input" placeholder="Acme Corp" />
              </div>
              <div>
                <label class="hue-label-field">Anything we should know?</label>
                <textarea v-model="form.notes" class="hue-input" rows="3" placeholder="Timeline, goals, specific challenges..." />
              </div>
              <button class="hue-btn w-full justify-center" :disabled="submitting || !form.email" @click="submitProposal">
                <span v-if="submitting">Sending…</span>
                <span v-else>Send Proposal Request</span>
              </button>
            </div>

            <div v-else class="py-8 text-center">
              <Icon name="lucide:check-circle" class="mx-auto mb-4 size-10 text-[var(--near-black)]" />
              <p class="text-[1.125rem] font-light">Proposal request received.</p>
              <p class="mt-2 text-[0.875rem] text-[var(--grey)]">We'll have a custom proposal in your inbox within 2 business days.</p>
              <button class="hue-link mt-6" @click="showForm = false">Close</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Project Scope Builder | Get a Custom Proposal | Hue',
  description: 'Select the services you need, see timeline and investment estimates, and request a custom proposal. No obligation.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Project Scope Builder', description: 'Select services, see timeline and investment range, request a custom proposal.', label: 'Scope Builder' } })

interface ScopeService {
  id: string
  name: string
  track: string
  description: string
  timeline: string
  priceLabel: string
  minPrice: number
  maxPrice: number
  weeks: number
  deliverables: string[]
}

const scopeServices: ScopeService[] = [
  {
    id: 'brand-strategy',
    name: 'Brand Strategy & Positioning',
    track: 'Brand Strategy',
    description: 'Competitive audit, persona mapping, messaging framework, and strategic positioning document.',
    timeline: '2–3 weeks',
    priceLabel: 'From $8K',
    minPrice: 8000, maxPrice: 15000, weeks: 3,
    deliverables: ['Competitive landscape audit', 'Brand positioning statement', 'Audience personas', 'Messaging framework'],
  },
  {
    id: 'visual-identity',
    name: 'Visual Identity System',
    track: 'Brand Strategy',
    description: 'Logo suite, color palette, typography, brand guidelines — the complete visual system.',
    timeline: '4–6 weeks',
    priceLabel: 'From $12K',
    minPrice: 12000, maxPrice: 25000, weeks: 5,
    deliverables: ['Logo suite (primary + variations)', 'Color palette & typography', 'Brand standards guide', 'Application mockups'],
  },
  {
    id: 'stationery',
    name: 'Stationery & Collateral',
    track: 'Brand Strategy',
    description: 'Business cards, letterhead, email signatures, presentation templates — production-ready.',
    timeline: '2–3 weeks',
    priceLabel: 'From $4K',
    minPrice: 4000, maxPrice: 8000, weeks: 2,
    deliverables: ['Business card design', 'Letterhead & envelope', 'Email signature', 'Presentation template'],
  },
  {
    id: 'website',
    name: 'Website Design & Development',
    track: 'Digital Experience',
    description: 'UX/UI design, responsive build on Nuxt + Directus, SEO architecture, analytics.',
    timeline: '6–10 weeks',
    priceLabel: 'From $25K',
    minPrice: 25000, maxPrice: 60000, weeks: 8,
    deliverables: ['Site architecture & wireframes', 'High-fidelity UI design', 'Responsive development', 'CMS + content migration', 'SEO & analytics setup'],
  },
  {
    id: 'landing-pages',
    name: 'Landing Pages & Lead Capture',
    track: 'Digital Experience',
    description: 'Conversion-optimized landing pages with lead capture forms and CRM integration.',
    timeline: '2–4 weeks',
    priceLabel: 'From $5K',
    minPrice: 5000, maxPrice: 12000, weeks: 3,
    deliverables: ['Landing page design', 'Lead capture forms', 'CRM integration', 'A/B test setup'],
  },
  {
    id: 'print',
    name: 'Print & Campaign Materials',
    track: 'Creative Production',
    description: 'Campaign collateral, signage, packaging, press kits — production-managed.',
    timeline: '3–5 weeks',
    priceLabel: 'From $6K',
    minPrice: 6000, maxPrice: 15000, weeks: 4,
    deliverables: ['Campaign design', 'Print production management', 'Signage & environmental', 'Press kit design'],
  },
  {
    id: 'video',
    name: 'Brand Film & Video',
    track: 'Creative Production',
    description: 'Brand films, campaign video, social content — concept through post-production.',
    timeline: '4–8 weeks',
    priceLabel: 'From $10K',
    minPrice: 10000, maxPrice: 30000, weeks: 6,
    deliverables: ['Creative brief & storyboard', 'Production & direction', 'Post-production & editing', 'Multi-format delivery'],
  },
  {
    id: 'corporate',
    name: 'Corporate & Data Design',
    track: 'Creative Production',
    description: 'Investor decks, annual reports, data visualization, RFP templates.',
    timeline: '2–4 weeks',
    priceLabel: 'From $5K',
    minPrice: 5000, maxPrice: 12000, weeks: 3,
    deliverables: ['Investor/pitch deck', 'Annual report design', 'Data visualization', 'Board presentation'],
  },
  {
    id: 'go-to-market',
    name: 'Go-to-Market Launch Kit',
    track: 'Digital Experience',
    description: 'Social rollout plan, email announcement templates, press release, 90-day content calendar.',
    timeline: '2–3 weeks',
    priceLabel: 'From $5K',
    minPrice: 5000, maxPrice: 10000, weeks: 2,
    deliverables: ['Social media rollout plan', 'Email announcement templates', 'Press release template', '90-day content calendar'],
  },
]

const selected = ref<Set<string>>(new Set())
const showForm = ref(false)
const submitting = ref(false)
const submitted = ref(false)

const form = reactive({
  firstName: '', lastName: '', email: '', company: '', notes: '',
})

function isSelected(id: string) { return selected.value.has(id) }

function toggleService(id: string) {
  const s = new Set(selected.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  selected.value = s
}

const selectedServices = computed(() =>
  scopeServices.filter((s) => selected.value.has(s.id))
)

const selectedTracks = computed(() =>
  [...new Set(selectedServices.value.map((s) => s.track))]
)

function trackServices(track: string) {
  return selectedServices.value.filter((s) => s.track === track)
}

const estimateRange = computed(() => {
  if (!selectedServices.value.length) return '$0'
  const min = selectedServices.value.reduce((sum, s) => sum + s.minPrice, 0)
  const max = selectedServices.value.reduce((sum, s) => sum + s.maxPrice, 0)
  return `$${(min / 1000).toFixed(0)}K – $${(max / 1000).toFixed(0)}K`
})

const estimatedWeeks = computed(() => {
  if (!selectedServices.value.length) return '0 weeks'
  // Tracks run in parallel, services within a track are sequential
  const trackWeeks = selectedTracks.value.map((track) =>
    trackServices(track).reduce((sum, s) => sum + s.weeks, 0)
  )
  const maxWeeks = Math.max(...trackWeeks)
  return `${maxWeeks} – ${maxWeeks + 2} weeks`
})

const timelinePhases = computed(() => {
  const phases = [
    { label: 'Discovery', weeks: 2, color: 'var(--color-accent)', textColor: '#fff' },
  ]
  if (selectedTracks.value.includes('Brand Strategy')) {
    phases.push({ label: 'Brand', weeks: trackServices('Brand Strategy').reduce((s, svc) => s + svc.weeks, 0), color: '#1d1d1f', textColor: '#fff' })
  }
  if (selectedTracks.value.includes('Digital Experience')) {
    phases.push({ label: 'Digital', weeks: trackServices('Digital Experience').reduce((s, svc) => s + svc.weeks, 0), color: '#86868b', textColor: '#fff' })
  }
  if (selectedTracks.value.includes('Creative Production')) {
    phases.push({ label: 'Production', weeks: trackServices('Creative Production').reduce((s, svc) => s + svc.weeks, 0), color: '#c7c7c7', textColor: '#1d1d1f' })
  }
  phases.push({ label: 'QA & Launch', weeks: 1, color: '#ebebeb', textColor: '#1d1d1f' })
  return phases
})

const alwaysIncluded = [
  { icon: 'lucide:users', title: 'Senior principals only', body: 'You work directly with Camila and Peter. No handoffs, no junior team.' },
  { icon: 'lucide:repeat', title: 'Two revision rounds', body: 'Built into every engagement. We refine until it\'s right.' },
  { icon: 'lucide:message-square', title: 'Weekly status updates', body: 'Written updates and a shared project workspace from day one.' },
  { icon: 'lucide:shield-check', title: '90-day warranty', body: 'Post-launch bug fixes at no additional cost for 90 days.' },
]

const { submitContact } = useDirectus()
const { trackFormSubmit, trackScopeServiceSelected, trackScopeProposalRequested } = useAnalytics()

function toggleServiceTracked(id: string) {
  const wasSelected = selected.value.has(id)
  toggleService(id)
  const svc = scopeServices.find(s => s.id === id)
  if (svc) trackScopeServiceSelected(svc.name, !wasSelected)
}

async function submitProposal() {
  submitting.value = true
  const serviceNames = selectedServices.value.map((s) => s.name).join(', ')
  await submitContact({
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.email,
    company: form.company,
    project: 'Custom Proposal Request',
    explanation: `Scope Builder Request\n\nServices: ${serviceNames}\nEstimate: ${estimateRange.value}\nTimeline: ${estimatedWeeks.value}\n\nNotes: ${form.notes}`,
    budget: estimateRange.value,
  })
  submitting.value = false
  submitted.value = true
  trackScopeProposalRequested(estimateRange.value, selectedServices.value.length)
  trackFormSubmit('scope_proposal', { estimate: estimateRange.value, services: serviceNames })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>

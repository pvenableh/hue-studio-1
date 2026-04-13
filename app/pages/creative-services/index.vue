<template>
  <div>
    <!-- Hero -->
    <section class="hue-section relative overflow-x-clip px-2 md:px-6 py-28 md:py-36">
      <SectionWatermark word="Services"  />
      <div class="hue-container relative">
        <p ref="heroLabel" class="hue-label mb-5 opacity-0">Creative Services</p>
        <h1 ref="heroTitle" class="hue-display-xl max-w-3xl opacity-0">
          Every service built<br>around one goal:<br>
          <span style="font-family:var(--font-editorial);font-style:italic;">Your growth.</span>
        </h1>
        <p ref="heroSub" class="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-[var(--color-text-muted)] opacity-0">
          We don't sell deliverables. We solve business problems — then build the brand system, digital presence, and creative materials to make the solution stick.
        </p>
      </div>
    </section>

    <!-- Stats strip -->
    <section class="hue-section-dark px-2 md:px-6 py-8">
      <div class="hue-container grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div v-for="s in stats" :key="s.label" class="text-center">
          <p class="hue-editorial-lg text-white">{{ s.value }}</p>
          <p class="hue-label-sm mt-1 text-white/40">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- Packages -->
    <section id="packages" class="hue-section relative overflow-x-clip px-2 md:px-6 py-24 md:py-32">
      <SectionWatermark word="Packages"  />
      <div class="hue-container relative">
        <div class="mb-14 text-center">
          <p class="hue-label mb-3">Packages</p>
          <h2 class="hue-display-lg">Three tiers. One goal.</h2>
          <p class="mx-auto mt-4 max-w-md hue-body">
            Fixed-scope engagements designed to deliver measurable outcomes. Every package includes strategy, not just execution.
          </p>
        </div>

        <div class="grid gap-5 lg:grid-cols-3">
          <div
            v-for="(pkg, i) in packages"
            :key="pkg.id"
            :ref="(el) => { if (el) packageCardRefs[i] = el as HTMLElement }"
            class="hue-card reveal flex flex-col"
            :class="{ 'hue-card-featured': pkg.featured }"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="border-b px-8 pb-8 pt-9"
              :class="pkg.featured ? 'border-white/10' : 'border-[var(--silk)]'"
            >
              <span class="hue-label-sm">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="hue-display-md mt-3 mb-1">{{ pkg.name }}</h3>
              <p class="text-[0.875rem]" :class="pkg.featured ? 'text-white/45' : 'text-[var(--color-text-muted)]'">{{ pkg.tagline }}</p>
              <div class="mt-5 flex items-baseline gap-2">
                <span class="hue-price-label" :class="pkg.featured ? 'text-white/30' : ''">Starting at</span>
                <span class="hue-price" :class="pkg.featured ? 'text-white' : ''">{{ pkg.price }}</span>
              </div>
            </div>

            <div class="flex-1 px-8 py-7 space-y-6">
              <div v-for="group in pkg.groups" :key="group.title">
                <p class="hue-label-sm mb-3" :class="pkg.featured ? 'text-white/40' : ''">{{ group.title }}</p>
                <ul v-if="group.items.length" class="space-y-2">
                  <li v-for="item in group.items" :key="item"
                    class="flex items-start gap-2.5 text-[0.8125rem]"
                    :class="pkg.featured ? 'text-white/50' : 'text-[var(--color-text-secondary)]'"
                  >
                    <span class="mt-2 block h-px w-3 shrink-0" :class="pkg.featured ? 'bg-white/20' : 'bg-[var(--silver)]'" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="border-t px-8 py-7" :class="pkg.featured ? 'border-white/10' : 'border-[var(--silk)]'">
              <p class="mb-5 text-[0.8125rem] italic" :class="pkg.featured ? 'text-white/35' : 'text-[var(--grey)]'">{{ pkg.bestFor }}</p>
              <NuxtLink to="/contact" :class="pkg.featured ? 'hue-btn-ghost' : 'hue-btn'">
                Get Started
                <Icon name="lucide:arrow-right" class="size-3.5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Custom Scope CTA -->
    <section class="border-t border-[var(--silk)] bg-[var(--snow)] px-2 md:px-6 py-14">
      <div class="hue-container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <p class="hue-label mb-2">Need something custom?</p>
          <p class="max-w-md text-[0.9375rem] text-[var(--color-text-muted)]">
            Select exactly the services you need, see a visual scope with timeline and investment range — then request a tailored proposal.
          </p>
        </div>
        <NuxtLink to="/scope" class="hue-btn shrink-0">
          Build Your Custom Scope
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>

    <!-- Service detail list -->
    <section class="hue-section-alt relative overflow-x-clip px-2 md:px-6 py-24 md:py-32">
      <SectionWatermark word="Disciplines"  />
      <div class="hue-container relative">
        <div class="mb-14">
          <p class="hue-label mb-3">All Services</p>
          <h2 class="hue-display-lg">{{ serviceCount }} disciplines.<br>One studio.</h2>
        </div>

        <div v-if="allServices?.length" class="space-y-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)]">
          <div
            v-for="(svc, i) in allServices"
            :key="svc.id"
            class="group bg-white"
          >
            <div
              class="grid cursor-pointer gap-8 px-8 py-8 transition-colors hover:bg-[var(--snow)] lg:grid-cols-[220px_1fr_260px]"
              @click="open === i ? open = -1 : open = i"
            >
              <div>
                <span class="hue-label-sm text-[var(--silver)]">{{ String(i + 1).padStart(2, '0') }}</span>
                <p class="hue-label mt-1">{{ svc.title || svc.name }}</p>
              </div>
              <div>
                <h3 class="hue-display-md mb-1 transition-transform duration-300 group-hover:translate-x-1">{{ svc.name }}</h3>
                <p class="text-[0.875rem] text-[var(--color-text-muted)]">{{ svc.caption }}</p>
              </div>
              <div class="flex items-center justify-between lg:justify-end lg:gap-8">
                <div v-if="svc.tags?.length" class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in (svc.tags as string[]).slice(0, 2)"
                    :key="tag"
                    class="rounded-full border border-[var(--silk)] px-2.5 py-0.5 text-[0.6rem] tracking-[0.06em] text-[var(--silver)]"
                  >{{ tag }}</span>
                </div>
                <Icon
                  :name="open === i ? 'lucide:minus' : 'lucide:plus'"
                  class="size-4 shrink-0 text-[var(--silver)] transition-transform duration-200"
                />
              </div>
            </div>

            <!-- Expanded detail -->
            <Transition name="expand">
              <div v-if="open === i" class="border-t border-[var(--silk)] px-8 pb-10 pt-8">
                <div class="grid gap-10 lg:grid-cols-[1fr_280px]">
                  <div>
                    <div v-if="svc.description" class="hue-body-lg mb-8 max-w-2xl" v-html="svc.description" />
                    <div v-if="serviceCapabilities(svc).length" class="grid gap-6 sm:grid-cols-2">
                      <div v-for="cap in serviceCapabilities(svc)" :key="cap.id">
                        <p class="hue-label-sm mb-3">{{ cap.title }}</p>
                        <p v-if="cap.description" class="text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)]">{{ cap.description }}</p>
                        <ul v-if="cap.features" class="mt-2 space-y-1.5">
                          <li v-for="feat in cap.features.split(',')" :key="feat" class="flex items-start gap-2 text-[0.8125rem] text-[var(--color-text-secondary)]">
                            <span class="mt-2 block h-px w-3 shrink-0 bg-[var(--silver)]" />
                            {{ feat.trim() }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <NuxtLink :to="`/creative-services/${svc.url}`" class="hue-btn block text-center">
                      Full service details
                      <Icon name="lucide:arrow-right" class="size-3.5" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Retainers -->
    <section id="retainers" class="hue-section px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 text-center">
          <p class="hue-label mb-3">Ongoing Partnership</p>
          <h2 class="hue-display-lg">Monthly Retainers</h2>
          <p class="mx-auto mt-4 max-w-md hue-body">
            A dedicated creative partner without the overhead of a full-time hire. Month-to-month available.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
          <div
            v-for="plan in retainerPlans"
            :key="plan.id"
            class="hue-card flex flex-col px-7 py-8"
          >
            <div class="mb-6 border-b border-[var(--silk)] pb-6">
              <h3 class="hue-display-md mb-1">{{ plan.name }}</h3>
              <p class="hue-label-sm text-[var(--silver)]">{{ plan.hours }}</p>
              <div class="mt-4 flex items-baseline gap-2">
                <span class="hue-price">{{ plan.price }}</span>
              </div>
            </div>
            <p class="mb-6 flex-1 text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)]">{{ plan.description }}</p>
            <ul class="mb-8 space-y-2">
              <li v-for="item in plan.items" :key="item" class="flex items-start gap-2.5 text-[0.8125rem] text-[var(--color-text-secondary)]">
                <span class="mt-2 block h-px w-3 shrink-0 bg-[var(--silver)]" />
                {{ item }}
              </li>
            </ul>
            <NuxtLink to="/contact" class="hue-link">
              Enquire
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- À la carte -->
    <section id="alacarte" class="hue-section-alt px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14">
          <p class="hue-label mb-3">À La Carte</p>
          <h2 class="hue-display-lg">Need something specific?</h2>
          <p class="mt-4 max-w-md hue-body">Individual deliverables with fixed-price transparency.</p>
        </div>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="svc in alacarteServices"
            :key="svc.name"
            class="group flex flex-col bg-white p-7 transition-colors hover:bg-[var(--snow)]"
          >
            <Icon :name="svc.icon" class="mb-4 size-5 text-[var(--silver)]" />
            <h3 class="mb-1 text-[0.9375rem] font-medium">{{ svc.name }}</h3>
            <p class="mb-3 text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)] flex-1">{{ svc.description }}</p>
            <p class="text-[0.875rem] font-medium">{{ svc.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Build — Tech Stack -->
    <section class="hue-section px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14">
          <p class="hue-label mb-3">How We Build</p>
          <h2 class="hue-display-lg">Modern stack.<br>Serious infrastructure.</h2>
          <p class="mt-4 max-w-lg hue-body">
            Every Hue project is engineered on Nuxt.js and Directus — a headless architecture purpose-built for performance, security, and long-term flexibility.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="cap in techCapabilities" :key="cap.title" class="hue-card reveal p-7">
            <Icon :name="cap.icon" class="mb-4 size-5 text-[var(--silver)]" />
            <h3 class="mb-2 text-[1rem] font-medium">{{ cap.title }}</h3>
            <p class="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ cap.description }}</p>
          </div>
        </div>

        <!-- Comparison table -->
        <div class="mt-12 overflow-hidden rounded-sm border border-[var(--silk)]">
          <table class="w-full text-left text-[0.8125rem]">
            <thead>
              <tr class="border-b border-[var(--silk)] bg-[var(--snow)]">
                <th class="px-2 md:px-6 py-4 font-medium text-[var(--grey)]">Capability</th>
                <th class="px-2 md:px-6 py-4 font-medium text-[var(--silver)]">WordPress / Drupal</th>
                <th class="px-2 md:px-6 py-4 font-medium text-[var(--near-black)]">Nuxt + Directus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonRows" :key="row.capability" class="border-b border-[var(--silk)] last:border-0">
                <td class="px-2 md:px-6 py-4 font-medium">{{ row.capability }}</td>
                <td class="px-2 md:px-6 py-4 text-[var(--silver)]">{{ row.legacy }}</td>
                <td class="px-2 md:px-6 py-4 text-[var(--near-black)]">{{ row.modern }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Why Hue -->
    <WhyHue variant="services" headline="Why clients choose Hue for their most important work." :show-cta="false" />

    <!-- Post-Launch -->
    <PostLaunch />

    <!-- Process -->
    <section class="hue-section px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14">
          <p class="hue-label mb-3">How We Work</p>
          <h2 class="hue-display-lg">From first call to final delivery.</h2>
        </div>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="step in processSteps"
            :key="step.number"
            class="bg-white p-7"
          >
            <span class="hue-label-sm text-[var(--silver)]">{{ step.number }}</span>
            <h3 class="mt-4 mb-2 text-[1rem] font-medium">{{ step.title }}</h3>
            <p class="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Inline capture -->
    <InlineCapture
      label="Quick Start"
      headline="Know what you need? Tell us and we'll get back to you."
      button-text="Send"
      context="Services Page Inquiry"
    />

    <!-- CTA — dual path -->
    <section class="hue-section-dark px-2 md:px-6 py-24">
      <div class="hue-container grid gap-px overflow-hidden rounded-sm md:grid-cols-2">
        <div class="bg-[#111110] p-10 text-center">
          <p class="mb-3 text-[0.625rem] font-medium uppercase tracking-[0.25em] text-white/25">Ready to start</p>
          <h3 class="mb-4 text-[1.5rem] font-light text-white" style="font-family: var(--font-editorial);">
            Book a strategy session.
          </h3>
          <p class="mx-auto mb-6 max-w-xs text-[0.8125rem] text-white/35">30 minutes. No pitch decks. We'll figure out what you need together.</p>
          <MeetingRequest class="hue-btn-ghost" />
        </div>
        <div class="bg-[#111110] p-10 text-center">
          <p class="mb-3 text-[0.625rem] font-medium uppercase tracking-[0.25em] text-white/25">Not sure yet</p>
          <h3 class="mb-4 text-[1.5rem] font-light text-white" style="font-family: var(--font-editorial);">
            Start with a free analysis.
          </h3>
          <p class="mx-auto mb-6 max-w-xs text-[0.8125rem] text-white/35">8 questions. 15 minutes. A custom Brand Perception Presentation in 5 days.</p>
          <NuxtLink to="/brand-analysis" class="hue-btn-ghost">
            Free Brand Analysis
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { packages, retainerPlans, alacarteServices, processSteps } from '~/data/services'

const { fetchServices, fetchIndustries: fetchAllIndustries } = useDirectus()
const { data: allServices } = await useAsyncData('services-all-index', () => fetchServices())
const { data: allIndustries } = await useAsyncData('industries-all-index', () => fetchAllIndustries())

useSeoMeta({
  title: 'Creative Services & Packages | Hue',
  description: 'Full-service creative marketing packages for growth-stage companies. Brand strategy, digital experience, print, video. Packages from $15,000. Retainers from $3,500/mo.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Creative Services & Packages', description: 'Full-service creative marketing packages. Brand strategy, digital, print, video.', label: 'Services' } })

useSchemaOrg([
  {
    '@type': 'Service',
    name: 'Brand Strategy & Identity',
    provider: { '@type': 'Organization', name: 'Hue' },
    serviceType: 'Brand Strategy',
  },
  {
    '@type': 'Service',
    name: 'Digital & Web Design',
    provider: { '@type': 'Organization', name: 'Hue' },
    serviceType: 'Web Design',
  },
])

const open = ref(-1)

const serviceCount = computed(() => allServices.value?.length ?? 0)

const stats = computed(() => [
  { value: '20+', label: 'Years Experience' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '92%', label: 'Client Retention' },
  { value: String(serviceCount.value), label: 'Core Disciplines' },
])

function indSlug(name: string) {
  const ind = allIndustries.value?.find((i: any) => i.name?.includes(name.split('&')[0].trim()))
  return ind?.url ?? 'industries'
}

/** Map Directus capabilities to grouped deliverables format */
function serviceCapabilities(svc: any) {
  return (svc.capabilities ?? [])
    .map((c: any) => c.capabilities_id)
    .filter(Boolean)
    .sort((a: any, b: any) => (a.sort ?? 0) - (b.sort ?? 0))
}

const techCapabilities = [
  {
    icon: 'lucide:zap',
    title: 'Edge-Rendered Performance',
    description: 'Pre-rendered pages served from a global CDN. Sub-2.5s load times worldwide — not server-rendered, not cached. Natively fast.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Minimal Attack Surface',
    description: 'No public application layer, no plugin vulnerabilities. Your content lives behind a secured, authenticated API. SOC 2-equivalent posture built in.',
  },
  {
    icon: 'lucide:radio',
    title: 'Realtime Content Updates',
    description: 'Native WebSocket subscriptions push content live the moment it\'s published. No cache-flush workflows, no stale pages.',
  },
  {
    icon: 'lucide:bot',
    title: 'AI & MCP-Ready',
    description: 'Directus exposes a native Model Context Protocol endpoint — your content is queryable by AI tools out of the box, not as a future roadmap item.',
  },
  {
    icon: 'lucide:layout-dashboard',
    title: 'No-Code Content Management',
    description: 'Directus gives your team an intuitive, role-based editing interface. Manage every page, post, and asset without touching code.',
  },
  {
    icon: 'lucide:puzzle',
    title: 'Future-Proof Architecture',
    description: 'Headless means your content powers any frontend — web, mobile app, digital signage. Redesign without disrupting your data.',
  },
]

const comparisonRows = [
  { capability: 'Global Performance', legacy: 'Server-rendered, CDN-assisted', modern: 'Edge-rendered, CDN-native' },
  { capability: 'Security Surface', legacy: 'High (plugin dependencies, DB exposure)', modern: 'Minimal (API-only, no public app layer)' },
  { capability: 'Realtime Content', legacy: 'Plugin-dependent', modern: 'Native WebSocket subscriptions' },
  { capability: 'AI / MCP Integration', legacy: 'Not available natively', modern: 'Native MCP endpoint — live' },
  { capability: 'Editor Experience', legacy: 'Complex at scale', modern: 'No-code, role-based' },
  { capability: 'Extensibility', legacy: 'Constrained by monolithic architecture', modern: 'Headless — any frontend, any channel' },
]

const { trackPackageView, useScrollDepthTracker } = useTracking()

const heroLabel = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSub   = ref<HTMLElement | null>(null)
const packageCardRefs = ref<HTMLElement[]>([])
const viewedPackages = new Set<string>()

useScrollReveal()

onMounted(async () => {
  await nextTick()
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(heroLabel.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo(heroTitle.value, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.4')
    .fromTo(heroSub.value,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')

  useScrollDepthTracker()

  // Track package card visibility
  for (let i = 0; i < packageCardRefs.value.length; i++) {
    const el = packageCardRefs.value[i]
    const pkg = packages[i]
    if (!el || !pkg) continue
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting && !viewedPackages.has(pkg.id)) {
        viewedPackages.add(pkg.id)
        trackPackageView(pkg.name, pkg.price)
      }
    })
  }
})
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); overflow: hidden; }
.expand-enter-from,
.expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to,
.expand-leave-from { max-height: 1000px; }
</style>

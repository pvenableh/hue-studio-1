<template>
  <div>
    <!-- ═══ HERO SLIDER ═══ -->
    <HomeHeroSlider />

    <!-- ═══ PHILOSOPHY ═══ -->
    <section class="hue-section px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container max-w-3xl mx-auto text-center">
        <div class="mx-auto mb-10 h-px w-10 bg-[var(--silk)]" />
        <p class="hue-editorial-lg mb-7 reveal">
          "Visual excellence is achieved through a process that is executed with a defined purpose."
        </p>
        <p class="hue-body-lg mb-5 reveal reveal-delay-1">
          Every engagement begins with understanding your business — your market, competitive landscape, and growth objectives — before any design work starts.
          It ensures every creative deliverable is purposeful, aligned, and built to perform.
        </p>
        <p class="hue-body-sm reveal reveal-delay-2">
          Woman-owned. Founded in 2005. Boutique by design. From New York to Miami Beach.
        </p>
      </div>
    </section>

    <!-- ═══ SERVICE PACKAGES ═══ -->
    <section class="hue-section-alt px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="mb-8 md:mb-14 text-center">
          <p class="hue-label mb-3">What We Do</p>
          <h2 class="hue-display-lg">Service Packages</h2>
          <p class="mx-auto mt-4 max-w-md text-[0.9375rem] text-[var(--color-text-muted)]">
            Three tiers designed to scale with your growth. Every package is strategic, measurable, and built to generate results.
          </p>
        </div>
        <div class="grid items-start gap-3 md:gap-5 lg:grid-cols-3">
          <div
            v-for="(pkg, i) in packages"
            :key="pkg.id"
            class="hue-card reveal flex flex-col px-8 py-9"
            :class="{ 'hue-card-featured': pkg.featured }"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <span class="hue-label-sm mb-3">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="hue-display-md mb-1.5">{{ pkg.name }}</h3>
            <p class="mb-5 text-[0.875rem]" :class="pkg.featured ? 'text-white/50' : 'text-[var(--color-text-muted)]'">{{ pkg.tagline }}</p>
            <div class="mb-6 flex items-baseline gap-2">
              <span class="hue-price-label" :class="pkg.featured ? 'text-white/40' : ''">Starting at</span>
              <span class="hue-price" :class="pkg.featured ? 'text-white' : ''">{{ pkg.price }}</span>
            </div>
            <p class="mb-8 flex-1 text-[0.8125rem] leading-relaxed" :class="pkg.featured ? 'text-white/40' : 'text-[var(--color-text-secondary)]'">{{ pkg.bestFor }}</p>
            <NuxtLink to="/creative-services" :class="pkg.featured ? 'hue-btn-ghost' : 'hue-link'">
              Learn More
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </NuxtLink>
          </div>
        </div>
        <div class="mt-10 text-center">
          <NuxtLink to="/creative-services" class="hue-link">
            View all services, retainers &amp; à la carte
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ CASE STUDIES ═══ -->
    <section v-if="caseStudies?.length" class="hue-section relative overflow-hidden px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="mb-8 md:mb-14 flex items-end justify-between">
          <div>
            <p class="hue-label mb-3">Case Studies</p>
            <h2 class="hue-display-lg">Results that speak<br>for themselves.</h2>
          </div>
          <NuxtLink to="/case-studies" class="hue-link hidden sm:inline-flex">
            View all case studies
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="relative">
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              :style="{ transform: `translateX(-${activeCaseStudy * 100}%)` }"
            >
              <div
                v-for="(cs, i) in caseStudies.slice(0, 5)"
                :key="cs.id"
                class="w-full flex-shrink-0"
              >
                <CaseStudiesCaseStudyCard
                  :cs="cs"
                  :image-src="csHomeImage(cs)"
                  :eager="i === 0"
                  :number="String(i + 1).padStart(2, '0')"
                />
              </div>
            </div>
          </div>
          <!-- Progress indicators — same style as hero slider -->
          <div class="mt-8 flex items-center justify-center gap-2">
            <button
              v-for="(cs, i) in caseStudies.slice(0, 5)"
              :key="cs.id + '-dot'"
              :aria-label="`Go to case study ${i + 1}`"
              class="relative h-[3px] w-10 overflow-hidden rounded-full transition-all duration-300"
              :class="i === activeCaseStudy ? 'bg-[var(--color-accent)]/30' : 'bg-[var(--color-border)] hover:bg-[var(--color-border-light)]'"
              @click="activeCaseStudy = i"
            >
              <div
                v-if="i === activeCaseStudy"
                class="absolute inset-y-0 left-0 w-full rounded-full bg-[var(--color-accent)]"
              />
            </button>
          </div>
        </div>
        <div class="mt-8 text-center sm:hidden">
          <NuxtLink to="/case-studies" class="hue-link">
            View all case studies
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ HOW WE WORK ═══ -->
    <section class="hue-section overflow-hidden px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="mb-8 md:mb-14 text-center lg:text-left">
          <p class="hue-label mb-3">How We Work</p>
          <h2 class="hue-display-lg">From first call to final delivery.</h2>
        </div>
        <IdeaChart />
        <div class="mt-8 text-center">
          <NuxtLink to="/magazine/three-week-discovery-process" class="hue-link">
            Learn about our process
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- ═══ HOW WE WORK (original — commented out) ═══ -->
    <!--
    <section class="hue-section px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="mb-8 md:mb-14">
          <p class="hue-label mb-3">How We Work</p>
          <h2 class="hue-display-lg">From first call to final delivery.</h2>
        </div>
        <NumberedGrid :items="processGridItems" :cols="4" :mobile-carousel="true" />
        <div class="mt-8 text-center">
          <NuxtLink to="/creative-services" class="hue-link">
            View all services
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>
    -->

    <!-- ═══ SERVICES CAROUSEL ═══ -->
    <section class="hue-section-alt px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="mb-8 md:mb-14 flex items-end justify-between">
          <div>
            <p class="hue-label mb-3">Our Services</p>
            <h2 class="hue-display-lg">What we do.</h2>
          </div>
          <NuxtLink to="/creative-services" class="hue-link hidden sm:inline-flex">
            View all services
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <NumberedGrid :items="serviceGridItems" :carousel="true" :visible-cols="4" />
      </div>
    </section>

    <!-- ═══ FEATURED WORK ═══ -->
    <section class="hue-section bg-white px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="mb-8 md:mb-14 flex items-end justify-between">
          <div>
            <p class="hue-label mb-3">Portfolio</p>
            <h2 class="hue-display-lg">Creating impact<br>through visual excellence.</h2>
          </div>
          <NuxtLink to="/portfolio" class="hue-link hidden sm:inline-flex">
            View all work
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <HomePortfolioPreview />
      </div>
    </section>

    <!-- ═══ INDUSTRIES ═══ -->
    <section class="hue-section-alt px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="mb-8 md:mb-14 text-center">
          <p class="hue-label mb-3">Industries</p>
          <h2 class="hue-display-lg">Industries We Serve</h2>
          <p class="mx-auto mt-4 max-w-md text-[0.9375rem] text-[var(--color-text-muted)]">
            We specialize in sectors where credibility, trust, and professional presence drive decisions — from B2B growth companies to government and community organizations.
          </p>
        </div>
        <NumberedGrid :items="industryGridItems" :cols="4" :mobile-carousel="true" />
        <div class="mt-8 text-center">
          <NuxtLink to="/industries" class="hue-link">All industries <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ ABOUT STRIP ═══ -->
    <section class="hue-section-dark px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container grid gap-10 md:gap-16 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5 text-white/40">About Hue</p>
          <h2 class="hue-display-lg mb-6 text-white">
            We believe effective design<br>begins with
            <span style="font-family:var(--font-editorial);font-style:italic;">understanding.</span>
          </h2>
          <p class="mb-8 text-[1.0625rem] leading-relaxed text-white/45">
            From our roots in New York City to our home in Miami Beach, we craft brand experiences that resonate. Founded by Camila Hoffman — Art Director at A|X Armani Exchange for over 8 years, Parsons BFA — and Peter Hoffman, our boutique approach ensures every project receives the attention and creative excellence it deserves.
          </p>
          <NuxtLink to="/about" class="hue-link">
            Learn more about us
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 content-center gap-px overflow-hidden rounded-sm bg-white/5">
          <div v-for="stat in agencyStats" :key="stat.label" class="bg-[var(--near-black)] p-6 md:p-10 text-center">
            <p class="hue-editorial-xl text-white">{{ stat.value }}</p>
            <p class="hue-label-sm mt-2 text-white/30">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ HUE INTELLIGENCE CALLOUT ═══ -->
    <section class="relative overflow-hidden bg-[#110F0A] px-5 md:px-6 py-14 md:py-32">
      <!-- Subtle gradient glow -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D4973A]/[0.05] blur-[120px]" />
        <div class="absolute right-1/4 bottom-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-[#D4973A]/[0.03] blur-[100px]" />
      </div>
      <div class="hue-container relative grid gap-10 md:gap-16 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5 text-[#D4973A]/60">Hue Intelligence</p>
          <h2 class="hue-display-lg mb-6 text-white">
            The answers are<br>
            <span style="font-family:var(--font-editorial);font-style:italic;">already</span> in your data.
          </h2>
          <p class="mb-8 text-[1.0625rem] leading-relaxed text-white/40">
            Your organization already has the data it needs to work smarter. We connect it, automate the repetitive work, and give your team instant answers — so Monday morning reports write themselves and no follow-up falls through the cracks.
          </p>
          <NuxtLink to="/intelligence" class="inline-flex items-center gap-2 rounded-full border border-[#D4973A]/30 px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-wider text-[#D4973A]/80 transition-all hover:border-[#D4973A]/60 hover:text-[#D4973A]">
            Explore Hue Intelligence
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 content-center gap-3">
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:bot" class="mb-3 size-5 text-[#D4973A]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">Instant Answers</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">Type "How many proposals did we send this quarter?" and get the answer from your own data — instantly.</p>
          </div>
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:workflow" class="mb-3 size-5 text-[#D4973A]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">Automatic Follow-Up</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">A lead fills out your form at midnight. By morning, they've received a welcome email and your team got an alert.</p>
          </div>
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:sparkles" class="mb-3 size-5 text-[#D4973A]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">One-Click Content</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">Generate this month's newsletter from your latest projects and milestones — ready to review and send.</p>
          </div>
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:layout-dashboard" class="mb-3 size-5 text-[#D4973A]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">Your Daily Dashboard</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">One screen with today's numbers, overdue items, and an AI summary of what needs attention.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ BRAND AUDIT CTA ═══ -->
    <section class="hue-section px-5 md:px-6 py-14 md:py-32">
      <div class="hue-container">
        <div class="hue-grid-bordered grid-cols-1 lg:grid-cols-3">
          <div class="col-span-2 p-10 lg:p-14">
            <span class="mb-5 inline-flex items-center rounded-full bg-[var(--near-black)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-white">Free</span>
            <h2 class="hue-display-lg mb-5">Brand Perception Analysis</h2>
            <p class="hue-body-lg mb-8 max-w-lg">
              Not sure where your brand stands? In 8 questions and 15 minutes, we'll assess your current positioning and deliver a custom presentation in 5 business days. Free, confidential, no obligation.
            </p>
            <NuxtLink to="/brand-analysis" class="hue-btn" @click="trackCtaClick('Start Your Free Analysis', 'homepage_audit_cta')">
              Start Your Free Analysis
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </NuxtLink>
          </div>
          <div class="border-t border-[var(--silk)] bg-[var(--snow)] p-10 lg:border-l lg:border-t-0">
            <div class="grid h-full grid-cols-2 content-center gap-6">
              <div v-for="stat in auditStats" :key="stat.label" class="text-center">
                <p class="hue-editorial-xl">{{ stat.value }}</p>
                <p class="hue-label-sm mt-1">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CLOSING QUOTE ═══ -->
    <section class="hue-section-dark px-5 md:px-6 py-16 text-center md:py-44">
      <div class="hue-container-sm">
        <p class="hue-pullquote reveal text-white">
          "Design is intelligence<br class="hidden md:block"> made visible."
        </p>
        <div class="mx-auto mt-6 h-px w-10 bg-white/20" />
        <p class="mt-4 hue-label text-white/25">— Lou Danziger</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { packages, processSteps } from '~/data/services'
import { industries } from '~/data/industries'

const { trackCtaClick, useScrollDepthTracker } = useTracking()
const { fetchCaseStudies, fetchServices, assetUrl } = useDirectus()
const { data: allServices } = await useAsyncData('home-services', () => fetchServices())
const { data: caseStudies } = await useAsyncData('home-case-studies', () => fetchCaseStudies({ limit: 5, featured: true }))
const activeCaseStudy = ref(0)

function csHomeImage(cs: any): string | null {
  if (cs.featured_image) return assetUrl(cs.featured_image, 'medium-contain')
  if (cs.organization?.logo) return assetUrl(cs.organization.logo, 'medium-contain')
  const pi = cs.portfolio_items?.find((p: any) => p.portfolio_id?.featured_image || p.portfolio_id?.images?.length)
  if (pi?.portfolio_id?.featured_image) return assetUrl(pi.portfolio_id.featured_image, 'medium-contain')
  if (pi?.portfolio_id?.images?.[0]?.directus_files_id) return assetUrl(pi.portfolio_id.images[0].directus_files_id, 'medium-contain')
  return null
}

useSeoMeta({
  title: 'Hue Studios — Brand Strategy & Creative Execution | Miami Beach & New York',
  description: 'Strategic brand positioning and creative execution for growth-stage companies, government agencies, and mission-driven organizations. Woman-owned. Founded 2005. Miami Beach & New York.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Hue Studios', description: 'Brand strategy, digital experience, and creative execution for growth-stage companies.' } })

const featuredIndustries = industries.slice(0, 4)

const agencyStats = computed(() => [
  { value: '20+', label: 'Years in Business' },
  { value: '200+', label: 'Projects Delivered' },
  { value: 'NY·MIA', label: 'Studio Locations' },
  { value: String(allServices.value?.length ?? 8), label: 'Core Disciplines' },
])

const processGridItems = processSteps.map((s) => ({
  number: s.number,
  title: s.title,
  description: s.description,
}))

const industryGridItems = featuredIndustries.map((ind, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: ind.name,
  description: ind.headline,
  to: `/industries/${ind.slug}`,
  linkText: 'See work',
}))

const serviceGridItems = computed(() =>
  (allServices.value ?? []).map((s: any, i: number) => ({
    number: String(i + 1).padStart(2, '0'),
    title: s.name,
    description: s.caption,
    to: `/creative-services/${s.url}`,
    linkText: 'Explore',
  }))
)

const auditStats = [
  { value: '8', label: 'Questions' },
  { value: '15', label: 'Minutes' },
  { value: '5', label: 'Day Delivery' },
  { value: '$0', label: 'Cost' },
]

onMounted(() => {
  useScrollDepthTracker()
})

useScrollReveal()
</script>

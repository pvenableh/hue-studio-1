<template>
  <div>
    <!-- ═══ HERO ═══ -->
    <section ref="homeHeroRef" class="hue-section-dark relative overflow-hidden px-2 md:px-6 py-28 md:py-36">
      <div class="hue-container relative z-10 grid gap-16 lg:grid-cols-2">
        <div>
          <p ref="heroLabel" class="hue-label mb-5 text-white/40 opacity-0">
            Brand Strategy &amp; Creative Agency · Miami Beach &amp; New York
          </p>
          <h1 ref="heroTitle" class="hue-display-xl text-white opacity-0">
            Design with
            <span style="font-family: var(--font-editorial); font-style: italic;">Purpose.</span>
          </h1>
          <p ref="heroSub" class="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-white/45 opacity-0">
            Strategic brand positioning and creative execution for growth-stage companies. Built on 20 years of experience shaping brands that command attention and generate results.
          </p>
          <div ref="heroCta" class="mt-12 flex flex-col gap-4 opacity-0 sm:flex-row">
            <NuxtLink to="/contact" class="hue-btn-ghost">
              Schedule a Discovery Call
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </NuxtLink>
            <NuxtLink to="/creative-services" class="inline-flex items-center gap-1.5 text-[0.75rem] font-medium uppercase tracking-wider text-white/50 transition-all hover:gap-2 hover:text-white/70">
              View Packages &amp; Pricing
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -bottom-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.015] blur-3xl" />
      </div>
    </section>

    <!-- ═══ PHILOSOPHY ═══ -->
    <section class="hue-section px-2 md:px-6 py-24 md:py-32">
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
    <section class="hue-section-alt px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 text-center">
          <p class="hue-label mb-3">What We Do</p>
          <h2 class="hue-display-lg">Service Packages</h2>
          <p class="mx-auto mt-4 max-w-md text-[0.9375rem] text-[var(--color-text-muted)]">
            Three tiers designed to scale with your growth. Every package is strategic, measurable, and built to generate results.
          </p>
        </div>
        <div class="grid items-start gap-5 lg:grid-cols-3">
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
    <section v-if="caseStudies?.length" class="hue-section px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 flex items-end justify-between">
          <div>
            <p class="hue-label mb-3">Case Studies</p>
            <h2 class="hue-display-lg">Results that speak<br>for themselves.</h2>
          </div>
          <NuxtLink to="/case-studies" class="hue-link hidden sm:inline-flex">
            View all case studies
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="cs in caseStudies.slice(0, 3)"
            :key="cs.id"
            :to="`/case-studies/${cs.url}`"
            class="group hue-card flex flex-col overflow-hidden"
          >
            <div class="aspect-[16/10] bg-[var(--snow)] flex items-center justify-center p-6">
              <img
                v-if="csHomeImage(cs)"
                :src="csHomeImage(cs)!"
                :alt="cs.title"
                class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div v-else class="text-[var(--silver)]">
                <Icon name="lucide:image" class="size-12" />
              </div>
            </div>
            <div class="flex flex-1 flex-col p-6">
              <p v-if="cs.organization?.name" class="hue-label-sm mb-2 text-[var(--silver)]">{{ cs.organization.name }}</p>
              <h3 class="mb-2 text-[0.75rem] font-medium uppercase tracking-[0.08em]">{{ cs.title }}</h3>
              <p v-if="cs.excerpt" class="mt-auto pt-3 text-[0.8125rem] font-sans leading-relaxed text-[var(--color-text-muted)] line-clamp-2">{{ cs.excerpt }}</p>
            </div>
          </NuxtLink>
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
    <section class="hue-section px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14">
          <p class="hue-label mb-3">How We Work</p>
          <h2 class="hue-display-lg">From first call to final delivery.</h2>
        </div>
        <NumberedGrid :items="processGridItems" :cols="4" />
        <div class="mt-8 text-center">
          <NuxtLink to="/creative-services" class="hue-link">
            View all services
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ SERVICES CAROUSEL ═══ -->
    <section class="hue-section-alt px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 flex items-end justify-between">
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
    <section class="hue-section-alt px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 flex items-end justify-between">
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
    <section class="hue-section-alt px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 text-center">
          <p class="hue-label mb-3">Industries</p>
          <h2 class="hue-display-lg">Industries We Serve</h2>
          <p class="mx-auto mt-4 max-w-md text-[0.9375rem] text-[var(--color-text-muted)]">
            We specialize in sectors where credibility, trust, and professional presence drive decisions — from B2B growth companies to government and community organizations.
          </p>
        </div>
        <NumberedGrid :items="industryGridItems" :cols="4" />
        <div class="mt-8 text-center">
          <NuxtLink to="/industries" class="hue-link">All industries <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ ABOUT STRIP ═══ -->
    <section class="hue-section-dark px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container grid gap-16 lg:grid-cols-2">
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
          <div v-for="stat in agencyStats" :key="stat.label" class="bg-[var(--near-black)] p-10 text-center">
            <p class="hue-editorial-xl text-white">{{ stat.value }}</p>
            <p class="hue-label-sm mt-2 text-white/30">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ AI & MCP CALLOUT ═══ -->
    <section class="relative overflow-hidden bg-[#1a1225] px-2 md:px-6 py-24 md:py-32">
      <!-- Subtle gradient glow -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/[0.06] blur-[120px]" />
        <div class="absolute right-1/4 bottom-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-[#8B5CF6]/[0.04] blur-[100px]" />
      </div>
      <div class="hue-container relative grid gap-16 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5 text-[#8B5CF6]/60">AI & Automation</p>
          <h2 class="hue-display-lg mb-6 text-white">
            Your content should<br>talk to
            <span style="font-family:var(--font-editorial);font-style:italic;">AI.</span>
          </h2>
          <p class="mb-8 text-[1.0625rem] leading-relaxed text-white/40">
            We build content platforms that are natively AI-ready. Through MCP integrations and structured content architecture, your brand becomes queryable, composable, and actionable by AI tools — today, not someday.
          </p>
          <NuxtLink to="/creative-services/ai-automation-mcp" class="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-wider text-[#8B5CF6]/80 transition-all hover:border-[#8B5CF6]/60 hover:text-[#8B5CF6]">
            Explore AI Services
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 content-center gap-3">
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:bot" class="mb-3 size-5 text-[#8B5CF6]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">MCP Integration</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">AI tools query your content natively via Model Context Protocol.</p>
          </div>
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:sparkles" class="mb-3 size-5 text-[#8B5CF6]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">Content Intelligence</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">Automated tagging, classification, and enrichment powered by AI.</p>
          </div>
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:workflow" class="mb-3 size-5 text-[#8B5CF6]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">Smart Workflows</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">AI-assisted content creation and approval pipelines in your CMS.</p>
          </div>
          <div class="rounded-lg border border-white/[0.06] bg-white/[0.03] p-6">
            <Icon name="lucide:zap" class="mb-3 size-5 text-[#8B5CF6]/60" />
            <p class="mb-1 text-[0.8125rem] font-medium text-white/80">Automation</p>
            <p class="text-[0.75rem] leading-relaxed text-white/30">Event-driven pipelines connecting your content to any service.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ BRAND AUDIT CTA ═══ -->
    <section class="hue-section px-2 md:px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="hue-grid-bordered grid-cols-1 lg:grid-cols-3">
          <div class="col-span-2 p-10 lg:p-14">
            <span class="mb-5 inline-flex items-center rounded-full bg-[var(--near-black)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-white">Free</span>
            <h2 class="hue-display-lg mb-5">Brand Perception Audit</h2>
            <p class="hue-body-lg mb-8 max-w-lg">
              Not sure where your brand stands? In 8 questions and 15 minutes, we'll assess your current positioning and deliver a custom presentation in 5 business days. Free, confidential, no obligation.
            </p>
            <NuxtLink to="/brand-audit" class="hue-btn">
              Start Your Free Audit
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
    <section class="hue-section-dark px-2 md:px-6 py-32 text-center md:py-44">
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
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const homeHeroRef = ref<HTMLElement | null>(null)
import { packages, processSteps } from '~/data/services'
import { industries } from '~/data/industries'

const { fetchCaseStudies, fetchServices, assetUrl } = useDirectus()
const { data: allServices } = await useAsyncData('home-services', () => fetchServices())
const { data: caseStudies } = await useAsyncData('home-case-studies', () => fetchCaseStudies({ limit: 3, featured: true }))

function csHomeImage(cs: any): string | null {
  if (cs.featured_image) return assetUrl(cs.featured_image, 'medium-contain')
  if (cs.organization?.logo) return assetUrl(cs.organization.logo, 'medium-contain')
  const pi = cs.portfolio_items?.find((p: any) => p.portfolio_id?.featured_image || p.portfolio_id?.images?.length)
  if (pi?.portfolio_id?.featured_image) return assetUrl(pi.portfolio_id.featured_image, 'medium-contain')
  if (pi?.portfolio_id?.images?.[0]?.directus_files_id) return assetUrl(pi.portfolio_id.images[0].directus_files_id, 'medium-contain')
  return null
}

useSeoMeta({
  title: 'Hue Creative Agency — Brand Strategy & Creative Execution | Miami Beach & New York',
  description: 'Strategic brand positioning and creative execution for growth-stage companies, government agencies, and mission-driven organizations. Woman-owned. Founded 2005. Miami Beach & New York.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Hue — Creative Marketing Studio', description: 'Brand strategy, digital experience, and creative execution for growth-stage companies.' } })

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

const heroLabel = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSub   = ref<HTMLElement | null>(null)
const heroCta   = ref<HTMLElement | null>(null)

useScrollReveal()

onMounted(async () => {
  await nextTick()
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(heroLabel.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo(heroTitle.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, '-=0.4')
    .fromTo(heroSub.value,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .fromTo(heroCta.value,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
})
</script>

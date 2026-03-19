<template>
  <div>
    <!-- ═══ HERO ═══ -->
    <section class="hue-section-dark relative overflow-hidden px-6 py-36 text-center md:py-48 lg:py-56">
      <div class="hue-container relative z-10">
        <p ref="heroLabel" class="hue-label mb-6 tracking-[0.15em] text-white/40 opacity-0">
          B2B Creative Agency · Miami Beach &amp; New York
        </p>
        <h1 ref="heroTitle" class="hue-display-xl mx-auto max-w-4xl text-white opacity-0">
          Design with
          <span style="font-family: var(--font-editorial); font-style: italic;">Purpose.</span>
        </h1>
        <p ref="heroSub" class="mx-auto mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-white/45 opacity-0">
          Strategic brand positioning and creative execution for growth-stage companies. Built on 20 years of experience shaping brands that command attention and generate results.
        </p>
        <div ref="heroCta" class="mt-12 flex flex-col items-center gap-4 opacity-0 sm:flex-row sm:justify-center">
          <NuxtLink to="/contact" class="hue-btn-ghost">
            Schedule a Discovery Call
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
          <NuxtLink to="/creative-services" class="hue-link text-white/50">
            View Packages &amp; Pricing
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -bottom-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.015] blur-3xl" />
      </div>
    </section>

    <!-- ═══ PHILOSOPHY ═══ -->
    <section class="hue-section px-6 py-24 md:py-32">
      <div class="hue-container-sm text-center">
        <div class="mx-auto mb-10 h-px w-10 bg-[var(--silk)]" />
        <p class="hue-editorial-lg mb-7 reveal">
          "Visual excellence is achieved through a process<br class="hidden md:block"> that is executed with a defined purpose."
        </p>
        <p class="hue-body-lg mb-5 reveal reveal-delay-1">
          Every engagement begins with understanding your business — your market, competitive landscape, and growth objectives — before any design work starts.
          It ensures every creative deliverable is purposeful, aligned, and built to perform.
        </p>
        <p class="hue-body-sm reveal reveal-delay-2">
          Founded in 2005. Boutique by design. From New York to Miami Beach — built for B2B.
        </p>
      </div>
    </section>

    <!-- ═══ SERVICE PACKAGES ═══ -->
    <section class="hue-section-alt px-6 py-24 md:py-32">
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

    <!-- ═══ THE PROCESS ═══ -->
    <section class="hue-section px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p class="hue-label mb-3">Our Process</p>
            <h2 class="hue-display-lg">Process creates<br>
              <span style="font-family:var(--font-editorial);font-style:italic;">meaning.</span>
            </h2>
          </div>
          <p class="hue-body-lg lg:max-w-md">
            We believe great design comes from deep understanding. Our four-stage process ensures every detail serves a defined purpose — from analysis through to the big idea.
          </p>
        </div>
        <div class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="step in processSteps" :key="step.number" class="group bg-white p-9 transition-colors hover:bg-[var(--snow)]">
            <span class="hue-label-sm text-[var(--silver)]">{{ step.number }}</span>
            <h3 class="mt-4 mb-2 text-[1.1rem] font-light">{{ step.title }}</h3>
            <p class="hue-label-sm mb-4 text-[var(--silver)]">{{ step.subtitle }}</p>
            <p class="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ step.description }}</p>
          </div>
        </div>
        <div class="mt-8 text-center">
          <NuxtLink to="/about" class="hue-link">
            Learn our approach
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURED WORK ═══ -->
    <section class="hue-section-alt px-6 py-24 md:py-32">
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
        <div class="mt-8 text-center sm:hidden">
          <NuxtLink to="/portfolio" class="hue-link">View all work <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ INDUSTRIES ═══ -->
    <section class="hue-section px-6 py-24 md:py-32">
      <div class="hue-container">
        <div class="mb-14 text-center">
          <p class="hue-label mb-3">Industries</p>
          <h2 class="hue-display-lg">Built for B2B</h2>
          <p class="mx-auto mt-4 max-w-md text-[0.9375rem] text-[var(--color-text-muted)]">
            We specialize in sectors where credibility, trust, and professional presence drive business decisions.
          </p>
        </div>
        <div class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="(ind, i) in featuredIndustries"
            :key="ind.slug"
            :to="`/industries/${ind.slug}`"
            class="group flex flex-col justify-between bg-white p-8 transition-colors hover:bg-[var(--snow)]"
          >
            <div>
              <span class="hue-label-sm">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="mt-4 text-[1.0625rem] font-light leading-snug transition-transform duration-300 group-hover:translate-x-1">{{ ind.name }}</h3>
              <p class="mt-2 text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ ind.headline }}</p>
            </div>
            <div class="mt-6 flex items-center gap-2 text-[0.75rem] text-[var(--silver)] transition-all group-hover:gap-3 group-hover:text-[var(--near-black)]">
              See work <Icon name="lucide:arrow-right" class="size-3" />
            </div>
          </NuxtLink>
        </div>
        <div class="mt-8 text-center">
          <NuxtLink to="/industries" class="hue-link">All industries <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ ABOUT STRIP ═══ -->
    <section class="hue-section-dark px-6 py-24 md:py-32">
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
          <NuxtLink to="/about" class="hue-link text-white/60">
            Learn more about us
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 content-center gap-px overflow-hidden rounded-xl bg-white/5">
          <div v-for="stat in agencyStats" :key="stat.label" class="bg-[var(--near-black)] p-10 text-center">
            <p class="hue-editorial-xl text-white">{{ stat.value }}</p>
            <p class="hue-label-sm mt-2 text-white/30">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ BRAND AUDIT CTA ═══ -->
    <section class="hue-section px-6 py-24 md:py-32">
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
    <section class="hue-section-dark px-6 py-32 text-center md:py-44">
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
import { packages, processSteps } from '~/data/services'
import { industries } from '~/data/industries'

useSeoMeta({
  title: 'Hue Creative Agency — B2B Brand Strategy & Creative Execution | Miami Beach & New York',
  description: 'Strategic brand positioning and creative execution for growth-stage B2B companies. Founded 2005. Packages starting at $15,000. Miami Beach & New York.',
})

const featuredIndustries = industries.slice(0, 4)

const agencyStats = [
  { value: '20+', label: 'Years in Business' },
  { value: '200+', label: 'Projects Delivered' },
  { value: 'NY·MIA', label: 'Studio Locations' },
  { value: '6', label: 'Core Disciplines' },
]

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

onMounted(async () => {
  await nextTick()
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(heroLabel.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo(heroTitle.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, '-=0.4')
    .fromTo(heroSub.value,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .fromTo(heroCta.value,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')

  useScrollReveal()
})
</script>

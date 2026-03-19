<template>
  <div>
    <!-- Hero -->
    <section class="hue-section-dark px-6 py-28 md:py-36">
      <div class="hue-container grid gap-16 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5 text-white/40">Industries</p>
          <h1 class="hue-display-xl text-white">
            We speak your<br>industry's
            <span style="font-family:var(--font-editorial);font-style:italic;">language.</span>
          </h1>
        </div>
        <div class="flex items-end">
          <p class="text-[1.0625rem] leading-relaxed text-white/40">
            Every sector has its own buyers, its own visual conventions, and its own standards of credibility. We've worked across enough of them to know the difference — and when breaking convention is exactly the right move.
          </p>
        </div>
      </div>
    </section>

    <!-- Industry grid -->
    <section class="hue-section px-6 py-16">
      <div class="hue-container">
        <div class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="(ind, i) in industries"
            :key="ind.slug"
            :to="`/industries/${ind.slug}`"
            class="group flex flex-col justify-between bg-white p-9 transition-colors hover:bg-[var(--snow)]"
          >
            <div>
              <div class="mb-6 flex items-center justify-between">
                <span class="hue-label-sm text-[var(--silver)]">{{ String(i + 1).padStart(2, '0') }}</span>
                <div class="h-1.5 w-1.5 rounded-full" :style="{ background: ind.color }" />
              </div>
              <h2 class="mb-3 text-[1.2rem] font-light leading-snug transition-transform duration-300 group-hover:translate-x-1">{{ ind.name }}</h2>
              <p class="hue-editorial-md mb-5">"{{ ind.headline }}"</p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="client in ind.clients.slice(0, 2)"
                  :key="client"
                  class="rounded-full border border-[var(--silk)] px-2.5 py-0.5 text-[0.7rem] text-[var(--silver)]"
                >{{ client }}</span>
              </div>
            </div>
            <div class="mt-8 flex items-center gap-2 text-[0.75rem] text-[var(--silver)] transition-all group-hover:gap-3 group-hover:text-[var(--near-black)]">
              See work <Icon name="lucide:arrow-right" class="size-3" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why industry matters -->
    <section class="hue-section-dark px-6 py-24">
      <div class="hue-container">
        <p class="hue-label mb-10 text-white/40">Why it matters</p>
        <div class="grid gap-px overflow-hidden rounded-xl bg-white/5 md:grid-cols-3">
          <div v-for="point in whyPoints" :key="point.num" class="bg-[var(--near-black)] p-10">
            <span class="hue-label-sm text-white/20">{{ point.num }}</span>
            <h3 class="mt-4 mb-3 text-[1.1rem] font-light text-white">{{ point.title }}</h3>
            <p class="text-[0.875rem] leading-relaxed text-white/40">{{ point.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services cross-link -->
    <section class="hue-section px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">Our services</p>
          <NuxtLink
            v-for="svc in serviceLinks"
            :key="svc.to"
            :to="svc.to"
            class="rounded-full border border-[var(--silk)] px-4 py-2 text-[0.8125rem] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ svc.label }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="hue-section-alt px-6 py-20">
      <div class="hue-container flex flex-col items-center justify-between gap-8 sm:flex-row">
        <div>
          <h2 class="hue-display-md mb-2">Don't see your industry?</h2>
          <p class="hue-body max-w-md">We work across many sectors. If your business needs a brand that performs, let's talk.</p>
        </div>
        <NuxtLink to="/contact" class="hue-btn shrink-0">
          Let's talk <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { industries } from '~/data/industries'

useSeoMeta({
  title: 'Industries | B2B Creative Agency | Hue',
  description: 'We serve architecture, construction, real estate, professional services, fashion, technology, and nonprofit sectors with strategic brand and creative work.',
})

const whyPoints = [
  { num: '01', title: 'We know your buyers.', body: 'A general contractor\'s client is not a fashion buyer. We design for the actual decision-maker in your world — not a generic business audience.' },
  { num: '02', title: 'We know the conventions.', body: 'Every industry has visual norms. We know when to follow them for credibility — and when to break them to stand out.' },
  { num: '03', title: 'Less briefing, more doing.', body: 'When we already understand your world, the project moves faster and the work lands more precisely.' },
]

const serviceLinks = [
  { label: 'Brand Strategy', to: '/creative-services/brand-development-identity-design' },
  { label: 'Digital & Web', to: '/creative-services/website-design-app-development' },
  { label: 'Print & Graphic', to: '/creative-services/print-production-graphic-design' },
  { label: 'Corporate & Data', to: '/creative-services/corporate-presentation-data-reporting' },
  { label: 'Events', to: '/creative-services/events' },
  { label: 'Video', to: '/creative-services/video-audio-production' },
]
</script>

<template>
  <div>
    <section class="hue-section relative overflow-x-clip px-2 md:px-6 pb-16 pt-24 md:pt-32">
      <SectionWatermark word="Stories" />
      <div class="hue-container relative">
        <p class="hue-label mb-4">Case Studies</p>
        <h1 class="hue-display-xl mb-5">
          Work that
          <span style="font-family:var(--font-editorial);font-style:italic;">performs</span>.
        </h1>
        <p class="hue-body max-w-lg">Every project starts with understanding why. Our rationale-first process ensures every deliverable is purposeful, aligned, and built to perform.</p>
      </div>
    </section>

    <section class="hue-section px-2 md:px-6 pb-24 pt-10">
      <div class="hue-container">
        <HomeWorkIndex />
      </div>
    </section>

    <!-- Editorial break -->
    <section class="hue-section-alt px-2 md:px-6 py-20 text-center">
      <div class="hue-container-sm">
        <p class="hue-pullquote reveal">Every project starts with<br class="hidden md:block"> understanding why.</p>
        <p class="mt-6 hue-body reveal reveal-delay-1">Our rationale-first process ensures every deliverable is purposeful, aligned, and built to perform.</p>
      </div>
    </section>

    <!-- Brand analysis -->
    <section class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <span class="inline-flex items-center rounded-full bg-[var(--near-black)] px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider text-white">Free</span>
              <p class="hue-label-sm">Brand Perception Analysis</p>
            </div>
            <p class="max-w-md hue-body">See where your brand stands before your next project. 10 questions, a custom presentation in 5 days.</p>
          </div>
          <NuxtLink to="/brand-analysis" class="hue-link shrink-0">Start Free Analysis <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <section class="hue-section-dark px-2 md:px-6 py-28 text-center md:py-36">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-6 reveal text-white">Your Project Could<br>Be Next</h2>
        <p class="mb-10 text-[0.9375rem] leading-relaxed text-white/45 reveal reveal-delay-1">Let's discuss your brand, your market, and what success looks like.</p>
        <NuxtLink to="/contact" class="hue-btn-ghost">Schedule a Discovery Call</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Case Studies | B2B Branding & Lead Generation | Hue',
  description: 'Explore our case studies in brand strategy, website design, and lead generation for government, architecture, real estate, technology, and professional services.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Case Studies', description: 'Deep dives into strategy, execution, and measurable outcomes.', label: 'Case Studies' } })

useScrollReveal()
</script>

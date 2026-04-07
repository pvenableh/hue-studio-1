<template>
  <section class="intel-section" style="background: var(--color-bg);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">Two Paths Forward</p>
      <h2 class="intel-h2 mb-14 max-w-3xl reveal reveal-delay-1">
        Whether your data is organized or scattered, we start where you are.
      </h2>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Track A — Directus clients -->
        <div class="intel-card reveal" style="border-color: var(--color-border);">
          <span class="intel-pill-teal mb-5 inline-block">Directus Clients</span>
          <h3 class="intel-h3 mb-4" style="font-size: 1.5rem;">You're already halfway there.</h3>
          <p class="intel-body mb-8">
            If your website or operations already run on Directus, your data is
            already structured and ready for AI. We connect an intelligence layer
            on top — so your team can ask questions, trigger automations, and
            generate content without changing anything about how they work today.
          </p>
          <ul class="mb-8 flex flex-col gap-3">
            <li v-for="feature in trackA" :key="feature" class="flex items-start gap-3">
              <Icon name="lucide:check" class="mt-0.5 size-4 shrink-0" style="color: var(--intel-teal);" />
              <span class="intel-body" style="color: var(--color-text);">{{ feature }}</span>
            </li>
          </ul>
          <a href="#services" class="intel-link-teal">Explore Track A &rarr;</a>
        </div>

        <!-- Track B — New clients -->
        <div class="intel-card reveal reveal-delay-1" style="border-color: var(--color-border);">
          <span class="intel-pill-purple mb-5 inline-block">New Clients</span>
          <h3 class="intel-h3 mb-4" style="font-size: 1.5rem;">We organize the data first, then make it intelligent.</h3>
          <p class="intel-body mb-8">
            Your data lives in spreadsheets, email threads, and tools that don't
            talk to each other. We start with a quick audit to map what you have,
            build the foundation that connects it all, and deliver quick-win
            automations that save time in the first week — while building toward
            the full intelligence platform.
          </p>
          <ul class="mb-8 flex flex-col gap-3">
            <li v-for="feature in trackB" :key="feature" class="flex items-start gap-3">
              <Icon name="lucide:check" class="mt-0.5 size-4 shrink-0" style="color: var(--intel-purple);" />
              <span class="intel-body" style="color: var(--color-text);">{{ feature }}</span>
            </li>
          </ul>
          <a href="#services" class="intel-link-purple">Explore Track B &rarr;</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const trackA = [
  'Ask "Which donors gave over $5K last year?" and get the answer instantly',
  'When a project status changes, the client gets an update automatically',
  'Generate this month\'s newsletter from your latest news and events in 90 seconds',
  'One dashboard with today\'s KPIs, open tasks, and an AI-written summary',
  'New automations added monthly as your team finds more to streamline',
]

const trackB = [
  'AI Readiness Audit — a clear roadmap delivered in days, not months',
  'We organize your data into a system AI can actually work with',
  'Quick-win automations on your existing tools — value in the first week',
  'AI-powered website and content generation built on your new foundation',
  'Upgrade path to the full intelligence platform as you grow',
]
</script>

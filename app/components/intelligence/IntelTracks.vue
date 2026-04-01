<template>
  <section class="intel-section" style="background: var(--color-bg);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">Two Paths Forward</p>
      <h2 class="intel-h2 mb-14 max-w-3xl reveal reveal-delay-1">
        Whether you're starting fresh or already structured, we meet you where you are.
      </h2>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Track A — Directus clients -->
        <div class="intel-card reveal" style="border-color: var(--color-border);">
          <span class="intel-pill-teal mb-5 inline-block">Directus Clients</span>
          <h3 class="intel-h3 mb-4" style="font-size: 1.5rem;">Your AI layer is already half-built.</h3>
          <p class="intel-body mb-8">
            If your organization already runs on Directus, you're closer than you think.
            We connect an AI intelligence layer via MCP — letting you query your own
            collections in plain English, trigger automations from data changes, and
            generate content directly from your structured data.
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
          <h3 class="intel-h3 mb-4" style="font-size: 1.5rem;">We build the foundation, then the intelligence.</h3>
          <p class="intel-body mb-8">
            No CMS? No problem. We start with a structured AI Readiness Audit to map
            your data landscape, then implement the infrastructure that makes AI
            actually possible. Quick-win automations deliver value immediately while
            we build toward a full Directus-powered AI platform.
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
  'AI Insight Assistant — ask questions in plain English',
  'Automated workflows from data events',
  'Smart content generation from collections',
  'Custom AI dashboard for your team',
  'Monthly AI Operations Retainer',
]

const trackB = [
  'AI Readiness Audit — roadmap in days, not months',
  'Data Foundation setup (Directus implementation)',
  'Quick-win automations on existing tools',
  'AI-powered website and content generation',
  'Upgrade path to full Track A platform',
]
</script>

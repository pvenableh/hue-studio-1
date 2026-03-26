<template>
  <section class="border-y border-[var(--silk)] px-6 py-20">
    <div class="hue-container">
      <div class="mb-10 grid gap-8 lg:grid-cols-[220px_1fr]">
        <div>
          <p class="text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent);">Our Stack</p>
          <p class="hue-label mt-1">Platform Selection</p>
        </div>
        <div>
          <h2 class="mb-4 max-w-lg text-[1.75rem] font-light" style="font-family: var(--font-editorial);">
            Why we build on Nuxt + Directus — and why it matters for your business.
          </h2>
          <p class="max-w-xl text-[0.9375rem] leading-relaxed text-[var(--grey)]">
            We considered WordPress and Drupal. We recommend neither. Our stack is a deliberate technical decision grounded in performance, security, and future-readiness.
          </p>
        </div>
      </div>

      <!-- Comparison grid -->
      <div class="grid gap-px overflow-hidden rounded-lg border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2">
        <!-- Header row -->
        <div class="bg-[var(--snow)] p-6">
          <p class="hue-label-sm mb-2 text-[var(--silver)]">Capability</p>
        </div>
        <div class="grid grid-cols-2 gap-px bg-[var(--silk)]">
          <div class="bg-[var(--snow)] p-6">
            <p class="hue-label-sm text-[var(--silver)]">WordPress / Drupal</p>
          </div>
          <div class="p-6" style="background: var(--color-accent-tint);">
            <p class="hue-label-sm" style="color: var(--color-accent);">Nuxt + Directus</p>
          </div>
        </div>

        <!-- Rows -->
        <template v-for="row in comparisons" :key="row.capability">
          <div class="bg-white p-6">
            <p class="text-[0.875rem] font-medium">{{ row.capability }}</p>
          </div>
          <div class="grid grid-cols-2 gap-px bg-[var(--silk)]">
            <div class="bg-white p-6">
              <p class="text-[0.8125rem] text-[var(--grey)]">{{ row.wordpress }}</p>
            </div>
            <div class="bg-white p-6">
              <p class="text-[0.8125rem]" style="color: var(--color-accent);">{{ row.nuxt }}</p>
            </div>
          </div>
        </template>
      </div>

      <!-- Key advantages -->
      <div class="mt-8 grid gap-px overflow-hidden rounded-lg bg-[var(--near-black)] md:grid-cols-3">
        <div v-for="adv in advantages" :key="adv.title" class="bg-[#111110] p-7">
          <h3 class="mb-2 text-[0.9375rem] text-white/90" style="font-family: var(--font-editorial);">{{ adv.title }}</h3>
          <p class="text-[0.8125rem] leading-relaxed text-white/35">{{ adv.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const comparisons = [
  { capability: 'Global Performance', wordpress: 'Server-rendered, CDN-assisted', nuxt: 'Edge-rendered, CDN-native' },
  { capability: 'Security Surface', wordpress: 'High (plugin dependencies, DB exposure)', nuxt: 'Minimal (API-only, no public app layer)' },
  { capability: 'Realtime Content', wordpress: 'Plugin-dependent', nuxt: 'Native WebSocket subscriptions' },
  { capability: 'AI / MCP Integration', wordpress: 'Not available natively', nuxt: 'Native MCP endpoint — live' },
  { capability: 'Content Editor Experience', wordpress: 'Complex at scale', nuxt: 'No-code, role-based' },
  { capability: 'Future Extensibility', wordpress: 'Constrained by monolithic architecture', nuxt: 'Headless — any frontend, any channel' },
]

const advantages = [
  {
    title: 'Performance is native.',
    body: 'Pre-rendered pages served from a global edge network. Sub-2.5s Largest Contentful Paint worldwide — not an optimization, the default architecture.',
  },
  {
    title: 'MCP-ready now.',
    body: 'Directus exposes a native Model Context Protocol endpoint. Your content is queryable by AI tools without custom integration — as AI-assisted workflows become standard, your platform is already there.',
  },
  {
    title: 'Content editors love it.',
    body: 'Directus\'s no-code interface is designed for non-technical editors. Your team manages every aspect of the platform without developer involvement. We provide written and video training.',
  },
]
</script>

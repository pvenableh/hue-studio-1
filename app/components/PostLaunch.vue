<template>
  <section class="border-y border-[var(--silk)] px-6 py-20">
    <div class="hue-container">
      <div class="mb-10 grid gap-8 lg:grid-cols-[220px_1fr]">
        <div>
          <p class="text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent);">After Launch</p>
          <p class="hue-label mt-1">Ongoing Partnership</p>
        </div>
        <div>
          <h2 class="mb-4 max-w-lg text-[1.75rem] font-light" style="font-family: var(--font-editorial);">
            We don't hand off and disappear.
          </h2>
          <p class="max-w-xl text-[0.9375rem] leading-relaxed text-[var(--grey)]">
            Every engagement includes a 90-day bug-fix warranty at no charge. After that, we offer straightforward options to keep the platform healthy and the partnership active.
          </p>
        </div>
      </div>

      <!-- Warranty -->
      <div class="mb-6 rounded-lg border-2 border-[var(--near-black)] bg-[var(--near-black)] p-8">
        <div class="flex items-start gap-6">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm" style="background: var(--color-accent);">
            <Icon name="lucide:shield-check" class="size-6 text-white" />
          </div>
          <div>
            <h3 class="mb-2 text-[1.125rem] text-white" style="font-family: var(--font-editorial);">90-Day Bug-Fix Warranty — Included</h3>
            <p class="text-[0.875rem] leading-relaxed text-white/40">
              For ninety days following launch, we remediate any confirmed bugs or functional defects at no additional cost. This covers anything traceable to our code or configuration.
            </p>
          </div>
        </div>
      </div>

      <!-- Options -->
      <div class="grid gap-px overflow-hidden rounded-lg border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-4">
        <div v-for="option in options" :key="option.title" class="bg-white p-7">
          <p class="mb-1 text-[0.5625rem] uppercase tracking-widest text-[var(--silver)]">{{ option.label }}</p>
          <h3 class="mb-2 text-[1rem] font-light">{{ option.title }}</h3>
          <p class="mb-4 text-[0.8125rem] leading-relaxed text-[var(--grey)]">{{ option.body }}</p>
          <p class="text-[0.875rem] font-medium" style="color: var(--color-accent);">{{ option.price }}</p>
        </div>
      </div>

      <!-- Note -->
      <p class="mt-6 text-center text-[0.8125rem] italic text-[var(--grey)]">
        We create custom account packages tailored to each client's evolving needs — combining retainer hours, maintenance, and project-based support into a single, predictable engagement.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const options = [
  {
    label: 'Recommended',
    title: 'Monthly Retainer',
    body: 'Dedicated creative team for content updates, web maintenance, campaign assets, and ongoing digital support.',
    price: '$3,000 – $5,000/mo',
  },
  {
    label: 'Essentials',
    title: 'Website Maintenance',
    body: 'Core updates, security scanning, performance monitoring, and up to 2 hours of minor content edits.',
    price: 'From $1,500/mo',
  },
  {
    label: 'Flexible',
    title: 'À La Carte Projects',
    body: 'Individual projects — landing pages, email campaigns, event collateral, content refreshes.',
    price: 'From $800/project',
  },
  {
    label: 'On Demand',
    title: 'Hourly Rate',
    body: 'Any out-of-scope work not covered by retainer or maintenance agreements.',
    price: '$175/hour',
  },
]
</script>

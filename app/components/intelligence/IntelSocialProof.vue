<template>
  <section class="relative overflow-hidden" style="background: var(--color-bg-alt); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="flex items-center gap-8 px-6 md:px-10 py-5">
      <span class="intel-eyebrow shrink-0">Trusted by</span>
      <div class="relative flex-1 overflow-hidden">
        <div class="intel-marquee flex items-center gap-12 whitespace-nowrap">
          <span v-for="(name, i) in [...clients, ...clients]" :key="i" class="text-[0.8125rem] tracking-wide" style="font-family: var(--font); color: var(--color-text-muted);">
            {{ name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const clients = [
  'The Agency — Broome County IDA / LDC',
  'RKC Architecture & Design',
  'A|X Armani Exchange',
  'Southern Tier 8 Regional Board',
  'Eljin Construction',
  'Water From Rain',
  'Broome is Good',
]
</script>

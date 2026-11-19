<template>
  <section ref="root" class="border-t border-[var(--color-border)] px-5 md:px-6 py-16 md:py-28">
    <div class="hue-container">
      <p class="hue-marginalia mb-4">02 / Engagement</p>
      <h2 class="hue-display-lg mb-10 md:mb-14">Three ways to begin.</h2>
      <div class="grid pl-px pt-px md:grid-cols-3">
        <NuxtLink
          v-for="t in tiers"
          :key="t.id"
          to="/contact"
          class="tier-card group -ml-px -mt-px flex flex-col border border-[var(--color-border)] bg-white p-7 md:p-9 transition-colors hover:bg-[var(--snow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          @click="trackCtaClick(`Tier: ${t.name}`, 'homepage_tiers')"
        >
          <p class="hue-marginalia mb-6">From {{ t.price }}</p>
          <h3 class="mb-2 text-[1.5rem] font-medium leading-tight text-[var(--near-black)]">{{ t.name }}</h3>
          <p class="mb-6 text-[0.9375rem] text-[var(--dark-grey)]">{{ t.tagline }}</p>
          <ul class="mb-8 space-y-2 border-t border-[var(--color-border)] pt-5 text-[0.875rem] text-[var(--near-black)]">
            <li v-for="d in t.deliverables" :key="d">{{ d }}</li>
          </ul>
          <span class="mt-auto inline-flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-all group-hover:gap-3 group-hover:text-[var(--accent)]">
            Start a conversation
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { packages } from '~/data/services'
const { trackCtaClick } = useTracking()
const tiers = packages.map(p => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  price: p.price.replace(/,000$/, 'k') + '+',
  deliverables: p.groups.map(g => g.title).slice(0, 4),
}))
const root = ref<HTMLElement | null>(null)
const { reveal } = useEditorialMotion(root)
onMounted(() => reveal('.tier-card', { stagger: 0.12 }))
</script>

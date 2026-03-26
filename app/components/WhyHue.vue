<template>
  <section class="border-y border-[var(--silk)] bg-[var(--near-black)] px-6 py-20">
    <div class="hue-container">
      <p class="mb-3 text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent-on-dark);">Why Hue</p>
      <h2 v-if="headline" class="mb-12 max-w-lg text-[1.75rem] font-light leading-tight text-white" style="font-family: var(--font-editorial);">
        {{ headline }}
      </h2>
      <h2 v-else class="mb-12 max-w-lg text-[1.75rem] font-light leading-tight text-white" style="font-family: var(--font-editorial);">
        Most agencies will tell you they've done comparable work. We'll show you we've done <em>this exact work.</em>
      </h2>

      <div class="grid gap-px overflow-hidden rounded-sm bg-white/6 md:grid-cols-3">
        <div v-for="(point, i) in points" :key="i" class="bg-[#111110] p-8">
          <p class="mb-4 text-[0.625rem] tracking-widest text-white/20">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="mb-3 text-[1.0625rem] text-white/90" style="font-family: var(--font-editorial);">{{ point.title }}</h3>
          <p class="text-[0.8125rem] leading-relaxed text-white/35">{{ point.body }}</p>
        </div>
      </div>

      <div v-if="showCta" class="mt-10 flex items-center gap-6">
        <NuxtLink to="/contact" class="inline-block rounded-sm border border-white/20 px-6 py-3 text-[0.6875rem] uppercase tracking-wider text-white/70 transition-colors hover:border-white/50 hover:text-white">
          Book a Strategy Session →
        </NuxtLink>
        <NuxtLink to="/about" class="text-[0.75rem] text-white/30 transition-colors hover:text-white/60">
          Learn more about us →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface WhyPoint {
  title: string
  body: string
}

const props = withDefaults(defineProps<{
  headline?: string
  variant?: 'default' | 'services' | 'industry'
  showCta?: boolean
}>(), {
  showCta: true,
  variant: 'default',
})

const defaultPoints: WhyPoint[] = [
  {
    title: 'Proven expertise — not analogous work.',
    body: 'We haven\'t done work like yours. We\'ve done your work — for the same type of clients, in the same industries, solving the same business problems. The portfolio isn\'t a pitch. It\'s proof.',
  },
  {
    title: 'End-to-end capability. Zero handoffs.',
    body: 'Brand strategy, creative direction, UX/UI, web development, SEO, print production, video — every competency lives in-house. You work directly with senior principals from kickoff through launch.',
  },
  {
    title: 'Built for business outcomes.',
    body: 'We measure success the same way you do — new clients, stronger positioning, higher-quality opportunities. Beautiful work that doesn\'t perform isn\'t work we\'re proud of.',
  },
]

const servicePoints: WhyPoint[] = [
  {
    title: 'Strategy first, always.',
    body: 'Every engagement starts with understanding your business, your audience, and the gap between where you are and where you need to be. Creative follows strategy — never the other way around.',
  },
  {
    title: 'Boutique by design.',
    body: 'You work directly with senior creatives — not handed off to a junior team. That\'s what boutique means to us: attention, accountability, and craft at every level of the engagement.',
  },
  {
    title: 'Fixed scope. No surprises.',
    body: 'Every project has a defined scope, timeline, and price before we start. Two revision rounds included. No hourly logs, no surprise invoices — one clear engagement from start to finish.',
  },
]

const industryPoints: WhyPoint[] = [
  {
    title: 'Deep sector fluency.',
    body: 'We don\'t learn your industry on your dime. We\'ve worked with organizations in your space for over a decade — we understand the audiences, the competitive landscape, and what moves the needle.',
  },
  {
    title: 'Brands that compete globally.',
    body: 'From government agencies and regional economic development to luxury construction and global fashion — we build identities that project credibility to the audiences that matter most.',
  },
  {
    title: 'Retained partnerships, not projects.',
    body: 'The majority of our clients are ongoing engagements. They continue to bring us new programs because we understand their ecosystem. For your organization, that sustained partnership is the model.',
  },
]

const points = computed(() => {
  switch (props.variant) {
    case 'services': return servicePoints
    case 'industry': return industryPoints
    default: return defaultPoints
  }
})
</script>

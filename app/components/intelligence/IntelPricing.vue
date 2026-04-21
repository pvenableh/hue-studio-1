<template>
  <section class="intel-section" style="background: var(--color-bg-alt);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">Investment</p>
      <h2 class="intel-h2 mb-3 reveal reveal-delay-1">Boutique quality. Accessible pricing.</h2>
      <p class="intel-body-lg mb-14 max-w-xl reveal reveal-delay-2">
        Three ways to start, all designed to deliver ROI before the third month.
      </p>

      <div class="grid gap-5 lg:grid-cols-3">
        <div
          v-for="(pkg, i) in packages"
          :key="pkg.name"
          class="intel-card relative flex flex-col reveal"
          :style="{
            transitionDelay: `${i * 80}ms`,
            borderColor: pkg.featured ? 'var(--color-accent)' : 'var(--color-border)',
          }"
        >
          <!-- Badge -->
          <span v-if="pkg.featured" class="intel-pill-gold absolute -top-3 left-6 !bg-black">Most Popular</span>

          <p class="intel-eyebrow mb-3" :style="{ color: pkg.featured ? 'var(--color-accent)' : 'var(--color-text-muted)' }">
            {{ pkg.name }}
          </p>

          <p class="mb-2 text-2xl font-light" style="font-family: var(--font); color: var(--color-text);">
            {{ pkg.price }}
          </p>
          <p class="intel-body-sm mb-6">{{ pkg.description }}</p>

          <ul class="mb-8 flex flex-1 flex-col gap-3">
            <li v-for="item in pkg.includes" :key="item" class="flex items-start gap-2.5">
              <Icon name="lucide:check" class="mt-0.5 size-3.5 shrink-0" style="color: var(--color-accent);" />
              <span class="intel-body-sm" style="color: var(--color-text);">{{ item }}</span>
            </li>
          </ul>

          <a
            href="#contact"
            :class="pkg.featured ? 'intel-btn-gold w-full justify-center' : 'intel-btn-outline-gold w-full justify-center'"
          >
            {{ pkg.cta }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const packages = [
  {
    name: 'AI Starter',
    price: 'From $1,500',
    description: 'The fastest path to your first win.',
    includes: [
      'AI Readiness Audit',
      'One quick-win automation',
      '30-day support',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'AI Essentials',
    price: 'From $4,500',
    description: 'Foundation + intelligence, end to end.',
    includes: [
      'Directus setup',
      'AI Insight Assistant',
      'Two automation workflows',
      'Staff onboarding',
    ],
    cta: 'Most popular',
    featured: true,
  },
  {
    name: 'AI Partner',
    price: 'From $8,000 + retainer',
    description: 'Full platform + ongoing evolution.',
    includes: [
      'Custom AI dashboard',
      'Full workflow suite',
      'Monthly AI Operations Retainer',
    ],
    cta: "Let's talk",
    featured: false,
  },
]
</script>

<template>
  <div v-if="svc">
    <div class="border-b border-[var(--silk)] bg-white px-2 md:px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/creative-services" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" /> All Services
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="grid border-b border-[var(--silk)] lg:grid-cols-2">
      <div class="px-8 py-16 lg:px-14 lg:py-20">
        <p class="hue-label mb-4">Service</p>
        <h1 class="hue-display-lg mb-4">{{ svc.name }}</h1>
        <p class="hue-editorial-md mb-8">{{ svc.tagline }}</p>
        <p class="hue-body-lg max-w-lg">{{ svc.intro }}</p>
        <div class="mt-10 flex gap-4">
          <NuxtLink to="/contact" class="hue-btn">Book a Session <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
          <NuxtLink to="/portfolio" class="hue-btn-outline">See Portfolio <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
      <div class="bg-[var(--near-black)] px-10 py-16 lg:px-12">
        <p class="hue-label-sm mb-5 text-white/30">In their words</p>
        <p class="hue-editorial-lg mb-10 italic text-white/70">"{{ svc.heroQuote }}"</p>
        <div class="space-y-3 border-t border-white/10 pt-8">
          <div class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Timeline</span>
            <span class="text-[0.8125rem] text-white/60">{{ svc.timeline }}</span>
          </div>
          <div class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Engagement</span>
            <span class="text-[0.8125rem] text-white/60">{{ svc.engagementType }}</span>
          </div>
          <div class="flex justify-between">
            <span class="hue-label-sm text-white/30">Industries</span>
            <span class="text-[0.8125rem] text-white/60">{{ svc.industries.length }} sectors</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Deliverables -->
    <section class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-10">What's included</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(group, i) in svc.deliverables" :key="group.label" class="bg-white p-8">
            <span class="hue-label-sm text-[var(--silver)]">{{ String.fromCharCode(65 + i) }}</span>
            <h3 class="mt-3 mb-4 text-[1rem] font-medium">{{ group.label }}</h3>
            <ul class="space-y-2">
              <li v-for="item in group.items" :key="item" class="flex items-start gap-2.5 text-[0.8125rem] text-[var(--color-text-secondary)]">
                <span class="mt-2 block h-px w-3 shrink-0 bg-[var(--silver)]" />{{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Who it's for -->
    <section class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-10">Who it's for</p>
        <div class="grid gap-5 md:grid-cols-3">
          <div
            v-for="item in svc.bestFor"
            :key="item.title"
            class="hue-card p-7"
            :class="{ 'border-[var(--near-black)]': item.highlighted }"
          >
            <span class="hue-label-sm mb-3 block" :class="item.highlighted ? 'text-[var(--near-black)]' : 'text-[var(--silver)]'">{{ item.tag }}</span>
            <h3 class="mb-3 text-[1rem] font-medium">{{ item.title }}</h3>
            <p class="text-[0.8125rem] leading-relaxed text-[var(--color-text-muted)]">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-10">The process</p>
        <div class="space-y-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)]">
          <div v-for="step in svc.process" :key="step.num" class="grid bg-white px-8 py-7 lg:grid-cols-[60px_200px_1fr]">
            <span class="font-light text-[1.75rem] text-[var(--silk)]">{{ step.num }}</span>
            <div>
              <p class="font-medium">{{ step.title }}</p>
              <p class="hue-label-sm mt-1 text-[var(--silver)]">{{ step.duration }}</p>
            </div>
            <p class="mt-3 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)] lg:mt-0">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries cross-link -->
    <section class="hue-section-alt px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">We deliver this for</p>
          <NuxtLink
            v-for="ind in svc.industries"
            :key="ind"
            :to="`/industries/${indSlug(ind)}`"
            class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ ind }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Related portfolio -->
    <section class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Related work</p>
          <NuxtLink to="/portfolio" class="hue-link text-[0.8125rem]">All portfolio <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>

        <div v-if="relatedPending" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-3">
          <div v-for="i in 3" :key="i" class="h-64 animate-pulse bg-[var(--cloud)]" />
        </div>

        <div v-else-if="relatedProjects.length" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-3">
          <NuxtLink
            v-for="item in relatedProjects"
            :key="item.id"
            :to="`/portfolio/${item.slug || item.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div class="relative flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img
                v-if="relatedImgUrl(item)"
                :src="relatedImgUrl(item)"
                :alt="item.name"
                class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-white">
                <span class="hue-label-sm">{{ item.client?.short_name || item.name }}</span>
              </div>
            </div>
            <div class="p-6">
              <span class="hue-label-sm" style="color: var(--color-accent);">{{ item.service?.name }}</span>
              <h3 class="mt-2 text-[1rem] font-light transition-transform duration-300 group-hover:translate-x-1">{{ item.name }}</h3>
              <p v-if="item.client" class="mt-1 text-[0.8125rem] text-[var(--color-text-muted)]">{{ item.client.name }}</p>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="rounded-sm border border-[var(--silk)] bg-[var(--snow)] py-16 text-center">
          <p class="hue-editorial-md">Portfolio for this service coming soon.</p>
          <NuxtLink to="/portfolio" class="hue-link mt-4 inline-flex">Browse all work <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="hue-section-dark px-2 md:px-6 py-24 text-center">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-5 text-white">
          Ready to build a brand that
          <span style="font-family:var(--font-editorial);font-style:italic;">opens doors</span>?
        </h2>
        <p class="mb-8 text-[0.9375rem] text-white/40">30-minute strategy session. No pitch decks.</p>
        <NuxtLink to="/contact" class="hue-btn-ghost">
          Book a Strategy Session <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'
import { getServiceBySlug } from '~/data/services'
import { industries } from '~/data/industries'

const route = useRoute()
const svc = getServiceBySlug(route.params.slug as string)

if (!svc) throw createError({ statusCode: 404, statusMessage: 'Service not found' })

const { fetchPortfolio, assetUrl } = useDirectus()

// Fetch portfolio items and filter to this service
const { data: allItems, pending: relatedPending } = await useAsyncData(
  `service-portfolio-${svc.slug}`,
  () => fetchPortfolio({ limit: 100 })
)

const relatedProjects = computed(() => {
  const svcName = svc!.name.toLowerCase()
  // Extract individual significant words (3+ chars) for loose matching
  const svcWords = svcName.split(/[\s,/&]+/).map(w => w.trim()).filter(w => w.length >= 3)
  return (allItems.value ?? []).filter((p) => {
    const portfolioSvc = (p.service?.name ?? '').toLowerCase()
    const portfolioWords = portfolioSvc.split(/[\s,/&]+/).map(w => w.trim()).filter(w => w.length >= 3)
    // Match if any significant word from either side shares a common root (startsWith check handles brand/branding, event/events)
    return svcWords.some((sw) => portfolioWords.some((pw) => sw.startsWith(pw) || pw.startsWith(sw)))
  }).slice(0, 6)
})

function relatedImgUrl(item: DirectusPortfolioItem) {
  const id = item.featured_image ?? item.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'medium-contain') : null
}

function indSlug(name: string) {
  return industries.find((i) => i.name.includes(name.split('&')[0].trim()))?.slug ?? ''
}

useSeoMeta({
  title: `${svc.name} | Creative Services | Hue Creative Agency`,
  description: svc.intro,
})

defineOgImage({ component: 'HueOg', props: { title: svc.name, description: svc.tagline, label: 'Services' } })
</script>

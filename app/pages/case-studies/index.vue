<template>
  <div>
    <section class="hue-section relative overflow-hidden px-2 md:px-6 pb-16 pt-24 md:pt-32">
      <SectionWatermark word="Stories" top="1rem" />
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
        <!-- Loading -->
        <div v-if="pending" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2">
          <div v-for="i in 4" :key="i" class="h-80 animate-pulse bg-[var(--cloud)]" />
        </div>

        <!-- Case studies -->
        <div v-else-if="caseStudyList.length" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2">
          <NuxtLink
            v-for="(cs, i) in caseStudyList"
            :key="cs.id"
            :to="`/case-studies/${cs.url}`"
            class="group flex flex-col justify-between bg-white p-8 transition-colors hover:bg-[var(--snow)] md:p-10 reveal"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
            <div>
              <div class="mb-5 flex items-center justify-between">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="svc in cs.services?.slice(0,2)"
                    :key="svc.services_id?.id"
                    class="hue-label-sm"
                  >{{ svc.services_id?.name }}</span>
                </div>
                <!-- <span class="hue-label-sm text-[var(--silver)]">{{ cs.project_year }}</span> -->
              </div>

              <!-- Image: featured_image → logo portfolio item → first portfolio item image -->
              <div v-if="cardImage(cs)" class="mb-5 flex items-center justify-center overflow-hidden rounded-lg bg-white" style="aspect-ratio:16/9;">
                <img
                  :src="cardImage(cs)!"
                  :alt="cs.title ?? ''"
                  class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  :loading="i < 2 ? 'eager' : 'lazy'"
                />
              </div>

              <h2 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em] mb-2 transition-transform duration-300 group-hover:translate-x-1">{{ cs.title }}</h2>
              <p v-if="cs.organization || cs.client" class="mb-3 text-[0.75rem] text-[var(--color-text-muted)]">
                {{ cs.organization?.name ?? cs.client }}
              </p>
              <p v-if="cs.excerpt" class="font-sans text-[0.75rem] font-light leading-snug text-[var(--grey)] line-clamp-3">{{ cs.excerpt }}</p>
            </div>

            <div class="mt-8 flex items-center justify-between">
              <div v-if="cs.tags?.length" class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in cs.tags.slice(0,3)"
                  :key="tag"
                  class="rounded-full border border-[var(--silk)] px-2.5 py-0.5 text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-[var(--silver)]"
                >{{ tag }}</span>
              </div>
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--silk)] transition-all duration-300 group-hover:border-[var(--near-black)] group-hover:bg-[var(--near-black)]">
                <Icon name="lucide:arrow-right" class="size-3.5 text-[var(--silver)] transition-colors group-hover:text-white" />
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Fallback -->
        <div v-else-if="!pending" class="rounded-sm border border-[var(--silk)] bg-[var(--snow)] py-20 text-center">
          <p class="hue-editorial-md mb-4">Case studies coming soon.</p>
          <NuxtLink to="/portfolio" class="hue-link inline-flex">Browse the full portfolio <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- Editorial break -->
    <section class="hue-section-alt px-2 md:px-6 py-20 text-center">
      <div class="hue-container-sm">
        <p class="hue-pullquote reveal">Every project starts with<br class="hidden md:block"> understanding why.</p>
        <p class="mt-6 hue-body reveal reveal-delay-1">Our rationale-first process ensures every deliverable is purposeful, aligned, and built to perform.</p>
      </div>
    </section>

    <!-- Brand audit -->
    <section class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <span class="inline-flex items-center rounded-full bg-[var(--near-black)] px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider text-white">Free</span>
              <p class="hue-label-sm">Brand Perception Audit</p>
            </div>
            <p class="max-w-md hue-body">See where your brand stands before your next project. 10 questions, a custom presentation in 5 days.</p>
          </div>
          <NuxtLink to="/brand-audit" class="hue-link shrink-0">Start Free Audit <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
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
import type { DirectusCaseStudy } from '~/composables/useDirectus'

useSeoMeta({
  title: 'Case Studies | B2B Branding & Lead Generation | Hue Creative Agency',
  description: 'Explore our case studies in brand strategy, website design, and lead generation for government, architecture, real estate, technology, and professional services.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Case Studies', description: 'Deep dives into strategy, execution, and measurable outcomes.', label: 'Case Studies' } })

const { fetchCaseStudies, assetUrl } = useDirectus()

const { data: caseStudies, pending } = await useAsyncData('case-studies', () => fetchCaseStudies({ limit: 50 }))

const caseStudyList = computed(() => caseStudies.value ?? [])

/** Smart image fallback: featured_image → logo portfolio item → first portfolio item image */
function cardImage(cs: DirectusCaseStudy): string | null {
  // 1. Case study's own featured image
  if (cs.featured_image) return assetUrl(cs.featured_image, 'medium-contain')

  // 2. Find the logo/branding portfolio item's featured image
  const portfolioItems = cs.portfolio_items ?? []
  const logoItem = portfolioItems.find((pi) =>
    pi.portfolio_id?.service?.name?.toLowerCase().includes('brand') && pi.portfolio_id?.featured_image
  )
  if (logoItem?.portfolio_id?.featured_image) {
    return assetUrl(logoItem.portfolio_id.featured_image, 'medium-contain')
  }

  // 3. Any portfolio item with a featured image
  const anyWithImage = portfolioItems.find((pi) => pi.portfolio_id?.featured_image)
  if (anyWithImage?.portfolio_id?.featured_image) {
    return assetUrl(anyWithImage.portfolio_id.featured_image, 'medium-contain')
  }

  // 4. First portfolio item's first gallery image
  const anyWithGallery = portfolioItems.find((pi) => pi.portfolio_id?.images?.length)
  if (anyWithGallery?.portfolio_id?.images?.[0]?.directus_files_id) {
    return assetUrl(anyWithGallery.portfolio_id.images[0].directus_files_id, 'medium-contain')
  }

  // 5. Check child projects of linked portfolio items
  for (const pi of portfolioItems) {
    const projects = (pi.portfolio_id as any)?.projects ?? []
    for (const child of projects) {
      const childId = child.featured_image ?? child.images?.[0]?.directus_files_id
      if (childId) return assetUrl(childId, 'medium-contain')
    }
  }

  return null
}

useScrollReveal()
</script>

<template>
  <div>
    <section class="hue-section px-6 pb-16 pt-24 md:pt-32">
      <div class="hue-container">
        <p class="hue-label mb-4">Case Studies</p>
        <h1 class="hue-display-xl mb-5">
          Work that
          <span style="font-family:var(--font-editorial);font-style:italic;">performs</span>.
        </h1>
        <p class="hue-body max-w-lg">Every project starts with understanding why. Our rationale-first process ensures every deliverable is purposeful, aligned, and built to perform.</p>
      </div>
    </section>

    <!-- Service filter -->
    <div class="sticky top-[112px] z-40 border-b border-[var(--silk)] bg-white/90 px-6 backdrop-blur-md">
      <div class="hue-container overflow-x-auto py-3">
        <div class="flex min-w-max gap-1.5">
          <button
            v-for="f in serviceFilters"
            :key="f"
            class="rounded-full border px-3.5 py-1.5 text-[0.75rem] transition-all"
            :class="activeFilter === f
              ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
              : 'border-[var(--silk)] text-[var(--grey)] hover:border-[var(--silver)] hover:text-[var(--near-black)]'"
            @click="activeFilter = f"
          >{{ f }}</button>
        </div>
      </div>
    </div>

    <section class="hue-section px-6 pb-24 pt-10">
      <div class="hue-container">
        <!-- Loading -->
        <div v-if="pending" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2">
          <div v-for="i in 4" :key="i" class="h-80 animate-pulse bg-[var(--cloud)]" />
        </div>

        <!-- Case studies from dedicated collection -->
        <div v-else-if="caseStudies.length" class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2">
          <NuxtLink
            v-for="(cs, i) in filtered"
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
                <span class="hue-label-sm text-[var(--silver)]">{{ cs.project_year }}</span>
              </div>

              <!-- Featured image thumbnail -->
              <div v-if="cs.featured_image" class="mb-5 overflow-hidden rounded-lg bg-white" style="aspect-ratio:16/9;">
                <img
                  :src="assetUrl(cs.featured_image, { width: 700, quality: 80 })"
                  :alt="cs.title ?? ''"
                  class="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  :loading="i < 2 ? 'eager' : 'lazy'"
                />
              </div>

              <h2 class="hue-display-md mb-2 transition-transform duration-300 group-hover:translate-x-1">{{ cs.title }}</h2>
              <p v-if="cs.organization || cs.client" class="mb-4 text-[0.8125rem] text-[var(--color-text-muted)]">
                {{ cs.organization?.name ?? cs.client }}
              </p>
              <p v-if="cs.excerpt" class="hue-editorial-md line-clamp-3">{{ cs.excerpt }}</p>
            </div>

            <div class="mt-8 flex items-center justify-between">
              <div v-if="cs.tags?.length" class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in cs.tags.slice(0,3)"
                  :key="tag"
                  class="rounded-full border border-[var(--silk)] px-2 py-0.5 text-[0.7rem] text-[var(--silver)]"
                >{{ tag }}</span>
              </div>
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--silk)] transition-all duration-300 group-hover:border-[var(--near-black)] group-hover:bg-[var(--near-black)]">
                <Icon name="lucide:arrow-right" class="size-3.5 text-[var(--silver)] transition-colors group-hover:text-white" />
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Fallback: portfolio items if no case_studies exist yet -->
        <div v-else-if="!pending" class="rounded-sm border border-[var(--silk)] bg-[var(--snow)] py-20 text-center">
          <p class="hue-editorial-md mb-4">Case studies coming soon.</p>
          <NuxtLink to="/portfolio" class="hue-link inline-flex">Browse the full portfolio <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- Editorial break -->
    <section class="hue-section-alt px-6 py-20 text-center">
      <div class="hue-container-sm">
        <p class="hue-pullquote reveal">Every project starts with<br class="hidden md:block"> understanding why.</p>
        <p class="mt-6 hue-body reveal reveal-delay-1">Our rationale-first process ensures every deliverable is purposeful, aligned, and built to perform.</p>
      </div>
    </section>

    <!-- Brand audit -->
    <section class="hue-section px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <span class="inline-flex items-center rounded-full bg-[var(--near-black)] px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider text-white">Free</span>
              <p class="hue-label-sm">Brand Perception Audit</p>
            </div>
            <p class="max-w-md hue-body">See where your brand stands before your next project. 8 questions, a custom presentation in 5 days.</p>
          </div>
          <NuxtLink to="/brand-audit" class="hue-link shrink-0">Start Free Audit <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <section class="hue-section-dark px-6 py-28 text-center md:py-36">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-6 reveal text-white">Your Project Could<br>Be Next</h2>
        <p class="mb-10 text-[0.9375rem] leading-relaxed text-white/45 reveal reveal-delay-1">Let's discuss your brand, your market, and what success looks like.</p>
        <NuxtLink to="/contact" class="hue-btn-ghost">Schedule a Discovery Call</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Case Studies | B2B Branding & Lead Generation | Hue Creative Agency',
  description: 'Explore our B2B case studies in brand strategy, website design, and lead generation for architecture, real estate, technology, and professional services.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Case Studies', description: 'Deep dives into strategy, execution, and measurable outcomes.', label: 'Case Studies' } })

const { fetchCaseStudies, assetUrl } = useDirectus()

const { data: caseStudies, pending } = await useAsyncData('case-studies', () => fetchCaseStudies({ limit: 50 }))

const serviceFilters = computed(() => {
  const s = new Set(['All'])
  ;(caseStudies.value ?? []).forEach((cs) =>
    cs.services?.forEach((sv) => { if (sv.services_id?.name) s.add(sv.services_id.name) })
  )
  return [...s]
})

const activeFilter = ref('All')

const filtered = computed(() => {
  if (activeFilter.value === 'All') return caseStudies.value ?? []
  return (caseStudies.value ?? []).filter((cs) =>
    cs.services?.some((sv) => sv.services_id?.name === activeFilter.value)
  )
})

useScrollReveal()
</script>

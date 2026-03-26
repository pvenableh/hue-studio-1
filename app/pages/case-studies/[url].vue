<template>
  <div v-if="cs">
    <div class="border-b border-[var(--silk)] bg-white px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/case-studies" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" /> All Case Studies
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="grid border-b border-[var(--silk)] lg:grid-cols-2">
      <div class="px-8 py-16 lg:px-14 lg:py-20">
        <div class="mb-4 flex flex-wrap gap-2">
          <span v-for="svc in cs.services" :key="svc.services_id?.id" class="hue-label">{{ svc.services_id?.name }}</span>
        </div>
        <h1 class="hue-display-lg mb-5">{{ cs.title }}</h1>
        <p v-if="cs.organization?.name || cs.client" class="mb-5 text-[0.9rem] text-[var(--grey)]">
          {{ cs.organization?.name ?? cs.client }}
        </p>
        <p v-if="cs.excerpt" class="hue-body-lg max-w-lg">{{ cs.excerpt }}</p>
      </div>
      <div class="bg-[var(--near-black)] px-10 py-16 lg:px-12">
        <p class="hue-label-sm mb-5 text-white/30">Project details</p>
        <div class="space-y-3">
          <div v-if="cs.project_year" class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Year</span>
            <span class="text-[0.8125rem] text-white/60">{{ cs.project_year }}</span>
          </div>
          <div v-if="cs.project_duration" class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Duration</span>
            <span class="text-[0.8125rem] text-white/60">{{ cs.project_duration }}</span>
          </div>
          <div v-if="cs.tags?.length" class="pt-2">
            <span class="hue-label-sm text-white/30 mb-3 block">Tags</span>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in cs.tags" :key="tag" class="rounded-full border border-white/10 px-2.5 py-0.5 text-[0.7rem] text-white/40">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured image -->
    <section v-if="cs.featured_image" class="border-b border-[var(--silk)]">
      <img
        :src="assetUrl(cs.featured_image, { width: 1400, height: 700, fit: 'cover', quality: 85 })"
        :alt="cs.title ?? ''"
        class="w-full object-cover"
        style="max-height: 60vh;"
      />
    </section>

    <!-- Challenge / Solution / Results -->
    <section class="hue-section px-6 py-20">
      <div class="hue-container space-y-16">
        <div v-if="cs.challenge" class="grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <span class="hue-label-sm text-[var(--silver)]">01</span>
            <p class="hue-label mt-1">The Challenge</p>
          </div>
          <div class="hue-body-lg max-w-2xl" v-html="cs.challenge" />
        </div>

        <div v-if="cs.solution" class="grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <span class="hue-label-sm text-[var(--silver)]">02</span>
            <p class="hue-label mt-1">Our Approach</p>
          </div>
          <div class="hue-body-lg max-w-2xl" v-html="cs.solution" />
        </div>

        <div v-if="cs.results" class="grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <span class="hue-label-sm text-[var(--silver)]">03</span>
            <p class="hue-label mt-1">The Results</p>
          </div>
          <div class="rounded-sm border border-[var(--silk)] bg-[var(--snow)] p-8">
            <div class="hue-body-lg max-w-2xl" v-html="cs.results" />
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section v-if="cs.gallery?.length" class="border-t border-[var(--silk)] px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Gallery</p>
        <div
          class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)]"
          :class="cs.gallery.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
          <img
            v-for="(img, i) in cs.gallery"
            :key="img.directus_files_id"
            :src="assetUrl(img.directus_files_id, { width: 700, height: 500, fit: 'cover', quality: 80 })"
            :alt="`${cs.title} — image ${i + 1}`"
            class="w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Related portfolio cross-link -->
    <section class="hue-section-alt px-6 py-16">
      <div class="hue-container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p class="hue-label mb-2">See the full work</p>
          <p class="hue-body max-w-md">Browse all portfolio items including visual work, project images, and process shots.</p>
        </div>
        <NuxtLink to="/portfolio" class="hue-btn-outline shrink-0">
          View Portfolio <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>

    <!-- CTA -->
    <section class="hue-section-dark px-6 py-24 text-center">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-5 text-white">Start your project.</h2>
        <p class="mb-8 text-[0.9375rem] text-white/40">30-minute discovery call. No obligations.</p>
        <NuxtLink to="/contact" class="hue-btn-ghost">
          Schedule a Call <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>
  </div>

  <div v-else class="flex min-h-[60vh] items-center justify-center text-center">
    <div>
      <h1 class="hue-display-lg mb-4">Case Study Not Found</h1>
      <NuxtLink to="/case-studies" class="hue-link">← All Case Studies</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const url = route.params.url as string
const { fetchCaseStudyByUrl, assetUrl } = useDirectus()

const { data: cs } = await useAsyncData(`case-study-${url}`, () => fetchCaseStudyByUrl(url))

if (!cs.value) throw createError({ statusCode: 404, statusMessage: 'Case study not found' })

useSeoMeta({
  title: `${cs.value?.title ?? 'Case Study'} | Hue Creative Agency`,
  description: cs.value?.excerpt ?? 'A case study by Hue Creative Agency.',
})
</script>

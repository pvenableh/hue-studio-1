<template>
  <div v-if="item">
    <!-- Back -->
    <div class="border-b border-[var(--silk)] bg-white px-2 md:px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/portfolio" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" />
          Back to <span style="color: var(--color-accent);">All Work</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="grid border-b border-[var(--silk)] lg:grid-cols-[1fr_380px]">
      <div class="px-8 py-16 lg:px-14 lg:py-20">
        <p class="hue-label-sm mb-4" style="color: var(--color-accent);">{{ item.service?.name }}{{ industryLabel ? ` · ${industryLabel}` : '' }}</p>
        <h1 class="hue-display-lg mb-5">{{ item.name }}</h1>
        <p v-if="item.description" class="hue-body-lg max-w-lg text-[var(--grey)]" v-html="item.description" />
        <p v-else-if="item.synopsis" class="hue-body-lg max-w-lg text-[var(--grey)]" v-html="item.synopsis" />
      </div>

      <!-- Meta card -->
      <div class="border-l border-[var(--silk)] bg-white p-8 lg:self-start lg:mt-2">
        <div v-if="item.client" class="border-b border-[var(--silk)] pb-4 mb-4">
          <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Client</p>
          <p class="text-[0.875rem]">{{ item.client.name }}</p>
        </div>
        <div v-for="ind in validIndustries" :key="ind.id" class="border-b border-[var(--silk)] pb-4 mb-4">
          <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Industry</p>
          <NuxtLink :to="`/industries/${ind.url}`" class="text-[0.875rem] hover:text-[var(--color-accent)]">
            {{ ind.name }}
          </NuxtLink>
        </div>
        <div v-if="item.service" class="border-b border-[var(--silk)] pb-4 mb-4">
          <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Services</p>
          <div class="flex flex-wrap gap-1.5">
            <span class="rounded-sm bg-[var(--color-accent-tint)] px-2.5 py-1 text-[0.625rem] tracking-wider" style="color: var(--color-accent);">{{ item.service.name }}</span>
            <template v-if="childServices.length">
              <span v-for="svc in childServices" :key="svc" class="rounded-sm bg-[var(--color-accent-tint)] px-2.5 py-1 text-[0.625rem] tracking-wider" style="color: var(--color-accent);">{{ svc }}</span>
            </template>
          </div>
        </div>
        <!-- Year and duration hidden until data is updated -->
        <!-- <div v-if="item.project_year || item.project_duration" class="flex gap-8">
          <div v-if="item.project_year">
            <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Year</p>
            <p class="text-[0.875rem]">{{ item.project_year }}</p>
          </div>
          <div v-if="item.project_duration">
            <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Duration</p>
            <p class="text-[0.875rem]">{{ item.project_duration }}</p>
          </div>
        </div> -->
      </div>
    </section>

    <!-- Featured image -->
    <section v-if="item.featured_image" class="border-b border-[var(--silk)]">
      <img
        :src="assetUrl(item.featured_image, { width: 1400, height: 700, fit: 'cover', quality: 85 })"
        :alt="item.name"
        class="w-full object-cover"
        style="max-height: 60vh;"
      />
    </section>

    <!-- Challenge -->
    <section v-if="item.challenge" class="hue-section border-b border-[var(--silk)] px-2 md:px-6 py-20">
      <div class="hue-container grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <span class="text-[0.625rem] tracking-widest text-[var(--silk)]">01</span>
          <p class="hue-label mt-1">The Challenge</p>
        </div>
        <div>
          <div class="hue-body-lg max-w-2xl" v-html="item.challenge" />
        </div>
      </div>
    </section>

    <!-- Creation / Process -->
    <section v-if="item.creation" class="hue-section border-b border-[var(--silk)] px-2 md:px-6 py-20">
      <div class="hue-container grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <span class="text-[0.625rem] tracking-widest text-[var(--silk)]">02</span>
          <p class="hue-label mt-1">Our Approach</p>
        </div>
        <div>
          <div class="hue-body-lg max-w-2xl" v-html="item.creation" />
        </div>
      </div>
    </section>

    <!-- Before / After -->
    <section v-if="beforeAfters.length" class="border-b border-[var(--silk)] px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-8 flex items-end justify-between">
          <p class="text-[1.75rem] font-light" style="font-family:var(--font-editorial);">Before &amp; After</p>
          <p class="text-[0.8125rem] italic text-[var(--silver)]">Brand identity — logo system</p>
        </div>
        <div
          v-for="ba in beforeAfters"
          :key="ba.id"
          class="mb-4 grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2"
        >
          <div v-if="ba.before_image" class="bg-white">
            <div class="flex items-center gap-2.5 border-b border-[var(--silk)] px-2 md:px-6 py-3">
              <div class="h-2 w-2 rounded-full bg-[var(--silver)]" />
              <span class="hue-label-sm text-[var(--grey)]">Where they were</span>
            </div>
            <div class="flex items-center justify-center bg-white" style="aspect-ratio: 4/3;">
              <img :src="assetUrl(ba.before_image, { width: 700, quality: 80 })" class="max-h-full max-w-full object-contain p-8" loading="lazy" :alt="`${item?.name} — before`" />
            </div>
            <p v-if="ba.caption" class="border-t border-[var(--silk)] px-2 md:px-6 py-4 text-[0.8125rem] text-[var(--grey)]">{{ ba.caption }}</p>
          </div>
          <div v-if="ba.after_image" class="bg-white">
            <div class="flex items-center gap-2.5 border-b border-[var(--silk)] px-2 md:px-6 py-3">
              <div class="h-2 w-2 rounded-full" style="background: var(--color-accent);" />
              <span class="hue-label-sm" style="color: var(--color-accent);">Where they are now</span>
            </div>
            <div class="flex items-center justify-center bg-white" style="aspect-ratio: 4/3;">
              <img :src="assetUrl(ba.after_image, { width: 700, quality: 80 })" class="max-h-full max-w-full object-contain p-8" loading="lazy" :alt="`${item?.name} — after`" />
            </div>
            <p v-if="ba.title" class="border-t border-[var(--silk)] px-2 md:px-6 py-4 text-[0.8125rem] text-[var(--grey)]">{{ ba.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Image gallery -->
    <section v-if="galleryImages.length > 1" class="border-b border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Gallery</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)]"
          :class="galleryImages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
          <img
            v-for="(img, i) in galleryImages"
            :key="img.directus_files_id"
            :src="assetUrl(img.directus_files_id, { width: 700, height: 500, fit: 'cover', quality: 80 })"
            :alt="`${item.name} — image ${i + 1}`"
            class="w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Child projects -->
    <section v-if="item.projects?.length" class="border-b border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Project Deliverables</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="child in item.projects"
            :key="child.id"
            :to="`/portfolio/${child.slug || child.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div v-if="childImgUrl(child)" class="overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img :src="childImgUrl(child)!" :alt="child.name" class="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <div class="p-5">
              <p v-if="child.service?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ child.service.name }}</p>
              <h3 class="text-[0.9375rem] font-light">{{ child.name }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Results / Outcome -->
    <section v-if="item.results" class="bg-[var(--near-black)] px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="mb-5 text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent);">The Outcome</p>
        <div class="mb-10 max-w-lg text-[2.25rem] font-light leading-tight text-white" style="font-family:var(--font-editorial);" v-html="item.results" />
      </div>
    </section>

    <!-- Related industry -->
    <section v-if="validIndustries.length" class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container flex flex-wrap items-center gap-4">
        <p class="hue-label">More in this industry</p>
        <NuxtLink
          v-for="ind in validIndustries"
          :key="ind.id"
          :to="`/industries/${ind.url}`"
          class="hue-btn-outline text-[0.8125rem]"
        >
          {{ ind.name?.split('/')[0].trim() }} →
        </NuxtLink>
      </div>
    </section>

    <!-- CTA -->
    <!-- Inline capture -->
    <InlineCapture
      :dark="true"
      label="Start a Conversation"
      headline="Interested in similar results for your brand?"
      button-text="Send"
      :context="item.name ?? 'Case Study'"
    />

    <section class="px-2 md:px-6 py-20" style="background: var(--color-accent);">
      <div class="hue-container flex flex-col items-center justify-between gap-8 md:flex-row">
        <h2 class="text-[1.75rem] font-light text-white" style="font-family:var(--font-editorial);">
          Ready for your own<br><em>before &amp; after?</em>
        </h2>
        <NuxtLink to="/contact" class="inline-block rounded-sm border-[1.5px] border-white px-7 py-3.5 text-[0.6875rem] uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[var(--color-accent)]">
          Book a Strategy Session →
        </NuxtLink>
      </div>
    </section>
  </div>

  <div v-else class="flex min-h-[60vh] items-center justify-center text-center">
    <div>
      <h1 class="hue-display-lg mb-4">Project Not Found</h1>
      <NuxtLink to="/portfolio" class="hue-link">← All Work</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'

const route = useRoute()
const slug = route.params.slug as string
const { fetchPortfolioItem, assetUrl, resolvedBeforeAfters, primaryImageId, primaryIndustryName, stripHtml } = useDirectus()

const { data: item } = await useAsyncData(`portfolio-${slug}`, () => fetchPortfolioItem(slug))

if (!item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const validIndustries = computed(() =>
  (item.value?.industries ?? []).map((i) => i.industries_id).filter(Boolean)
)

const industryLabel = computed(() => primaryIndustryName(item.value!))

const galleryImages = computed(() => item.value?.images ?? [])

const beforeAfters = computed(() => item.value ? resolvedBeforeAfters(item.value) : [])

// Collect unique service names from child projects
const childServices = computed(() => {
  const parentService = item.value?.service?.name
  const names = new Set<string>()
  ;(item.value?.projects ?? []).forEach((child) => {
    if (child.service?.name && child.service.name !== parentService) {
      names.add(child.service.name)
    }
  })
  return [...names]
})

function childImgUrl(child: DirectusPortfolioItem) {
  const id = primaryImageId(child)
  return id ? assetUrl(id, { width: 500, height: 375, fit: 'cover', quality: 80 }) : null
}

const ogImg = computed(() => {
  const id = item.value ? primaryImageId(item.value) : null
  return id ? assetUrl(id, { width: 1200, height: 630, quality: 85 }) : null
})

const ogDesc = computed(() => item.value?.synopsis ? stripHtml(item.value.synopsis) : `Creative marketing project by Hue — ${item.value?.name}.`)

useSeoMeta({
  title: `${item.value?.name ?? 'Project'} | Portfolio | Hue`,
  description: ogDesc.value,
  ogImage: ogImg.value ?? undefined,
})

if (!ogImg.value) {
  defineOgImage({ component: 'HueOg', props: { title: item.value?.name ?? 'Project', description: ogDesc.value, label: 'Portfolio' } })
}
</script>

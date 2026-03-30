<template>
  <div v-if="item">
    <!-- Back -->
    <div class="bg-white px-4 md:px-6 py-2">
      <NuxtLink to="/portfolio" class="hue-link text-[0.6875rem] text-[var(--silver)]">
        <Icon name="lucide:arrow-left" class="size-3" /> All Work
      </NuxtLink>
    </div>

    <!-- Hero -->
    <section class="relative overflow-hidden px-2 md:px-6 py-16 lg:py-20">
      <span
        class="pointer-events-none absolute bottom-0 left-0 font-serif italic font-light text-[8rem] md:text-[14rem] lg:text-[20rem] leading-[0.7] opacity-[0.04] select-none translate-y-[0.15em]"
      >{{ item.client?.name?.split(' ')[0] || item.name?.split(' ')[0] }}</span>
      <div class="hue-container relative">
        <div class="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p class="hue-label mb-4">{{ item.service?.name }}{{ industryLabel ? ` · ${industryLabel}` : '' }}</p>
            <h1 class="mb-5 max-w-[14ch] uppercase tracking-[0.08em] leading-[0.95] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]" style="font-family: var(--font)">
              {{ item.name }}
            </h1>
            <p v-if="item.description" class="hue-body-lg max-w-lg text-[var(--grey)]" v-html="item.description" />
            <p v-else-if="item.synopsis" class="hue-body-lg max-w-lg text-[var(--grey)]" v-html="item.synopsis" />
          </div>

          <!-- Meta card -->
          <div class="space-y-4 lg:pt-10">
            <div v-if="item.client">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Client</p>
              <p class="text-[0.75rem] uppercase tracking-[0.1em]">{{ item.client.name }}</p>
            </div>
            <div v-for="ind in validIndustries" :key="ind.id">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Industry</p>
              <NuxtLink :to="`/industries/${ind.url}`" class="text-[0.875rem] hover:text-[var(--color-accent)]">
                {{ ind.name }}
              </NuxtLink>
            </div>
            <div v-if="item.service">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Services</p>
              <div class="flex flex-wrap gap-1.5">
                <span class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)]">{{ item.service.name }}</span>
                <template v-if="childServices.length">
                  <span v-for="svc in childServices" :key="svc" class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)]">{{ svc }}</span>
                </template>
              </div>
            </div>
            <!-- Year/duration hidden for now -->
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
        </div>
      </div>
    </section>

    <!-- Featured image -->
    <section v-if="item.featured_image" class="border-b border-[var(--silk)]">
      <img
        :src="assetUrl(item.featured_image, 'hero')"
        :alt="item.name"
        class="w-full object-cover"
        style="max-height: 60vh;"
      />
    </section>

    <!-- Challenge -->
    <section v-if="item.challenge" class="hue-section px-2 md:px-6 py-20">
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
    <section v-if="item.creation" class="hue-section px-2 md:px-6 py-20">
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

    <!-- Image gallery -->
    <section v-if="galleryImages.length > 1" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Gallery</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)]"
          :class="galleryImages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
          <img
            v-for="(img, i) in galleryImages"
            :key="img.directus_files_id"
            :src="assetUrl(img.directus_files_id, 'medium-contain')"
            :alt="`${item.name} — image ${i + 1}`"
            class="w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Child projects -->
    <section v-if="item.projects?.length" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Project Deliverables</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="child in item.projects"
            :key="child.id"
            :to="`/portfolio/${child.slug || child.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div v-if="childImgUrl(child)" class="flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img :src="childImgUrl(child)!" :alt="child.name" class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <div class="p-5">
              <p v-if="child.service?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ child.service.name }}</p>
              <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ child.name }}</h3>
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

    <!-- Before / After -->
    <section v-if="beforeAfters.length" class="px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-10">Before &amp; After</p>
        <div
          v-for="(ba, idx) in beforeAfters"
          :key="ba.id"
          class="mb-8"
        >
          <!-- Interactive slider -->
          <div
            v-if="ba.before_image && ba.after_image"
            :ref="(el) => { if (el) sliderRefs[idx] = el as HTMLElement }"
            class="group relative cursor-col-resize select-none overflow-hidden rounded-sm bg-[var(--snow)]"
            style="aspect-ratio: 16/9;"
            @mousedown.prevent="startDrag(idx, $event)"
            @touchstart.prevent="startDrag(idx, $event)"
          >
            <!-- After image (full background) -->
            <div class="absolute inset-0 flex items-center justify-center p-12 md:p-20">
              <img :src="assetUrl(ba.after_image, 'medium-contain')" class="max-h-[60%] max-w-[50%] object-contain" :alt="`${item?.name} — after`" />
            </div>

            <!-- Before image (clipped by slider) -->
            <div class="absolute inset-0 flex items-center justify-center p-12 md:p-20" :style="{ clipPath: `inset(0 ${100 - (sliderPositions[idx] ?? 50)}% 0 0)` }">
              <img :src="assetUrl(ba.before_image, 'medium-contain')" class="max-h-[60%] max-w-[50%] object-contain" :alt="`${item?.name} — before`" />
            </div>

            <!-- Slider handle -->
            <div class="absolute top-0 bottom-0 z-10 -ml-px w-[2px] bg-[var(--near-black)]/20 transition-colors group-hover:bg-[var(--near-black)]/40" :style="{ left: `${sliderPositions[idx] ?? 50}%` }">
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:scale-110">
                <Icon name="lucide:arrow-left-right" class="size-4 text-[var(--grey)]" />
              </div>
            </div>

            <!-- Labels -->
            <span class="absolute top-4 left-4 hue-label-sm text-[var(--grey)]">where it started</span>
            <span class="absolute top-4 right-4 hue-label-sm text-[var(--near-black)]">how it finished</span>
          </div>

          <!-- Fallback: side by side if only one image -->
          <div v-else class="grid gap-8 md:grid-cols-2">
            <div v-if="ba.before_image" class="flex items-center justify-center rounded-sm bg-[var(--snow)] p-12" style="aspect-ratio: 4/3;">
              <img :src="assetUrl(ba.before_image, 'medium-contain')" class="max-h-[50%] max-w-[50%] object-contain" :alt="`${item?.name} — before`" />
            </div>
            <div v-if="ba.after_image" class="flex items-center justify-center rounded-sm bg-[var(--snow)] p-12" style="aspect-ratio: 4/3;">
              <img :src="assetUrl(ba.after_image, 'medium-contain')" class="max-h-[50%] max-w-[50%] object-contain" :alt="`${item?.name} — after`" />
            </div>
          </div>

          <p v-if="ba.caption || ba.title" class="mt-4 text-[0.8125rem] text-[var(--grey)]">{{ ba.caption || ba.title }}</p>
        </div>
      </div>
    </section>

    <!-- Related industry -->
    <section v-if="validIndustries.length" class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">More in this industry</p>
          <NuxtLink
            v-for="ind in validIndustries"
            :key="ind.id"
            :to="`/industries/${ind.url}`"
            class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ ind.name }}</NuxtLink>
        </div>
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
const { trackBeforeAfterInteraction } = useAnalytics()
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

// Before/After slider
const sliderPositions = reactive<Record<number, number>>({})
const sliderRefs = reactive<Record<number, HTMLElement>>({})

const sliderTracked = new Set<number>()

function startDrag(idx: number, e: MouseEvent | TouchEvent) {
  const el = sliderRefs[idx]
  if (!el) return

  // Track once per before/after per page view
  if (!sliderTracked.has(idx)) {
    sliderTracked.add(idx)
    trackBeforeAfterInteraction(item.value?.name ?? 'Unknown', 'drag')
  }

  const updatePosition = (clientX: number) => {
    const rect = el.getBoundingClientRect()
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    sliderPositions[idx] = pct
  }

  const onMove = (ev: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX
    updatePosition(clientX)
  }

  const onUp = () => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onUp)
  }

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  updatePosition(clientX)

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchmove', onMove)
  window.addEventListener('touchend', onUp)
}

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
  return id ? assetUrl(id, 'medium-contain') : null
}

const ogImg = computed(() => {
  const id = item.value ? primaryImageId(item.value) : null
  return id ? assetUrl(id, 'large') : null
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

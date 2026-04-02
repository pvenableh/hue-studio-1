<template>
  <div v-if="item">
    <!-- Back -->
    <div class="bg-white px-2 py-2">
      <NuxtLink to="/portfolio" class="hue-link text-[0.6875rem] text-[var(--silver)]">
        <Icon name="lucide:arrow-left" class="size-3" /> All Work
      </NuxtLink>
    </div>

    <!-- Hero -->
    <section ref="heroRef" class="relative overflow-x-clip bg-white px-2 md:px-6 py-16 lg:py-20">
      <span
        ref="bgWordRef"
        class="pointer-events-none absolute bottom-0 left-0 font-serif italic font-light text-[8rem] md:text-[14rem] lg:text-[20rem] leading-[1] opacity-[0.04] select-none translate-y-[0.2em]"
      >{{ bgWord }}</span>
      <div class="hue-container relative">
        <div class="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p ref="heroLabel" class="hue-label mb-4">{{ item.service?.name }}{{ industryLabel ? ` · ${industryLabel}` : '' }}</p>
            <h1 ref="heroTitle" class="mb-5 max-w-[14ch] uppercase tracking-[0.08em] leading-[0.95] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]" style="font-family: var(--font)">
              {{ item.name }}
            </h1>
            <p v-if="item.description" class="hue-body-lg max-w-lg text-[var(--grey)]" v-html="item.description" />
            <p v-else-if="item.synopsis" class="hue-body-lg max-w-lg text-[var(--grey)]" v-html="item.synopsis" />
          </div>

          <!-- Meta card -->
          <div class="space-y-4 lg:pt-10">
            <div v-if="clientName">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Client</p>
              <p class="text-[0.75rem] uppercase tracking-[0.1em]">{{ clientName }}</p>
            </div>
            <div v-if="validIndustries.length">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">{{ validIndustries.length === 1 ? 'Industry' : 'Industries' }}</p>
              <div class="flex flex-wrap gap-x-3 gap-y-1">
                <NuxtLink
                  v-for="ind in validIndustries"
                  :key="ind.id"
                  :to="`/industries/${ind.url}`"
                  class="text-[0.75rem] uppercase tracking-[0.1em] hover:text-[var(--color-accent)]"
                >{{ ind.name }}</NuxtLink>
              </div>
            </div>
            <div v-if="item.service">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Services</p>
              <div class="flex flex-wrap gap-1.5">
                <NuxtLink v-if="item.service.url" :to="`/creative-services/${item.service.url}`" class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]">{{ item.service.name }}</NuxtLink>
                <span v-else class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)]">{{ item.service.name }}</span>
                <template v-if="childServices.length">
                  <span v-for="svc in childServices" :key="svc" class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)]">{{ svc }}</span>
                </template>
              </div>
            </div>
            <!-- Case study link -->
            <div v-if="linkedCaseStudy">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Case Study</p>
              <NuxtLink :to="`/case-studies/${linkedCaseStudy.url}`" class="text-[0.75rem] uppercase tracking-[0.1em] hover:text-[var(--color-accent)]">
                {{ linkedCaseStudy.title }} →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured image (only if item has featured_image set) -->
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
        <div class="hue-body-lg max-w-2xl" v-html="item.challenge" />
      </div>
    </section>

    <!-- Approach -->
    <section v-if="item.creation" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <span class="text-[0.625rem] tracking-widest text-[var(--silk)]">02</span>
          <p class="hue-label mt-1">Our Approach</p>
        </div>
        <div class="hue-body-lg max-w-2xl" v-html="item.creation" />
      </div>
    </section>

    <!-- Image gallery — hidden if item has videos -->
    <section v-if="allImages.length && !itemVideos.length" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <!-- Single image: full width -->
        <template v-if="allImages.length === 1">
          <p class="hue-label mb-8">Gallery</p>
          <div class="relative flex items-center justify-center overflow-hidden border border-black/[0.04] bg-white p-4 aspect-[4/3] md:aspect-[16/9] shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <img
              :src="assetUrl(allImages[0].directus_files_id, 'large-contain')"
              :alt="item.name"
              class="relative max-h-full max-w-full object-contain"
            />
          </div>
        </template>

        <!-- Multiple images: slideshow carousel -->
        <template v-else>
          <div class="mb-8 flex items-end justify-between">
            <p class="hue-label">Gallery</p>
            <div class="flex items-center gap-3">
              <span class="text-[0.625rem] tracking-[0.08em] text-[var(--silver)]">{{ galleryIndex + 1 }} / {{ allImages.length }}</span>
              <div class="flex gap-2">
                <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollGallery(-1)">
                  <Icon name="lucide:arrow-left" class="size-3.5" />
                </button>
                <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollGallery(1)">
                  <Icon name="lucide:arrow-right" class="size-3.5" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref="galleryCarouselRef"
            class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
            @scroll="onGalleryScroll"
            @mousedown.prevent="startCarouselDrag($event, galleryCarouselRef)"
          >
            <div
              v-for="(img, i) in allImages"
              :key="img.directus_files_id"
              class="relative w-full flex-none snap-start flex items-center justify-center overflow-hidden border border-black/[0.04] bg-white p-4 aspect-[4/3] md:aspect-[16/9] shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
            >
              <img
                :src="assetUrl(img.directus_files_id, 'large-contain')"
                :alt="`${item.name} — image ${i + 1}`"
                class="relative max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Videos -->
    <section v-if="itemVideos.length" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Video</p>
        <div :class="itemVideos.length === 1 ? '' : 'flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-2 px-2'">
          <div
            v-for="video in itemVideos"
            :key="video.id"
            :class="itemVideos.length === 1 ? 'w-full' : 'w-[85%] flex-none snap-start lg:w-[70%]'"
          >
            <div class="overflow-hidden rounded-sm" style="aspect-ratio: 16/9;">
              <iframe
                v-if="video.platform === 'youtube'"
                :src="`https://www.youtube.com/embed/${extractVideoId(video.link, 'youtube')}`"
                class="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <iframe
                v-else-if="video.platform === 'vimeo'"
                :src="`https://player.vimeo.com/video/${extractVideoId(video.link, 'vimeo')}`"
                class="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
              />
            </div>
            <p v-if="video.title" class="mt-3 text-[0.6875rem] font-medium uppercase tracking-[0.1em]">{{ video.title }}</p>
            <p v-if="video.description" class="mt-1 text-[0.625rem] uppercase tracking-[0.08em] text-[var(--grey)]">{{ video.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Child projects -->
    <section v-if="item.projects?.length" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Project Deliverables</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <component
            :is="child.url ? NuxtLink : 'div'"
            v-for="child in item.projects"
            :key="child.id"
            v-bind="child.url ? { to: `/portfolio/${child.url}` } : {}"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div v-if="childImgUrl(child)" class="flex items-center justify-center overflow-hidden bg-white p-8" style="aspect-ratio: 4/3;">
              <img :src="childImgUrl(child)!" :alt="child.name" class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <div class="p-5">
              <p v-if="child.service?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ child.service.name }}</p>
              <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ child.name }}</h3>
            </div>
          </component>
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

    <!-- Before / After — carousel if multiple -->
    <section v-if="beforeAfters.length" class="px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Before &amp; After</p>
          <div v-if="beforeAfters.length > 1" class="flex gap-2">
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollBaCarousel(-1)">
              <Icon name="lucide:arrow-left" class="size-3.5" />
            </button>
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollBaCarousel(1)">
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </button>
          </div>
        </div>
        <div ref="baCarouselRef" :class="['flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing', beforeAfters.length === 1 ? '' : '-mx-2 px-2']" @mousedown.prevent="startCarouselDrag($event, baCarouselRef)">
          <div
            v-for="(ba, idx) in beforeAfters"
            :key="ba.id"
            :class="beforeAfters.length === 1 ? 'snap-start w-full' : 'snap-start w-[85%] flex-none lg:w-[70%]'"
          >
            <div
              v-if="ba.before_image && ba.after_image"
              :ref="(el) => { if (el) sliderRefs[idx] = el as HTMLElement }"
              class="group relative cursor-col-resize select-none overflow-hidden rounded-sm bg-[var(--snow)]"
              style="aspect-ratio: 16/9;"
              @mousedown.prevent="startDrag(idx, $event)"
              @touchstart.prevent="startDrag(idx, $event)"
            >
              <!-- Before image (clipped to left of divider) -->
              <div class="absolute inset-0 flex items-center justify-center" :class="ba.is_logo ? 'p-12 md:p-20' : 'p-4 md:p-8'" :style="{ clipPath: `inset(0 ${100 - (sliderPositions[idx] ?? 50)}% 0 0)` }">
                <img :src="assetUrl(ba.before_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[60%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${item?.name} — before`" />
              </div>
              <!-- After image (clipped to right of divider) -->
              <div class="absolute inset-0 flex items-center justify-center" :class="ba.is_logo ? 'p-12 md:p-20' : 'p-4 md:p-8'" :style="{ clipPath: `inset(0 0 0 ${sliderPositions[idx] ?? 50}%)` }">
                <img :src="assetUrl(ba.after_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[60%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${item?.name} — after`" />
              </div>
              <div class="absolute top-0 bottom-0 z-10 -ml-px w-[2px] bg-[var(--near-black)]/20 transition-colors group-hover:bg-[var(--near-black)]/40" :style="{ left: `${sliderPositions[idx] ?? 50}%` }">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:scale-110">
                  <Icon name="lucide:arrow-left-right" class="size-4 text-[var(--grey)]" />
                </div>
              </div>
              <span class="absolute top-4 left-4 hue-label-sm text-[var(--grey)] transition-opacity duration-200" :style="{ opacity: (sliderPositions[idx] ?? 50) < 15 ? 0 : 1 }">where it started</span>
              <span class="absolute top-4 right-4 hue-label-sm text-[var(--near-black)] transition-opacity duration-200" :style="{ opacity: (sliderPositions[idx] ?? 50) > 85 ? 0 : 1 }">how it finished</span>
            </div>
            <div v-else class="grid gap-8 md:grid-cols-2">
              <div v-if="ba.before_image" class="flex items-center justify-center rounded-sm bg-[var(--snow)]" :class="ba.is_logo ? 'p-12' : 'p-4'" style="aspect-ratio: 4/3;">
                <img :src="assetUrl(ba.before_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[50%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${item?.name} — before`" />
              </div>
              <div v-if="ba.after_image" class="flex items-center justify-center rounded-sm bg-[var(--snow)]" :class="ba.is_logo ? 'p-12' : 'p-4'" style="aspect-ratio: 4/3;">
                <img :src="assetUrl(ba.after_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[50%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${item?.name} — after`" />
              </div>
            </div>
            <p v-if="ba.caption || ba.title" class="mt-4 text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--grey)]">{{ ba.caption || ba.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related work from same case study -->
    <section v-if="siblingProjects.length" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-8 flex items-end justify-between">
          <p class="hue-label">Related Work</p>
          <div v-if="siblingProjects.length > 3" class="flex gap-2">
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollRelatedCarousel(-1)">
              <Icon name="lucide:arrow-left" class="size-3.5" />
            </button>
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollRelatedCarousel(1)">
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </button>
          </div>
        </div>
        <div ref="relatedCarouselRef" class="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing" @mousedown.prevent="startCarouselDrag($event, relatedCarouselRef)">
          <component
            :is="sib.url ? NuxtLink : 'div'"
            v-for="sib in siblingProjects"
            :key="sib.id"
            v-bind="sib.url ? { to: `/portfolio/${sib.url}` } : {}"
            class="group flex-none snap-start w-[75vw] sm:w-[45%] lg:w-[30%] overflow-hidden rounded-sm border border-[var(--silk)] bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div v-if="childImgUrl(sib)" class="flex items-center justify-center bg-white p-6" style="aspect-ratio: 4/3;">
              <img :src="childImgUrl(sib)!" :alt="sib.name" class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            </div>
            <div class="p-5">
              <p v-if="sib.service?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ sib.service.name }}</p>
              <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ sib.name }}</h3>
            </div>
          </component>
        </div>
      </div>
    </section>

    <!-- Related industry -->
    <section v-if="validIndustries.length" class="px-2 md:px-6 py-8">
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

    <!-- Related Work -->
    <section v-if="relatedWork?.length" class="px-2 md:px-6 pt-8 pb-16">
      <div class="hue-container">
        <div class="mb-8 flex items-end justify-between">
          <p class="hue-label">Related Work</p>
          <div class="hidden gap-2 sm:flex">
            <button
              class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--silver)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
              aria-label="Previous"
              @click="scrollRelatedWork(-1)"
            ><Icon name="lucide:chevron-left" class="size-4" /></button>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--silver)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
              aria-label="Next"
              @click="scrollRelatedWork(1)"
            ><Icon name="lucide:chevron-right" class="size-4" /></button>
          </div>
        </div>
        <div
          ref="relatedWorkRef"
          class="scrollbar-hide -mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 scroll-smooth cursor-grab active:cursor-grabbing"
          @mousedown.prevent="startCarouselDrag($event, relatedWorkRef)"
        >
          <PortfolioCard
            v-for="rw in relatedWork"
            :key="rw.id"
            :item="rw"
            :image-src="relatedImgUrl(rw)"
            aspect-ratio="3/2"
            compact
            class="w-[75vw] flex-none snap-start sm:w-[45%] lg:w-[30%] overflow-hidden rounded-sm border border-[var(--silk)]"
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-2 md:px-6 py-24" style="background: var(--color-accent);">
      <div class="hue-container flex flex-col items-center text-center gap-8">
        <h2 class="text-[2.5rem] md:text-[3.5rem] font-light leading-[1.05] text-white" style="font-family:var(--font-editorial);" v-html="ctaHeadline" />
        <ShimmerButton to="/contact" text="Book a Discovery Call" />
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
const NuxtLink = resolveComponent('NuxtLink')

const route = useRoute()
const slug = route.params.slug as string
const { trackBeforeAfterInteraction, trackPortfolioView } = useAnalytics()
const { fetchPortfolioItem, fetchPortfolio, fetchCaseStudies, assetUrl, resolvedBeforeAfters, primaryImageId, primaryIndustryName, stripHtml } = useDirectus()

const { parallaxElement, staggerEntrance } = useHeroAnimations()

const heroRef = ref<HTMLElement | null>(null)
const bgWordRef = ref<HTMLElement | null>(null)
const heroLabel = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)

const { data: item } = await useAsyncData(`portfolio-${slug}`, () => fetchPortfolioItem(slug))

if (!item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

if (import.meta.client) {
  trackPortfolioView(
    item.value.name ?? '',
    item.value.service?.name,
    primaryIndustryName(item.value),
  )
}

parallaxElement(bgWordRef, 0.3)
staggerEntrance([heroLabel, heroTitle])

const validIndustries = computed(() =>
  (item.value?.industries ?? []).map((i) => i.industries_id).filter(Boolean)
)

const industryLabel = computed(() => primaryIndustryName(item.value!))

/** Videos from this portfolio item */
const itemVideos = computed(() => (item.value?.videos ?? []).filter((v: any) => v.id && v.link))

/** Extract video ID from URL */
function extractVideoId(url: string, platform: string): string {
  if (platform === 'youtube') {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\s]+)/)
    return match?.[1] ?? ''
  }
  if (platform === 'vimeo') {
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match?.[1] ?? ''
  }
  return ''
}

/** Background word — skip articles */
const bgWord = computed(() => {
  const articles = new Set(['the', 'a', 'an'])
  const source = (typeof item.value?.client === 'object' && item.value.client?.name)
    ? item.value.client.name
    : item.value?.name ?? ''
  const words = source.split(/\s+/)
  const meaningful = words.find((w) => !articles.has(w.toLowerCase()))
  return meaningful ?? words[0] ?? ''
})

/** Contextual CTA headline based on portfolio content */
const ctaHeadline = computed(() => {
  if (beforeAfters.value.length) return 'Ready for your own<br><em>before &amp; after?</em>'
  if (itemVideos.value.length) return 'Ready to tell<br><em>your story?</em>'
  const svc = item.value?.service?.name?.toLowerCase() ?? ''
  if (svc.includes('brand')) return 'Ready to build<br><em>your brand?</em>'
  if (svc.includes('digital') || svc.includes('web')) return 'Ready for a<br><em>digital presence?</em>'
  if (svc.includes('print') || svc.includes('graphic')) return 'Ready to make<br><em>an impression?</em>'
  if (svc.includes('event')) return 'Ready to create<br><em>an experience?</em>'
  if (svc.includes('corporate') || svc.includes('data')) return 'Ready to elevate<br><em>your message?</em>'
  return 'Like what you see?<br><em>Let\u2019s talk.</em>'
})

/** Carousel refs */
const relatedCarouselRef = ref<HTMLElement | null>(null)
const baCarouselRef = ref<HTMLElement | null>(null)
const galleryCarouselRef = ref<HTMLElement | null>(null)
const galleryIndex = ref(0)

function scrollGallery(dir: number) {
  const el = galleryCarouselRef.value
  if (!el) return
  const card = el.querySelector('.snap-start') as HTMLElement
  el.scrollBy({ left: dir * (card?.offsetWidth ?? el.offsetWidth), behavior: 'smooth' })
}

function onGalleryScroll() {
  const el = galleryCarouselRef.value
  if (!el) return
  const card = el.querySelector('.snap-start') as HTMLElement
  if (!card) return
  galleryIndex.value = Math.round(el.scrollLeft / card.offsetWidth)
}

function scrollRelatedCarousel(dir: number) {
  const el = relatedCarouselRef.value
  if (!el) return
  const card = el.querySelector('.snap-start') as HTMLElement
  el.scrollBy({ left: dir * (card?.offsetWidth ?? 400), behavior: 'smooth' })
}

function scrollBaCarousel(dir: number) {
  const el = baCarouselRef.value
  if (!el) return
  const card = el.querySelector('.snap-start') as HTMLElement
  el.scrollBy({ left: dir * (card?.offsetWidth ?? 600), behavior: 'smooth' })
}

/** Generic carousel mouse drag */
function startCarouselDrag(e: MouseEvent, container: HTMLElement | null) {
  if (!container) return
  const startX = e.clientX
  const startScroll = container.scrollLeft
  container.style.scrollSnapType = 'none'

  const onMove = (ev: MouseEvent) => {
    container.scrollLeft = startScroll - (ev.clientX - startX)
  }
  const onUp = () => {
    container.style.scrollSnapType = ''
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

/** Client name — handle both M2O object and plain string */
const clientName = computed(() => {
  const c = item.value?.client
  if (!c) return null
  if (typeof c === 'object' && c.name) return c.name
  // If string but looks like a UUID, don't show it
  if (typeof c === 'string' && /^[0-9a-f-]{36}$/i.test(c)) return null
  if (typeof c === 'string') return c
  return null
})

/** All images from the item */
const allImages = computed(() => item.value?.images ?? [])

/** Before & afters — only from the current item */
const beforeAfters = computed(() => item.value ? resolvedBeforeAfters(item.value) : [])

/** Find a case study that links to this portfolio item */
const { data: allCaseStudies } = await useAsyncData('all-case-studies-for-portfolio', () => fetchCaseStudies({ limit: 50 }))

const linkedCaseStudy = computed(() => {
  const itemId = item.value?.id
  const parentId = item.value?.parent_id
  if (!itemId) return null
  return (allCaseStudies.value ?? []).find((cs: any) =>
    (cs.portfolio_items ?? []).some((pi: any) =>
      pi.portfolio_id?.id === itemId || pi.portfolio_id?.id === parentId
    )
  ) ?? null
})

/** Sibling projects from the same case study (excluding current item) */
const siblingProjects = computed(() => {
  if (!linkedCaseStudy.value) return []
  const currentId = item.value?.id
  return (linkedCaseStudy.value.portfolio_items ?? [])
    .map((pi: any) => pi.portfolio_id)
    .filter((p: any) => p && p.id !== currentId)
})

// Before/After slider
const sliderPositions = reactive<Record<number, number>>({})
const sliderRefs = reactive<Record<number, HTMLElement>>({})
const sliderTracked = new Set<number>()

function startDrag(idx: number, e: MouseEvent | TouchEvent) {
  const el = sliderRefs[idx]
  if (!el) return
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

// Related work — same service or industry
const { data: allPortfolio } = await useAsyncData('portfolio-all-for-related', () => fetchPortfolio({ limit: 100, parentOnly: true }))

const relatedWork = computed(() => {
  if (!item.value || !allPortfolio.value) return []
  const currentId = item.value.id
  const serviceId = item.value.service?.id
  const industryIds = new Set((item.value.industries ?? []).map((i) => i.industries_id?.id).filter(Boolean))

  return allPortfolio.value
    .filter((p) => {
      if (p.id === currentId) return false
      const sameService = serviceId && p.service?.id === serviceId
      const sameIndustry = (p.industries ?? []).some((i) => industryIds.has(i.industries_id?.id))
      return sameService || sameIndustry
    })
    .slice(0, 12)
})

function relatedImgUrl(p: DirectusPortfolioItem) {
  const id = primaryImageId(p)
  return id ? assetUrl(id, 'medium-contain') : null
}

const relatedWorkRef = ref<HTMLElement | null>(null)

function scrollRelatedWork(dir: number) {
  const el = relatedWorkRef.value
  if (!el) return
  const card = el.querySelector('.snap-start') as HTMLElement
  el.scrollBy({ left: dir * (card?.offsetWidth ?? 400), behavior: 'smooth' })
}

const ogImg = computed(() => {
  const id = item.value ? primaryImageId(item.value) : null
  return id ? assetUrl(id, 'large') : null
})

const ogDesc = computed(() => item.value?.synopsis ? stripHtml(item.value.synopsis) : `Creative marketing project by Hue — ${item.value?.name}.`)

const seoTitle = computed(() => {
  const name = item.value?.name ?? 'Project'
  const service = item.value?.service?.name
  const industry = primaryIndustryName(item.value!)
  const context = [service, industry].filter(Boolean).join(' & ')
  return context ? `${name} — ${context} | Hue Creative Agency` : `${name} | Hue Creative Agency`
})

useSeoMeta({
  title: seoTitle,
  description: ogDesc.value,
  ogImage: ogImg.value ?? undefined,
})

const videoSchemas = (item.value?.videos ?? [])
  .filter((v: any) => v.link && v.platform)
  .map((v: any) => {
    const vid = extractVideoId(v.link, v.platform)
    const thumbnailUrl = v.platform === 'youtube'
      ? `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`
      : undefined
    const embedUrl = v.platform === 'youtube'
      ? `https://www.youtube.com/embed/${vid}`
      : `https://player.vimeo.com/video/${vid}`
    return {
      '@type': 'VideoObject' as const,
      'name': v.title || item.value?.name || '',
      'description': v.description || ogDesc.value,
      'thumbnailUrl': thumbnailUrl,
      'embedUrl': embedUrl,
      'uploadDate': item.value?.date_created ?? undefined,
    }
  })

useSchemaOrg([
  {
    '@type': 'CreativeWork',
    'name': item.value?.name ?? '',
    'description': ogDesc.value,
    'creator': { '@id': 'https://huestudios.com' },
    ...(videoSchemas.length ? { video: videoSchemas } : {}),
  },
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://huestudios.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Portfolio', 'item': 'https://huestudios.com/portfolio' },
      { '@type': 'ListItem', 'position': 3, 'name': item.value?.name ?? 'Project' },
    ],
  },
  ...videoSchemas,
])

if (!ogImg.value) {
  defineOgImage({ component: 'HueOg', props: { title: item.value?.name ?? 'Project', description: ogDesc.value, label: 'Portfolio' } })
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>

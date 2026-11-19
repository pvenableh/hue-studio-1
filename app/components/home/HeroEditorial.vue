<template>
  <section ref="root" class="px-5 md:px-6 pt-16 md:pt-28 pb-14 md:pb-24">
    <div class="hue-container">
      <p class="hue-marginalia mb-8 md:mb-10">Creative Intelligence · Est. 2005</p>
      <h1 class="hue-display-xl">
        <span ref="line1" class="block">Reason creates.</span>
        <span ref="line2" class="block">Grow creative.</span>
      </h1>
      <div class="mt-8 md:mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p ref="sub" class="max-w-md text-[1.0625rem] leading-relaxed text-[var(--dark-grey)]">
          Principal-led brand, web, and video built on one rationale — so the creative grows the business.
        </p>
        <a
          href="#work"
          class="hue-link self-start"
          @click="trackCtaClick('Explore Selected Work', 'homepage_hero')"
        >
          Explore Selected Work
          <Icon name="lucide:arrow-down" class="size-3.5" />
        </a>
      </div>

      <div v-if="image" class="mt-12 md:mt-20 overflow-hidden bg-[var(--stone)] aspect-[4/3] md:aspect-[16/9]">
        <img
          ref="frame"
          :src="image"
          :alt="featured?.title || 'Featured work'"
          class="h-full w-full object-cover"
          fetchpriority="high"
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { fetchCaseStudies, assetUrl } = useDirectus()
const { trackCtaClick } = useTracking()
const { data } = await useAsyncData('home-hero-case-study', () => fetchCaseStudies({ limit: 1, featured: true }))
const featured = computed(() => data.value?.[0] as any)
const image = computed(() => featured.value?.featured_image ? assetUrl(featured.value.featured_image, 'large') : null)

const root = ref<HTMLElement | null>(null)
const line1 = ref<HTMLElement | null>(null)
const line2 = ref<HTMLElement | null>(null)
const sub = ref<HTMLElement | null>(null)
const frame = ref<HTMLElement | null>(null)
const { maskHeadline, reveal, parallax } = useEditorialMotion(root)

onMounted(() => {
  maskHeadline(line1.value)
  maskHeadline(line2.value, { delay: 0.15 })
  reveal(sub.value, { delay: 0.5, y: 16 })
  parallax(frame.value, { scale: 1.04 }, { scale: 1 })
})
</script>

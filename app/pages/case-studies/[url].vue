<template>
  <div v-if="cs">
    <div class="border-b border-[var(--silk)] bg-white px-2 md:px-6 py-3">
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
          <!-- Year and duration hidden until data is updated -->
          <!-- <div v-if="cs.project_year" class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Year</span>
            <span class="text-[0.8125rem] text-white/60">{{ cs.project_year }}</span>
          </div>
          <div v-if="cs.project_duration" class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Duration</span>
            <span class="text-[0.8125rem] text-white/60">{{ cs.project_duration }}</span>
          </div> -->
          <div v-if="allServices.length" class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Disciplines</span>
            <span class="text-[0.8125rem] text-white/60">{{ allServices.join(', ') }}</span>
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
    <section v-if="heroImage" class="border-b border-[var(--silk)]">
      <img
        :src="heroImage"
        :alt="cs.title ?? ''"
        class="w-full object-cover"
        style="max-height: 60vh;"
      />
    </section>

    <!-- Synopsis (from portfolio items) -->
    <section v-if="narrativeSynopsis" class="hue-section border-b border-[var(--silk)] px-2 md:px-6 py-20">
      <div class="hue-container grid gap-10 lg:grid-cols-[220px_1fr]">
        <div>
          <p class="hue-label">Synopsis</p>
        </div>
        <div class="hue-body-lg max-w-2xl" v-html="narrativeSynopsis" />
      </div>
    </section>

    <!-- Challenge / Creation / Results -->
    <section class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container space-y-16">
        <div v-if="narrativeChallenge" class="grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <span class="hue-label-sm text-[var(--silver)]">01</span>
            <p class="hue-label mt-1">The Challenge</p>
          </div>
          <div class="hue-body-lg max-w-2xl" v-html="narrativeChallenge" />
        </div>

        <div v-if="narrativeCreation" class="grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <span class="hue-label-sm text-[var(--silver)]">02</span>
            <p class="hue-label mt-1">The Creation</p>
          </div>
          <div class="hue-body-lg max-w-2xl" v-html="narrativeCreation" />
        </div>

        <div v-if="narrativeSolution" class="grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <span class="hue-label-sm text-[var(--silver)]">{{ narrativeCreation ? '03' : '02' }}</span>
            <p class="hue-label mt-1">Our Approach</p>
          </div>
          <div class="hue-body-lg max-w-2xl" v-html="narrativeSolution" />
        </div>

        <div v-if="narrativeResults" class="grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <span class="hue-label-sm text-[var(--silver)]">{{ String(1 + (narrativeChallenge ? 1 : 0) + (narrativeCreation ? 1 : 0) + (narrativeSolution ? 1 : 0)).padStart(2, '0') }}</span>
            <p class="hue-label mt-1">The Results</p>
          </div>
          <div class="hue-body-lg max-w-2xl" v-html="narrativeResults" />
        </div>
      </div>
    </section>

    <!-- Connected Portfolio Items — "The Work" -->
    <section v-if="childProjects.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-8">The Work</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="item in childProjects"
            :key="item.id"
            :to="`/portfolio/${item.slug || item.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div class="relative flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img
                v-if="portfolioImgUrl(item)"
                :src="portfolioImgUrl(item)!"
                :alt="item.name"
                class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-white">
                <span class="hue-label-sm">{{ item.name }}</span>
              </div>
            </div>
            <div class="p-6">
              <span class="hue-label-sm" style="color: var(--color-accent);">{{ item.service?.name }}</span>
              <h3 class="mt-2 text-[1rem] font-light transition-transform duration-300 group-hover:translate-x-1">{{ item.name }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Before & Afters (aggregated from connected portfolio items) -->
    <section v-if="beforeAfters.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-20">
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
              <img :src="assetUrl(ba.before_image, 'medium-contain')" class="max-h-full max-w-full object-contain p-8" loading="lazy" :alt="`${cs.title} — before`" />
            </div>
            <p v-if="ba.caption" class="border-t border-[var(--silk)] px-2 md:px-6 py-4 text-[0.8125rem] text-[var(--grey)]">{{ ba.caption }}</p>
          </div>
          <div v-if="ba.after_image" class="bg-white">
            <div class="flex items-center gap-2.5 border-b border-[var(--silk)] px-2 md:px-6 py-3">
              <div class="h-2 w-2 rounded-full" style="background: var(--color-accent);" />
              <span class="hue-label-sm" style="color: var(--color-accent);">Where they are now</span>
            </div>
            <div class="flex items-center justify-center bg-white" style="aspect-ratio: 4/3;">
              <img :src="assetUrl(ba.after_image, 'medium-contain')" class="max-h-full max-w-full object-contain p-8" loading="lazy" :alt="`${cs.title} — after`" />
            </div>
            <p v-if="ba.title" class="border-t border-[var(--silk)] px-2 md:px-6 py-4 text-[0.8125rem] text-[var(--grey)]">{{ ba.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Videos (aggregated from connected portfolio items) -->
    <section v-if="videos.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-8">Video</p>
        <div class="space-y-8">
          <div v-for="video in videos" :key="video.id">
            <div class="overflow-hidden rounded-sm" style="aspect-ratio: 16/9;">
              <iframe
                v-if="video.platform === 'youtube'"
                :src="`https://www.youtube.com/embed/${extractYouTubeId(video.link)}`"
                class="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <iframe
                v-else-if="video.platform === 'vimeo'"
                :src="`https://player.vimeo.com/video/${extractVimeoId(video.link)}`"
                class="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
              />
            </div>
            <p v-if="video.title" class="mt-3 text-[0.875rem] font-medium">{{ video.title }}</p>
            <p v-if="video.description" class="mt-1 text-[0.8125rem] text-[var(--grey)]">{{ video.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery (from case_studies collection itself) -->
    <section v-if="cs.gallery?.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Gallery</p>
        <div
          class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)]"
          :class="cs.gallery.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
          <img
            v-for="(img, i) in cs.gallery"
            :key="img.directus_files_id"
            :src="assetUrl(img.directus_files_id, 'medium-contain')"
            :alt="`${cs.title} — image ${i + 1}`"
            class="w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <InlineCapture
      :dark="true"
      label="Start a Conversation"
      headline="Interested in similar results for your brand?"
      button-text="Send"
      :context="cs.title ?? 'Case Study'"
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
      <h1 class="hue-display-lg mb-4">Case Study Not Found</h1>
      <NuxtLink to="/case-studies" class="hue-link">← All Case Studies</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'

const route = useRoute()
const url = route.params.url as string
const { fetchCaseStudyByUrl, fetchPortfolioItem, assetUrl, resolvedBeforeAfters } = useDirectus()

const { data: cs } = await useAsyncData(`case-study-${url}`, () => fetchCaseStudyByUrl(url))

if (!cs.value) throw createError({ statusCode: 404, statusMessage: 'Case study not found' })

/** Get linked portfolio item slugs from the junction — deduplicated */
const linkedSlugs = computed(() => {
  const slugs = new Set<string>()
  ;(cs.value?.portfolio_items ?? []).forEach((pi) => {
    const slug = pi.portfolio_id?.slug || pi.portfolio_id?.url
    if (slug) slugs.add(slug)
  })
  return [...slugs]
})

/** Fetch full portfolio items separately — this resolves before_and_afters, videos, projects (children) properly */
const { data: fullPortfolioItems } = await useAsyncData(
  `case-study-portfolio-${url}`,
  async () => {
    const items = await Promise.all(
      linkedSlugs.value.map((slug) => fetchPortfolioItem(slug))
    )
    return items.filter(Boolean) as DirectusPortfolioItem[]
  },
)

/** The linked parent portfolio items */
const parentPortfolioItems = computed(() => fullPortfolioItems.value ?? [])

/** All child project deliverables from parent portfolio items (logo, web, print, etc.) */
const childProjects = computed(() => {
  const children: DirectusPortfolioItem[] = []
  parentPortfolioItems.value.forEach((p) => {
    ;(p.projects ?? []).forEach((child: DirectusPortfolioItem) => {
      children.push(child)
    })
  })
  // If no children, show the parents themselves as "The Work"
  return children.length ? children : parentPortfolioItems.value
})

/**
 * Narrative content — pulls from case study fields first, falls back to
 * the first portfolio item that has content for each section.
 */
const narrativeSynopsis = computed(() => {
  for (const p of parentPortfolioItems.value) {
    if (p.synopsis) return p.synopsis
  }
  return null
})

const narrativeChallenge = computed(() => {
  if (cs.value?.challenge) return cs.value.challenge
  for (const p of parentPortfolioItems.value) {
    if (p.challenge) return p.challenge
  }
  return null
})

const narrativeCreation = computed(() => {
  for (const p of parentPortfolioItems.value) {
    if (p.creation) return p.creation
  }
  return null
})

const narrativeSolution = computed(() => {
  return cs.value?.solution ?? null
})

const narrativeResults = computed(() => {
  if (cs.value?.results) return cs.value.results
  for (const p of parentPortfolioItems.value) {
    if (p.results) return p.results
  }
  return null
})

/** Collect all unique service names across everything */
const allServices = computed(() => {
  const names = new Set<string>()
  cs.value?.services?.forEach((s) => { if (s.services_id?.name) names.add(s.services_id.name) })
  parentPortfolioItems.value.forEach((p) => { if (p.service?.name) names.add(p.service.name) })
  childProjects.value.forEach((p) => { if (p.service?.name) names.add(p.service.name) })
  return [...names]
})

/** Hero image: case study featured_image → parent portfolio item featured_image */
const heroImage = computed(() => {
  if (cs.value?.featured_image) return assetUrl(cs.value.featured_image, 'hero')
  const withImage = parentPortfolioItems.value.find((p) => p.featured_image)
  if (withImage?.featured_image) return assetUrl(withImage.featured_image, 'hero')
  return null
})

/** Aggregate before & afters from parent portfolio items */
const beforeAfters = computed(() => {
  const all: any[] = []
  parentPortfolioItems.value.forEach((p) => {
    const resolved = resolvedBeforeAfters(p)
    all.push(...resolved)
  })
  return all
})

/** Aggregate videos from parent portfolio items */
const videos = computed(() => {
  const all: any[] = []
  parentPortfolioItems.value.forEach((p) => {
    (p.videos ?? []).forEach((v: any) => {
      if (v.id) all.push(v)
    })
  })
  return all
})

/** Portfolio item image URL */
function portfolioImgUrl(item: DirectusPortfolioItem): string | null {
  const id = item.featured_image ?? item.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'medium-contain') : null
}

/** Extract YouTube video ID from various URL formats */
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\s]+)/)
  return match?.[1] ?? ''
}

/** Extract Vimeo video ID */
function extractVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match?.[1] ?? ''
}

const csOgImg = computed(() => {
  const id = cs.value?.featured_image
    ?? cs.value?.gallery?.[0]?.directus_files_id
    ?? fullPortfolioItems.value?.[0]?.featured_image
    ?? fullPortfolioItems.value?.[0]?.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'large') : null
})

useSeoMeta({
  title: `${cs.value?.title ?? 'Case Study'} | Hue Creative Agency`,
  description: cs.value?.excerpt ?? 'A case study by Hue Creative Agency.',
  ogImage: csOgImg.value ?? undefined,
})

if (!csOgImg.value) {
  defineOgImage({ component: 'HueOg', props: { title: cs.value?.title ?? 'Case Study', description: cs.value?.excerpt ?? 'A case study by Hue Creative Agency.', label: 'Case Study' } })
}
</script>

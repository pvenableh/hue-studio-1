<template>
  <div v-if="cs" ref="rootRef">
    <BackLink to="/case-studies">All Case Studies</BackLink>

    <!-- ═══ Summary ═══ -->
    <header class="bg-white px-2 pt-12 pb-16 md:px-6 lg:pt-16 lg:pb-24">
      <div class="hue-container grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-20">
        <div>
          <p class="hue-marginalia mb-6">
            Case Study<template v-if="cs.outcome_tag"> · {{ cs.outcome_tag }}</template>
          </p>
          <h1
            ref="titleRef"
            class="mb-8 max-w-[16ch] text-[2.5rem] font-light uppercase leading-[0.98] tracking-[0.06em] text-[var(--near-black)] md:text-[3.5rem] lg:text-[4.25rem]"
            style="font-family: var(--font)"
          >
            {{ cs.title }}
          </h1>
          <p v-if="cs.excerpt" data-reveal class="max-w-2xl text-[1.125rem] leading-relaxed text-[var(--dark-grey)] md:text-[1.25rem]">
            {{ cs.excerpt }}
          </p>
          <div v-if="cs.rationale" data-reveal class="mt-10 max-w-2xl border-t border-[var(--color-border)] pt-6">
            <p class="hue-marginalia mb-3">01 / Rationale</p>
            <p class="text-[1.5rem] font-light leading-snug text-[var(--near-black)] md:text-[1.75rem]" style="font-family: var(--font-editorial)">
              {{ cs.rationale }}
            </p>
          </div>
        </div>

        <dl data-reveal class="grid content-start gap-6 border-t border-[var(--color-border)] pt-6 sm:grid-cols-2 lg:grid-cols-1 lg:border-t-0 lg:pt-12">
          <div v-if="clientName">
            <dt class="hue-marginalia mb-1.5">Client</dt>
            <dd class="text-[0.875rem] text-[var(--near-black)]">{{ clientName }}</dd>
          </div>
          <div v-if="csIndustries.length">
            <dt class="hue-marginalia mb-1.5">Industry</dt>
            <dd class="flex flex-wrap gap-x-3 text-[0.875rem]">
              <NuxtLink
                v-for="ind in csIndustries"
                :key="ind.id"
                :to="`/industries/${ind.url}`"
                class="text-[var(--near-black)] hover:text-[var(--color-accent)]"
              >{{ ind.name }}</NuxtLink>
            </dd>
          </div>
          <div v-if="allServices.length" class="sm:col-span-2 lg:col-span-1">
            <dt class="hue-marginalia mb-2">Disciplines</dt>
            <dd class="flex flex-wrap gap-1.5">
              <span
                v-for="svc in allServices"
                :key="svc"
                class="rounded-full bg-[var(--stone)] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--dark-grey)]"
              >{{ svc }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </header>

    <!-- ═══ Work: Surface / Rationale ═══ -->
    <section aria-label="The work" class="px-2 pb-20 md:px-6 lg:pb-28">
      <div class="hue-container">
        <div v-if="hasPins" class="mb-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
          <p class="hue-marginalia">{{ view === 'rationale' ? 'Select a marker to read the reasoning' : 'The work, uninterrupted' }}</p>
          <CaseStudiesReasonToggle v-model="view" />
        </div>

        <!-- Rationale View -->
        <CaseStudiesRationalePins v-if="hasPins && view === 'rationale'" :pins="pins" :title="cs.title ?? ''" />

        <!-- Surface View -->
        <div v-else class="flex flex-col gap-6 md:gap-10">
          <div v-if="heroImage" class="overflow-hidden bg-[var(--stone)]">
            <img ref="heroImgRef" :src="heroImage" :alt="cs.title ?? ''" class="block h-auto w-full origin-center" />
          </div>

          <img
            v-for="(img, i) in cs.gallery ?? []"
            :key="img.directus_files_id"
            :src="assetUrl(img.directus_files_id, 'large')"
            :alt="`${cs.title} — image ${i + 1}`"
            class="block h-auto w-full bg-[var(--stone)]"
            loading="lazy"
          />

          <!-- Before & After -->
          <div v-for="(ba, idx) in beforeAfters" :key="ba.id">
            <div
              v-if="ba.before_image && ba.after_image"
              :ref="(el) => { if (el) sliderRefs[idx] = el as HTMLElement }"
              role="slider"
              tabindex="0"
              aria-label="Before and after comparison"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-valuenow="Math.round(sliderPositions[idx] ?? 50)"
              class="group relative cursor-col-resize select-none overflow-hidden bg-[var(--stone)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
              style="aspect-ratio: 16/9;"
              @mousedown.prevent="startDrag(idx, $event)"
              @touchstart.prevent="startDrag(idx, $event)"
              @keydown.left.prevent="nudgeSlider(idx, -5)"
              @keydown.right.prevent="nudgeSlider(idx, 5)"
            >
              <div class="absolute inset-0 flex items-center justify-center" :class="ba.is_logo ? 'p-12 md:p-20' : 'p-4 md:p-8'" :style="{ clipPath: `inset(0 ${100 - (sliderPositions[idx] ?? 50)}% 0 0)` }">
                <img :src="assetUrl(ba.before_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[60%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${cs.title} — before`" />
              </div>
              <div class="absolute inset-0 flex items-center justify-center" :class="ba.is_logo ? 'p-12 md:p-20' : 'p-4 md:p-8'" :style="{ clipPath: `inset(0 0 0 ${sliderPositions[idx] ?? 50}%)` }">
                <img :src="assetUrl(ba.after_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[60%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${cs.title} — after`" />
              </div>
              <div class="absolute top-0 bottom-0 z-10 -ml-px w-px bg-[var(--near-black)]/30" :style="{ left: `${sliderPositions[idx] ?? 50}%` }">
                <div class="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-white transition-transform group-hover:scale-110">
                  <Icon name="lucide:arrow-left-right" class="size-4 text-[var(--dark-grey)]" />
                </div>
              </div>
              <span class="hue-marginalia absolute top-4 left-4 transition-opacity duration-200" :style="{ opacity: (sliderPositions[idx] ?? 50) < 15 ? 0 : 1 }">Before</span>
              <span class="hue-marginalia absolute top-4 right-4 transition-opacity duration-200" :style="{ opacity: (sliderPositions[idx] ?? 50) > 85 ? 0 : 1 }">After</span>
            </div>
            <div v-else class="grid gap-6 md:grid-cols-2">
              <div v-for="side in ['before', 'after'] as const" :key="side">
                <div v-if="ba[`${side}_image`]" class="flex items-center justify-center bg-[var(--stone)]" :class="ba.is_logo ? 'p-12' : 'p-4'" style="aspect-ratio: 4/3;">
                  <img :src="assetUrl(ba[`${side}_image`], 'medium-contain')" :class="ba.is_logo ? 'max-h-[50%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${cs.title} — ${side}`" />
                </div>
              </div>
            </div>
            <p v-if="ba.caption || ba.title" class="hue-marginalia mt-3">{{ ba.caption || ba.title }}</p>
          </div>

          <!-- Videos (when not carried by deliverables) -->
          <figure v-for="video in standaloneVideos" :key="video.id">
            <div class="overflow-hidden bg-black" style="aspect-ratio: 16/9;">
              <iframe
                :src="embedUrl(video)"
                :title="video.title || `${cs.title} video`"
                class="h-full w-full"
                :allow="video.platform === 'youtube' ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' : 'autoplay; fullscreen; picture-in-picture'"
                allowfullscreen
                loading="lazy"
              />
            </div>
            <figcaption v-if="video.title || video.description" class="mt-3">
              <span v-if="video.title" class="hue-marginalia block text-[var(--near-black)]">{{ video.title }}</span>
              <span v-if="video.description" class="mt-1 block text-[0.8125rem] text-[var(--dark-grey)]">{{ video.description }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ═══ Narrative ═══ -->
    <section v-if="narrative.length" class="border-t border-[var(--color-border)] px-2 py-20 md:px-6 lg:py-28">
      <div class="hue-container flex flex-col gap-16 lg:gap-20">
        <div
          v-for="(block, i) in narrative"
          :key="block.label"
          data-reveal
          class="grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-20"
        >
          <p class="hue-marginalia">{{ String(i + (cs.rationale ? 2 : 1)).padStart(2, '0') }} / {{ block.label }}</p>
          <div class="cs-prose max-w-2xl text-[1.0625rem] leading-relaxed text-[var(--near-black)] md:text-[1.125rem]" v-html="block.html" />
        </div>
      </div>
    </section>

    <!-- ═══ Deliverables ═══ -->
    <section v-if="childProjects.length" class="border-t border-[var(--color-border)] px-2 py-20 md:px-6 lg:py-28">
      <div class="hue-container">
        <p class="hue-marginalia mb-10">Project Deliverables</p>
        <div class="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="item in childProjects" :key="item.id" data-reveal class="group">
            <!-- Video carousel -->
            <div v-if="itemVideos(item).length" class="relative overflow-hidden bg-black" style="aspect-ratio: 16/9;">
              <Transition name="video-fade" mode="out-in">
                <iframe
                  :key="`${item.id}-${currentVideoIndex(item.id)}`"
                  :src="embedUrl(itemVideos(item)[currentVideoIndex(item.id)]!)"
                  :title="`${item.name} video`"
                  class="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowfullscreen
                  loading="lazy"
                />
              </Transition>
              <template v-if="itemVideos(item).length > 1">
                <div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <button
                    v-for="dir in [-1, 1]"
                    :key="dir"
                    type="button"
                    :aria-label="dir < 0 ? 'Previous video' : 'Next video'"
                    class="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-white/90 text-[var(--dark-grey)] hover:bg-white hover:text-[var(--near-black)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                    @click="stepVideo(item.id, dir, itemVideos(item).length)"
                  >
                    <Icon :name="dir < 0 ? 'lucide:chevron-left' : 'lucide:chevron-right'" class="size-4" />
                  </button>
                </div>
                <div class="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                  <span v-for="(_, vi) in itemVideos(item)" :key="vi" class="block size-1.5 rounded-full" :class="vi === currentVideoIndex(item.id) ? 'bg-white' : 'bg-white/40'" />
                </div>
              </template>
            </div>

            <component
              :is="item.url ? NuxtLink : 'div'"
              v-bind="item.url ? { to: `/portfolio/${item.url}` } : {}"
              class="block"
            >
              <div v-if="!itemVideos(item).length && portfolioImgUrl(item)" class="flex items-center justify-center overflow-hidden bg-[var(--stone)]" style="aspect-ratio: 4/3;">
                <img :src="portfolioImgUrl(item)!" :alt="item.name" class="max-h-[72%] max-w-[78%] object-contain transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div class="pt-4">
                <p v-if="primaryService(item)?.name" class="hue-marginalia mb-1">{{ primaryService(item)?.name }}</p>
                <h3 class="text-[0.9375rem] font-medium text-[var(--near-black)]" :class="item.url ? 'group-hover:text-[var(--color-accent)] transition-colors' : ''">{{ item.name }}</h3>
                <div v-if="item.caption" class="mt-1.5 line-clamp-2 text-[0.8125rem] text-[var(--dark-grey)]" v-html="item.caption" />
              </div>
            </component>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══ Closing ═══ -->
    <section class="border-t border-[var(--color-border)] px-2 py-24 md:px-6 lg:py-32">
      <div class="hue-container flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <h2 class="max-w-xl text-[2.25rem] font-light leading-[1.05] text-[var(--near-black)] md:text-[3rem]" style="font-family: var(--font-editorial)" v-html="ctaHeadline" />
        <div class="flex flex-wrap items-center gap-6">
          <NuxtLink
            to="/contact"
            class="rounded-full bg-[var(--near-black)] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >Start a Conversation</NuxtLink>
          <NuxtLink to="/case-studies" class="hue-marginalia text-[var(--near-black)] hover:text-[var(--color-accent)]">All case studies →</NuxtLink>
        </div>
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
import type { DirectusPortfolioItem, DirectusRationalePin } from '~/composables/useDirectus'
import type { ReasonView } from '~/components/case-studies/ReasonToggle.vue'

const NuxtLink = resolveComponent('NuxtLink')

const route = useRoute()
const url = route.params.url as string
const { fetchCaseStudyByUrl, fetchPortfolioItemById, assetUrl, resolvedBeforeAfters, primaryService } = useDirectus()
const { trackBeforeAfterInteraction, trackCaseStudyView } = useAnalytics()
const { trackCaseStudyView: trackCaseStudyViewNew, useScrollDepthTracker } = useTracking()
const { reveal, maskHeadline, parallax } = useEditorialMotion()

const rootRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const heroImgRef = ref<HTMLElement | null>(null)

const { data: cs } = await useAsyncData(`case-study-${url}`, () => fetchCaseStudyByUrl(url))

if (!cs.value) throw createError({ statusCode: 404, statusMessage: 'Case study not found' })

if (import.meta.client) {
  trackCaseStudyView(
    cs.value.title ?? '',
    cs.value.services?.[0]?.services_id?.name,
  )
  trackCaseStudyViewNew(
    url,
    cs.value.title ?? '',
    cs.value.industries?.[0]?.industries_id?.name,
  )
}

onMounted(() => {
  useScrollDepthTracker()
  maskHeadline(titleRef.value)
  parallax(heroImgRef.value, { scale: 1.04 }, { scale: 1 })
  rootRef.value?.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => reveal(el))
})

/** Linked portfolio item IDs — deduplicated */
const linkedIds = computed(() => {
  const ids = new Set<string>()
  ;(cs.value?.portfolio_items ?? []).forEach((pi) => {
    if (pi.portfolio_id?.id) ids.add(pi.portfolio_id.id)
  })
  return [...ids]
})

/** Full portfolio items — these are the deliverables */
const { data: fullPortfolioItems } = await useAsyncData(
  `case-study-portfolio-${url}`,
  async () => {
    const items = await Promise.all(linkedIds.value.map(id => fetchPortfolioItemById(id)))
    return items.filter(Boolean) as DirectusPortfolioItem[]
  },
)

const childProjects = computed(() => fullPortfolioItems.value ?? [])

/* ── Rationale View ── */
const pins = computed<DirectusRationalePin[]>(() => {
  return Array.isArray(cs.value?.rationale_pins) ? cs.value!.rationale_pins!.filter(p => p?.image) : []
})
const hasPins = computed(() => pins.value.length > 0)
const view = ref<ReasonView>('surface')

const csIndustries = computed(() =>
  (cs.value?.industries ?? [])
    .map((j: any) => j.industries_id)
    .filter((i: any) => i?.name && i?.url),
)

/** Client name — from organization, client M2O, or linked portfolio items */
const clientName = computed(() => {
  const org = cs.value?.organization
  if (org && typeof org === 'object' && org.name) return org.name
  const c = cs.value?.client
  if (c && typeof c === 'object' && c.name) return c.name
  if (typeof c === 'string' && !/^[0-9a-f-]{36}$/i.test(c)) return c
  for (const p of childProjects.value) {
    if (p.client && typeof p.client === 'object' && p.client.name) return p.client.name
  }
  return null
})

/** Challenge / approach / outcome, light and in reading order */
const narrative = computed(() =>
  [
    { label: 'Challenge', html: cs.value?.challenge },
    { label: 'Approach', html: cs.value?.solution },
    { label: 'Outcome', html: cs.value?.results },
  ].filter((b): b is { label: string, html: string } => !!b.html),
)

/** All unique service names — case study + linked portfolio items */
const allServices = computed(() => {
  const names = new Set<string>()
  cs.value?.services?.forEach((s) => { if (s.services_id?.name) names.add(s.services_id.name) })
  childProjects.value.forEach((p) => { p.services?.forEach((s) => { if (s.services_id?.name) names.add(s.services_id.name) }) })
  return [...names]
})

/** Hero image — case study featured image, else first portfolio item with one */
const heroImage = computed(() => {
  if (cs.value?.featured_image) return assetUrl(cs.value.featured_image, 'hero')
  const withImage = childProjects.value.find(p => p.featured_image)
  return withImage?.featured_image ? assetUrl(withImage.featured_image, 'hero') : null
})

/** Before & afters — aggregated and deduped across linked portfolio items */
const beforeAfters = computed(() => {
  const seen = new Set<string>()
  return childProjects.value
    .flatMap(p => resolvedBeforeAfters(p))
    .filter((ba: any) => (seen.has(ba.id) ? false : (seen.add(ba.id), true)))
})

/** Videos — aggregated across linked portfolio items */
const videos = computed(() =>
  childProjects.value.flatMap(p => ((p as any).videos ?? []).filter((v: any) => v?.id)),
)
/** Deliverable cards already carry their videos; show standalone only when there are none */
const standaloneVideos = computed(() =>
  childProjects.value.length ? [] : videos.value.filter((v: any) => v.link && (v.platform === 'youtube' || v.platform === 'vimeo')),
)

/** Contextual closing headline */
const ctaHeadline = computed(() => {
  if (beforeAfters.value.length) return 'Ready for your own<br><em>before &amp; after?</em>'
  if (videos.value.length) return 'Ready to tell<br><em>your story?</em>'
  const svc = allServices.value[0]?.toLowerCase() ?? ''
  if (svc.includes('brand')) return 'Ready to build<br><em>your brand?</em>'
  if (svc.includes('digital') || svc.includes('web')) return 'Ready for a<br><em>digital presence?</em>'
  if (svc.includes('print') || svc.includes('graphic')) return 'Ready to make<br><em>an impression?</em>'
  if (svc.includes('event')) return 'Ready to create<br><em>an experience?</em>'
  return 'Ready to build<br><em>on reason?</em>'
})

/* ── Before/After slider ── */
const sliderPositions = reactive<Record<number, number>>({})
const sliderRefs = reactive<Record<number, HTMLElement>>({})

function startDrag(idx: number, e: MouseEvent | TouchEvent) {
  trackBeforeAfterInteraction?.(cs.value?.title ?? 'Case Study')
  updateSlider(idx, e)
  const onMove = (ev: MouseEvent | TouchEvent) => updateSlider(idx, ev)
  const onUp = () => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchmove', onMove)
  window.addEventListener('touchend', onUp)
}

function updateSlider(idx: number, e: MouseEvent | TouchEvent) {
  const el = sliderRefs[idx]
  if (!el) return
  const rect = el.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  sliderPositions[idx] = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
}

function nudgeSlider(idx: number, delta: number) {
  if (sliderPositions[idx] === undefined) trackBeforeAfterInteraction?.(cs.value?.title ?? 'Case Study')
  sliderPositions[idx] = Math.min(100, Math.max(0, (sliderPositions[idx] ?? 50) + delta))
}

/* ── Media helpers ── */
function portfolioImgUrl(item: DirectusPortfolioItem): string | null {
  const id = item.featured_image ?? item.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'medium-contain') : null
}

function itemVideos(item: DirectusPortfolioItem): { platform: string, link: string }[] {
  return ((item as any).videos ?? [])
    .filter((v: any) => v?.link && (v.platform === 'youtube' || v.platform === 'vimeo'))
    .map((v: any) => ({ platform: v.platform, link: v.link }))
}

const videoIndexes = reactive<Record<string, number>>({})
function currentVideoIndex(itemId: string): number { return videoIndexes[itemId] ?? 0 }
function stepVideo(itemId: string, dir: number, total: number) {
  videoIndexes[itemId] = (currentVideoIndex(itemId) + dir + total) % total
}

function extractYouTubeId(link: string): string {
  return link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\s]+)/)?.[1] ?? ''
}

function extractVimeoId(link: string): string {
  return link.match(/vimeo\.com\/(\d+)/)?.[1] ?? ''
}

function embedUrl(v: { platform: string, link: string }): string {
  return v.platform === 'youtube'
    ? `https://www.youtube.com/embed/${extractYouTubeId(v.link)}`
    : `https://player.vimeo.com/video/${extractVimeoId(v.link)}`
}

/* ── SEO ── */
const csOgImg = computed(() => {
  const id = cs.value?.featured_image
    ?? cs.value?.gallery?.[0]?.directus_files_id
    ?? fullPortfolioItems.value?.[0]?.featured_image
    ?? fullPortfolioItems.value?.[0]?.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'large') : null
})

const csSeoTitle = computed(() => {
  const title = cs.value?.title ?? 'Case Study'
  const context = [allServices.value[0], csIndustries.value[0]?.name].filter(Boolean).join(' & ')
  return context ? `${title} — ${context} | Hue` : `${title} | Hue`
})

useSeoMeta({
  title: csSeoTitle,
  description: cs.value?.excerpt ?? 'A case study by Hue.',
  ogImage: csOgImg.value ?? undefined,
})

const csVideoSchemas = (videos.value ?? [])
  .filter((v: any) => v.link && v.platform)
  .map((v: any) => {
    const vid = v.platform === 'youtube' ? extractYouTubeId(v.link) : extractVimeoId(v.link)
    return {
      '@type': 'VideoObject' as const,
      'name': v.title || cs.value?.title || '',
      'description': v.description || cs.value?.excerpt || '',
      'thumbnailUrl': v.platform === 'youtube' ? `https://img.youtube.com/vi/${vid}/maxresdefault.jpg` : undefined,
      'embedUrl': embedUrl(v),
      'uploadDate': cs.value?.date_created ?? undefined,
    }
  })

useSchemaOrg([
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://huestudios.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Case Studies', 'item': 'https://huestudios.com/case-studies' },
      { '@type': 'ListItem', 'position': 3, 'name': cs.value?.title ?? 'Case Study' },
    ],
  },
  ...csVideoSchemas,
])

if (!csOgImg.value) {
  defineOgImage({ component: 'HueOg', props: { title: cs.value?.title ?? 'Case Study', description: cs.value?.excerpt ?? 'A case study by Hue.', label: 'Case Study' } })
}
</script>

<style scoped>
.video-fade-enter-active,
.video-fade-leave-active { transition: opacity 0.35s ease; }
.video-fade-enter-from,
.video-fade-leave-to { opacity: 0; }

.cs-prose :deep(p + p) { margin-top: 1em; }
.cs-prose :deep(a) { text-decoration: underline; text-underline-offset: 3px; }
.cs-prose :deep(a:hover) { color: var(--color-accent); }
</style>

<template>
  <div ref="root" class="work-index">
    <div class="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter work by discipline">
      <button
        v-for="p in PILLS"
        :key="p.label"
        type="button"
        class="work-pill"
        :aria-pressed="active === p.label"
        @click="setFilter(p.label)"
      >{{ p.label }}</button>
    </div>

    <ol class="border-t border-[var(--color-border)]">
      <li
        v-for="row in rows"
        :key="row.id"
        class="work-row-wrap border-b border-[var(--color-border)]"
        :data-id="row.id"
        :data-tags="row.tags.join('|')"
      >
        <component
          :is="row.href ? (row.external ? 'a' : NuxtLink) : 'div'"
          v-bind="linkAttrs(row)"
          class="work-row group block py-5 md:py-6 outline-none"
        >
          <div class="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 md:grid-cols-[3.5rem_1.4fr_1fr_auto] md:gap-x-8">
            <span class="hue-marginalia">{{ row.number }}</span>
            <span class="work-title text-[1.25rem] leading-tight text-[var(--near-black)] md:text-[1.75rem]" style="font-family:var(--font-editorial);">{{ row.title }}</span>
            <span v-if="row.disciplines" class="col-start-2 mt-1 text-[0.8125rem] text-[var(--dark-grey)] md:col-start-auto md:mt-0">{{ row.disciplines }}</span>
            <span v-else class="hidden md:block" />
            <span v-if="row.tag" class="col-start-2 mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--grey)] md:col-start-auto md:mt-0 md:text-right">{{ row.tag }}</span>
            <span v-else class="hidden md:block" />
          </div>

          <div v-if="row.image || row.rationale" class="work-preview">
            <div class="work-preview-inner">
              <div class="grid gap-4 pt-5 md:grid-cols-[3.5rem_1fr] md:gap-8">
                <span class="hidden md:block" />
                <div class="grid gap-5 md:grid-cols-[minmax(0,22rem)_1fr] md:items-end">
                  <div v-if="row.image" class="aspect-[4/3] overflow-hidden bg-[var(--stone)]">
                    <img :src="row.image" alt="" loading="lazy" class="size-full object-cover">
                  </div>
                  <p v-if="row.rationale" class="max-w-md text-[0.9375rem] leading-relaxed text-[var(--dark-grey)]">
                    <span class="hue-marginalia mr-2">Rationale:</span>{{ row.rationale }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </component>
      </li>
    </ol>

    <p v-if="!pending && !matchCount" class="py-10 text-[0.9375rem] text-[var(--dark-grey)]">
      Nothing tagged {{ active }} yet.
      <button type="button" class="underline underline-offset-4 hover:text-[var(--accent-muted-gold)]" @click="setFilter('All')">Show all work</button>
    </p>
    <p v-else-if="!pending && !rows.length" class="py-10 text-[0.9375rem] text-[var(--dark-grey)]">Case studies coming soon.</p>

    <NuxtLink v-if="showAllLink" to="/case-studies" class="hue-link mt-10 inline-flex">
      View all case studies <Icon name="lucide:arrow-right" class="size-3.5" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { NuxtLink } from '#components'
import type { DirectusCaseStudy } from '~/composables/useDirectus'

const props = withDefaults(defineProps<{
  /** Max case studies (0 = all) */
  limit?: number
  /** Prepend current_work rows tagged "In progress" */
  showCurrent?: boolean
  showAllLink?: boolean
}>(), { limit: 0, showCurrent: false, showAllLink: false })

const PILLS = [
  { label: 'All', match: [] as string[] },
  { label: 'Brand', match: ['brand'] },
  { label: 'Web & Digital', match: ['web', 'digital'] },
  { label: 'Video & Motion', match: ['video', 'audio', 'motion'] },
  { label: 'Campaigns', match: ['campaign', 'content'] },
]

interface Row {
  id: string
  number: string
  title: string
  disciplines: string
  tag: string | null
  rationale: string | null
  image: string | null
  href: string | null
  external: boolean
  tags: string[]
}

const { fetchCaseStudies, fetchCurrentWork, assetUrl } = useDirectus()

const { data, pending } = await useAsyncData(
  `work-index-${props.limit}-${props.showCurrent}`,
  async () => {
    const [cs, cw] = await Promise.all([
      fetchCaseStudies({ limit: props.limit || 50 }).catch(() => [] as DirectusCaseStudy[]),
      props.showCurrent ? fetchCurrentWork().catch(() => []) : Promise.resolve([]),
    ])
    return { cs, cw }
  },
)

function pillsFor(names: string[]): string[] {
  const lower = names.map(n => n.toLowerCase())
  return PILLS.filter(p => p.match.length && lower.some(n => p.match.some(m => n.includes(m)))).map(p => p.label)
}

function csImage(cs: DirectusCaseStudy): string | null {
  const id = cs.featured_image
    ?? cs.portfolio_items?.find(pi => pi.portfolio_id?.featured_image)?.portfolio_id?.featured_image
    ?? cs.portfolio_items?.find(pi => pi.portfolio_id?.images?.length)?.portfolio_id?.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'medium-contain') : null
}

const rows = computed<Row[]>(() => {
  const out: Row[] = []
  for (const w of data.value?.cw ?? []) {
    out.push({
      id: `cw-${w.id}`,
      number: '',
      title: w.name,
      disciplines: (w.disciplines ?? []).join(' · ') || w.category || '',
      tag: 'In progress',
      rationale: w.descriptor,
      image: w.image ? assetUrl(w.image, 'medium-contain') : null,
      href: w.link,
      external: !!w.link && /^https?:/.test(w.link),
      tags: pillsFor([...(w.disciplines ?? []), w.category ?? '']),
    })
  }
  let list = data.value?.cs ?? []
  if (props.limit) list = list.slice(0, props.limit)
  list.forEach((cs) => {
    const names = (cs.services ?? []).map(s => s.services_id?.name ?? '').filter(Boolean)
    out.push({
      id: cs.id,
      number: '',
      title: cs.client?.name && cs.title ? `${cs.client.name} — ${cs.title}` : (cs.title ?? cs.client?.name ?? 'Untitled'),
      disciplines: names.slice(0, 3).join(' · '),
      tag: cs.outcome_tag || null,
      rationale: cs.rationale || null,
      image: csImage(cs),
      href: cs.url ? `/case-studies/${cs.url}` : null,
      external: false,
      tags: pillsFor(names),
    })
  })
  return out.map((r, i) => ({ ...r, number: String(i + 1).padStart(2, '0') }))
})

function linkAttrs(row: Row) {
  if (!row.href) return { tabindex: 0 }
  return row.external ? { href: row.href, target: '_blank', rel: 'noopener' } : { to: row.href }
}

const root = ref<HTMLElement | null>(null)
const active = ref('All')
const matchCount = computed(() => rows.value.filter(r => matches(r, active.value)).length)

function matches(r: Row, label: string) {
  return label === 'All' || r.tags.includes(label)
}

function setFilter(label: string) {
  if (label === active.value || !root.value) return
  active.value = label
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  root.value.querySelectorAll<HTMLElement>('.work-row-wrap').forEach((el) => {
    const r = rows.value.find(x => x.id === el.dataset.id)
    const show = !!r && matches(r, label)
    if ((el.dataset.shown !== 'false') === show) return
    el.dataset.shown = String(show)
    gsap.killTweensOf(el)
    if (show) {
      el.style.display = ''
      el.style.overflow = 'hidden'
      gsap.fromTo(el, reduce ? { opacity: 0 } : { opacity: 0, height: 0 }, { opacity: 1, height: 'auto', duration: 0.45, ease: 'power2.inOut', clearProps: 'height,opacity,overflow' })
    }
    else {
      el.style.overflow = 'hidden'
      gsap.to(el, { opacity: 0, height: reduce ? 'auto' : 0, duration: 0.35, ease: 'power2.inOut', onComplete: () => { if (el.dataset.shown === 'false') el.style.display = 'none' } })
    }
  })
}
</script>

<style scoped>
.work-pill {
  border: 1px solid var(--color-border);
  background: transparent;
  padding: 0.4rem 0.95rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  color: var(--dark-grey);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}
.work-pill:hover { background: var(--stone); }
.work-pill:focus-visible { outline: 2px solid var(--accent-muted-gold); outline-offset: 2px; }
.work-pill[aria-pressed='true'] { border-color: var(--accent-muted-gold); color: var(--near-black); background: var(--stone); }

.work-row:focus-visible { outline: 2px solid var(--accent-muted-gold); outline-offset: -2px; }
.work-row:hover .work-title,
.work-row:focus-visible .work-title { color: var(--accent-muted-gold); }

.work-preview {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;
}
.work-preview-inner { overflow: hidden; min-height: 0; }
.work-row:hover .work-preview,
.work-row:focus-visible .work-preview,
.work-row:focus-within .work-preview {
  grid-template-rows: 1fr;
  opacity: 1;
}
/* Touch: no hover, so show the preview inline */
@media (hover: none) {
  .work-preview { grid-template-rows: 1fr; opacity: 1; }
  .work-preview-inner { padding-bottom: 0.25rem; }
}
@media (prefers-reduced-motion: reduce) {
  .work-preview { transition: opacity 0.2s; }
}
</style>

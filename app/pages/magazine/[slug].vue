<template>
  <div v-if="post">
    <!-- Breadcrumb -->
    <div class="border-b border-[var(--silk)] bg-white px-2 md:px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/magazine" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" /> Magazine
        </NuxtLink>
      </div>
    </div>

    <!-- Article Header -->
    <section class="px-2 md:px-6 py-16 md:py-24">
      <div class="hue-container-sm text-center">
        <div v-if="primaryCategory" class="mb-5">
          <NuxtLink
            :to="`/magazine/category/${primaryCategory.slug}`"
            class="hue-label-sm tracking-[0.15em] transition-colors hover:text-[var(--accent)]"
            :style="primaryCategory.color ? `color: ${primaryCategory.color}` : ''"
          >{{ primaryCategory.name }}</NuxtLink>
        </div>
        <h1 class="hue-display-lg mb-6">{{ post.title }}</h1>
        <p v-if="post.excerpt" class="hue-editorial-md mx-auto mb-10 max-w-2xl">{{ post.excerpt }}</p>
        <div class="flex justify-center">
          <MagazineAuthorCard
            v-if="post.author"
            :author="post.author"
            :date="post.date_published ?? post.date_created"
            :reading-time="post.reading_time"
          />
        </div>
      </div>
    </section>

    <!-- Featured Image -->
    <section v-if="heroImgSrc" class="px-2 md:px-6 pb-16">
      <div class="hue-container">
        <img
          :src="heroImgSrc"
          :alt="post.title ?? ''"
          class="w-full rounded-sm object-cover"
          style="max-height: 60vh;"
        />
      </div>
    </section>

    <!-- Article Body -->
    <section class="px-2 md:px-6 pb-20">
      <div class="hue-container-sm">
        <MagazineArticleBody v-if="post.body" :content="post.body" />
      </div>
    </section>

    <!-- Tags / Taxonomy -->
    <section v-if="allTags.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-10">
      <div class="hue-container-sm flex flex-wrap items-center gap-3">
        <NuxtLink
          v-for="tag in allTags"
          :key="tag.url"
          :to="tag.url"
          class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
        >{{ tag.name }}</NuxtLink>
      </div>
    </section>

    <!-- Author Bio -->
    <section v-if="post.author" class="border-t border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container-sm grid gap-6 sm:grid-cols-[auto_1fr]">
        <NuxtLink v-if="post.author.url" :to="`/team/${post.author.url}`">
          <img
            v-if="authorImgSrc"
            :src="authorImgSrc"
            :alt="authorName"
            class="h-20 w-20 rounded-full object-cover"
          />
        </NuxtLink>
        <div>
          <p class="hue-label-sm mb-1">About the author</p>
          <NuxtLink v-if="post.author.url" :to="`/team/${post.author.url}`" class="mb-1 block text-[1.125rem] font-light hover:text-[var(--accent)] transition-colors">
            {{ authorName }}
          </NuxtLink>
          <p v-if="post.author.title" class="mb-2 text-[0.8125rem] text-[var(--grey)]">{{ post.author.title }}</p>
          <p v-if="post.author.bio" class="text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)] line-clamp-3" v-html="post.author.bio" />
        </div>
      </div>
    </section>

    <!-- Related Work (portfolio + case studies) -->
    <section v-if="relatedWork.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Related Work</p>
          <NuxtLink to="/portfolio" class="hue-label hue-link">
            See all <Icon name="lucide:arrow-right" class="size-3" />
          </NuxtLink>
        </div>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="card in relatedWork"
            :key="card.id"
            :to="card.to"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div class="relative flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img
                v-if="card.image"
                :src="card.image"
                :alt="card.name"
                class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-[var(--cloud)]">
                <span class="hue-label-sm">{{ card.name }}</span>
              </div>
            </div>
            <div class="p-6">
              <span class="hue-label-sm">{{ card.service }}</span>
              <span v-if="card.type === 'case-study'" class="hue-label-sm ml-2 text-[var(--silver)]">Case Study</span>
              <h3 class="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1">{{ card.name }}</h3>
              <p v-if="card.excerpt" class="mt-1.5 font-sans text-[0.75rem] font-light leading-snug text-[var(--grey)] line-clamp-2">{{ card.excerpt }}</p>
              <p v-else-if="card.client" class="mt-1 text-[0.75rem] text-[var(--color-text-muted)]">{{ card.client }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Related Articles -->
    <section v-if="relatedPosts?.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">More from the Magazine</p>
          <NuxtLink to="/magazine" class="hue-label hue-link">
            All articles <Icon name="lucide:arrow-right" class="size-3" />
          </NuxtLink>
        </div>
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <MagazineCard
            v-for="rp in relatedPosts"
            :key="rp.id"
            :post="rp"
          />
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <InlineCapture
      :dark="true"
      label="More like this"
      headline="Get brand insights delivered."
      button-text="Subscribe"
      context="Magazine article"
    />
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem, DirectusCaseStudy } from '~/composables/useDirectus'

const route = useRoute()
const { trackArticleView } = useAnalytics()
const { fetchBlogPost, fetchPortfolio, fetchCaseStudies, fetchRelatedBlogPosts, assetUrl } = useDirectus()

const { data: post } = await useAsyncData(
  `blog-${route.params.slug}`,
  () => fetchBlogPost(route.params.slug as string),
)

if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Article not found' })

if (import.meta.client) {
  const author = post.value.author ? [post.value.author.first_name, post.value.author.last_name].filter(Boolean).join(' ') : undefined
  trackArticleView(
    post.value.title ?? '',
    post.value.categories?.[0]?.blog_categories_id?.name,
    author,
  )
}

const primaryCategory = computed(() => post.value?.categories?.[0]?.blog_categories_id ?? null)

const heroImgSrc = computed(() => {
  const id = post.value?.featured_image
  return id ? assetUrl(id, 'hero') : null
})

const authorName = computed(() => {
  const a = post.value?.author
  return a ? [a.first_name, a.last_name].filter(Boolean).join(' ') : ''
})

const authorImgSrc = computed(() => {
  const id = post.value?.author?.photo ?? post.value?.author?.image
  return id ? assetUrl(id, 'avatar') : null
})

const allTags = computed(() => {
  const tags: { name: string; url: string }[] = []
  for (const c of post.value?.categories ?? []) {
    if (c.blog_categories_id?.name && c.blog_categories_id?.slug)
      tags.push({ name: c.blog_categories_id.name, url: `/magazine/category/${c.blog_categories_id.slug}` })
  }
  for (const s of post.value?.services ?? []) {
    if (s.services_id?.name && s.services_id?.url)
      tags.push({ name: s.services_id.name, url: `/creative-services/${s.services_id.url}` })
  }
  for (const i of post.value?.industries ?? []) {
    if (i.industries_id?.name && i.industries_id?.url)
      tags.push({ name: i.industries_id.name, url: `/industries/${i.industries_id.url}` })
  }
  return tags
})

// ── Related Work + Related Articles ──────────────────────────────
const serviceIds = computed(() =>
  (post.value?.services ?? []).map(s => s.services_id?.id).filter(Boolean) as string[]
)
const industryIds = computed(() =>
  (post.value?.industries ?? []).map(i => i.industries_id?.id).filter(Boolean) as string[]
)
const categoryIds = computed(() =>
  (post.value?.categories ?? []).map(c => c.blog_categories_id?.id).filter(Boolean) as (string | number)[]
)

const [{ data: allPortfolio }, { data: allCaseStudies }, { data: relatedPosts }] = await Promise.all([
  useAsyncData('portfolio-all-for-related', () => fetchPortfolio({ limit: 100, parentOnly: true })),
  useAsyncData('case-studies-all-for-related', () => fetchCaseStudies({ limit: 50 })),
  useAsyncData(`blog-related-${route.params.slug}`, () => fetchRelatedBlogPosts({
    serviceIds: serviceIds.value,
    industryIds: industryIds.value,
    categoryIds: categoryIds.value,
    excludeId: post.value?.id,
    limit: 3,
  })),
])

interface WorkCard {
  id: string
  type: 'portfolio' | 'case-study'
  name: string
  excerpt: string | null
  to: string
  image: string | null
  service: string | null
  client: string | null
}

const relatedWork = computed<WorkCard[]>(() => {
  const svcIds = new Set(serviceIds.value)
  const indIds = new Set(industryIds.value)
  if (!svcIds.size && !indIds.size) return []

  const seen = new Set<string>()
  const cards: WorkCard[] = []

  // Case studies first (higher value content for SEO)
  for (const cs of (allCaseStudies.value ?? [])) {
    if (!cs.id || seen.has(cs.id)) continue
    const matchesSvc = (cs.services ?? []).some((s: any) => svcIds.has(s.services_id?.id))
    const matchesInd = (cs.industries ?? []).some((i: any) => indIds.has(i.industries_id?.id))
    if (!matchesSvc && !matchesInd) continue
    seen.add(cs.id)
    cards.push({
      id: cs.id,
      type: 'case-study',
      name: cs.title ?? '',
      excerpt: cs.excerpt ?? null,
      to: `/case-studies/${cs.url}`,
      image: csImage(cs),
      service: cs.services?.[0]?.services_id?.name ?? null,
      client: cs.organization?.name ?? null,
    })
  }

  // Then portfolio items
  for (const p of (allPortfolio.value ?? [])) {
    if (!p.id || seen.has(p.id)) continue
    const matchesSvc = svcIds.size > 0 && svcIds.has(p.service?.id)
    const matchesInd = (p.industries ?? []).some((i: any) => indIds.has(i.industries_id?.id))
    if (!matchesSvc && !matchesInd) continue
    seen.add(p.id)
    cards.push({
      id: p.id,
      type: 'portfolio',
      name: p.name ?? '',
      excerpt: null,
      to: `/portfolio/${p.url}`,
      image: workImgUrl(p),
      service: p.service?.name ?? null,
      client: p.client?.name ?? null,
    })
  }

  return cards.slice(0, 6)
})

function workImgUrl(item: DirectusPortfolioItem) {
  if (item.featured_image) return assetUrl(item.featured_image, 'medium-contain')
  if (item.images?.[0]?.directus_files_id) return assetUrl(item.images[0].directus_files_id, 'medium-contain')
  for (const child of (item.projects ?? []) as DirectusPortfolioItem[]) {
    const id = child.featured_image ?? child.images?.[0]?.directus_files_id
    if (id) return assetUrl(id, 'medium-contain')
  }
  return null
}

function csImage(cs: DirectusCaseStudy): string | null {
  if (cs.featured_image) return assetUrl(cs.featured_image, 'medium-contain')
  if (cs.organization?.logo) return assetUrl(cs.organization.logo, 'medium-contain')
  if (cs.organization?.icon) return assetUrl(cs.organization.icon, 'medium-contain')
  const pi = cs.portfolio_items?.find((p: any) => p.portfolio_id?.featured_image)
  if (pi?.portfolio_id?.featured_image) return assetUrl(pi.portfolio_id.featured_image, 'medium-contain')
  const piGallery = cs.portfolio_items?.find((p: any) => p.portfolio_id?.images?.[0]?.directus_files_id)
  if (piGallery?.portfolio_id?.images?.[0]?.directus_files_id) return assetUrl(piGallery.portfolio_id.images[0].directus_files_id, 'medium-contain')
  for (const link of (cs.portfolio_items ?? [])) {
    for (const child of ((link as any).portfolio_id?.projects ?? []) as any[]) {
      const id = child.featured_image ?? child.images?.[0]?.directus_files_id
      if (id) return assetUrl(id, 'medium-contain')
    }
  }
  return null
}

const ogImageUrl = computed(() => {
  const id = post.value?.featured_image ?? post.value?.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'large') : null
})

const seo = post.value?.seo

useSeoMeta({
  title: seo?.title || `${post.value?.title} | hue: magazine`,
  description: seo?.description || (post.value?.excerpt ?? undefined),
  ogType: 'article',
  ogImage: ogImageUrl.value ?? undefined,
  articlePublishedTime: post.value?.date_published ?? undefined,
  articleAuthor: authorName.value || undefined,
  articleSection: primaryCategory.value?.name ?? undefined,
})

if (!ogImageUrl.value) {
  defineOgImage({
    component: 'HueOg',
    props: {
      title: post.value?.title ?? '',
      description: post.value?.excerpt ?? '',
      label: 'Magazine',
    },
  })
}

useSchemaOrg([
  {
    '@type': 'Article',
    'headline': post.value?.title ?? '',
    'description': post.value?.excerpt ?? '',
    'image': ogImageUrl.value ?? undefined,
    'datePublished': post.value?.date_published ?? undefined,
    'dateModified': post.value?.date_updated ?? undefined,
    'author': {
      '@type': 'Person',
      'name': authorName.value,
    },
  },
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://huestudios.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Magazine', 'item': 'https://huestudios.com/magazine' },
      { '@type': 'ListItem', 'position': 3, 'name': post.value?.title ?? 'Article' },
    ],
  },
])
</script>

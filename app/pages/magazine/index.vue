<template>
  <div>
    <!-- Magazine Cover -->
    <section class="relative flex min-h-[100vh] flex-col overflow-hidden bg-[var(--near-black)]">
      <!-- Cover Image (featured article) -->
      <img
        v-if="featuredImgSrc"
        :src="featuredImgSrc"
        :alt="featuredPost?.title ?? ''"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

      <!-- Masthead -->
      <div class="relative z-10 px-2 md:px-6 pt-16 md:pt-24">
        <div class="hue-container">
          <h1 class="relative leading-none">
            <LayoutLogo color="rgba(255,255,255,0.1)" class="absolute -left-2 -top-[clamp(2rem,5vw,4rem)] h-[clamp(4.5rem,14vw,10rem)] w-auto" />
            <span class="relative ml-[clamp(2rem,6vw,5rem)] block text-[clamp(3rem,9vw,7rem)] italic text-white/60" style="font-family: var(--font-editorial);">magazine</span>
          </h1>
        </div>
      </div>

      <!-- Cover Content -->
      <div class="relative z-10 flex flex-1 flex-col justify-end px-2 md:px-6 pb-12 md:pb-16">
        <div class="hue-container grid gap-12 lg:grid-cols-[1fr_380px]">
          <!-- Lead Story -->
          <div v-if="featuredPost">
            <NuxtLink :to="`/magazine/${featuredPost.slug}`" class="group block">
              <span v-if="featuredCategory" class="mb-2 inline-block border-b border-white/30 pb-1 text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-white/40">
                {{ featuredCategory }}
              </span>
              <h2 class="mb-3 leading-[1] text-white transition-opacity duration-300 group-hover:opacity-80">
                <span class="block text-[clamp(2rem,4vw,3.5rem)] italic text-white/80" style="font-family: var(--font-editorial);">{{ firstWord }}</span>
                <span class="block text-[clamp(1.25rem,2.5vw,2rem)] font-light leading-[1.15]">{{ restOfTitle }}</span>
              </h2>
              <p v-if="featuredPost.excerpt" class="mb-4 max-w-lg text-[0.75rem] leading-[1.45] text-white/40">
                {{ featuredPost.excerpt }}
              </p>
              <div v-if="featuredPost.author" class="flex items-center gap-2 text-[0.5rem] font-medium uppercase tracking-[0.15em] text-white/25">
                <span>{{ authorName(featuredPost) }}</span>
                <span>&middot;</span>
                <span>{{ formatDate(featuredPost.date_published ?? featuredPost.date_created) }}</span>
                <span v-if="featuredPost.reading_time">&middot; {{ featuredPost.reading_time }} min read</span>
              </div>
            </NuxtLink>
          </div>

          <!-- Secondary Headlines -->
          <div v-if="coverPosts.length" class="flex flex-col justify-end space-y-5 pl-8">
            <p class="text-[0.5rem] font-medium uppercase tracking-[0.25em] text-white/25">Also in this issue</p>
            <NuxtLink
              v-for="post in coverPosts"
              :key="post.id"
              :to="`/magazine/${post.slug}`"
              class="group block"
            >
              <span v-if="postCategory(post)" class="mb-0.5 block text-[0.5rem] font-medium uppercase tracking-[0.2em] text-white/25">
                {{ postCategory(post) }}
              </span>
              <h3 class="text-[0.9375rem] font-light leading-[1.3] text-white/70 transition-opacity duration-300 group-hover:opacity-50">
                {{ post.title }}
              </h3>
              <span class="mt-0.5 block text-[0.5625rem] text-white/25">{{ authorName(post) }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section v-if="categories?.length" class="border-b border-[var(--silk)] px-2 md:px-6 py-5">
      <div class="hue-container flex flex-wrap items-center gap-3">
        <button
          :class="!activeCategory ? 'border-[var(--near-black)] text-[var(--near-black)]' : 'text-[var(--grey)] hover:text-[var(--near-black)]'"
          class="border-b border-transparent px-2 pb-1 text-[0.625rem] font-medium uppercase tracking-wider transition-all"
          @click="activeCategory = null"
        >All</button>
        <button
          v-for="cat in categories"
          :key="cat.slug!"
          :class="activeCategory === cat.slug ? 'border-[var(--near-black)] text-[var(--near-black)]' : 'text-[var(--grey)] hover:text-[var(--near-black)]'"
          class="border-b border-transparent px-2 pb-1 text-[0.625rem] font-medium uppercase tracking-wider transition-all"
          @click="activeCategory = activeCategory === cat.slug ? null : cat.slug"
        >{{ cat.name }}</button>
      </div>
    </section>

    <!-- All Articles Grid -->
    <section class="hue-section px-2 md:px-6 py-16 md:py-24">
      <div class="hue-container">
        <p class="hue-label mb-12">All Articles</p>

        <div v-if="pending" class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="mb-4 bg-[var(--cloud)]" style="aspect-ratio: 4/3;" />
            <div class="h-4 w-3/4 bg-[var(--cloud)]" />
            <div class="mt-2 h-3 w-1/2 bg-[var(--cloud)]" />
          </div>
        </div>

        <div v-else-if="gridPosts.length" class="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          <MagazineCard
            v-for="post in gridPosts"
            :key="post.id"
            :post="post"
          />
        </div>

        <div v-else class="py-20 text-center">
          <p class="hue-editorial-lg">No articles match this filter.</p>
          <button class="hue-link mt-4" @click="activeCategory = null">Show all articles</button>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <InlineCapture
      :dark="true"
      label="Stay in the loop"
      headline="Get brand insights delivered."
      button-text="Subscribe"
      context="Magazine newsletter"
    />
  </div>
</template>

<script setup lang="ts">
import type { DirectusBlogPost } from '~/composables/useDirectus'

definePageMeta({ layout: 'magazine' })

const { fetchBlogPosts, fetchBlogCategories, assetUrl } = useDirectus()

const activeCategory = ref<string | null>(null)

const { data: categories } = await useAsyncData('blog-categories', () => fetchBlogCategories())
const { data: allPosts, pending } = await useAsyncData(
  'blog-posts',
  () => fetchBlogPosts({ limit: 50 }),
)

// Cover layout: featured post is the hero, next 2-3 are sidebar headlines
const featuredPost = computed(() =>
  (allPosts.value ?? []).find(p => p.featured) ?? (allPosts.value ?? [])[0] ?? null
)

const coverPosts = computed(() =>
  (allPosts.value ?? [])
    .filter(p => p.id !== featuredPost.value?.id)
    .slice(0, 3)
)

// Grid shows ALL posts (including featured + cover posts) for browsing
const gridPosts = computed(() => {
  const posts = allPosts.value ?? []
  if (!activeCategory.value) return posts
  return posts.filter(p =>
    p.categories?.some(c => c.blog_categories_id?.slug === activeCategory.value)
  )
})

const featuredImgSrc = computed(() => {
  const id = featuredPost.value?.featured_image
  return id ? assetUrl(id, { width: 1920, quality: 85 }) : null
})

const featuredCategory = computed(() => featuredPost.value?.categories?.[0]?.blog_categories_id?.name)

const firstWord = computed(() => featuredPost.value?.title?.split(' ')[0] ?? '')
const restOfTitle = computed(() => featuredPost.value?.title?.split(' ').slice(1).join(' ') ?? '')

function postCategory(post: DirectusBlogPost) {
  return post.categories?.[0]?.blog_categories_id?.name ?? null
}

function authorName(post: DirectusBlogPost) {
  const a = post.author
  return a ? [a.first_name, a.last_name].filter(Boolean).join(' ') : ''
}

function formatDate(d: string | null | undefined) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: 'hue: magazine | Brand Strategy & Design Insights',
  description: 'Perspectives on brand strategy, design, and the business of creative excellence from Hue Creative Agency.',
})

defineOgImage({ component: 'HueOg', props: { title: 'hue: magazine', description: 'Brand strategy & design insights', label: 'Magazine' } })
</script>

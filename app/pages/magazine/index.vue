<template>
  <div>
    <!-- Magazine Cover Hero -->
    <section class="hue-section-dark relative overflow-hidden px-6 py-24 md:py-36">
      <div class="hue-container relative z-10">
        <div class="mb-6">
          <h1 class="leading-none">
            <span class="block text-[clamp(3rem,8vw,6rem)] font-[200] tracking-[-0.03em] text-white">hue:</span>
            <span class="block font-[var(--font-editorial)] text-[clamp(2.5rem,7vw,5rem)] italic text-white/70" style="font-family: var(--font-editorial);">magazine</span>
          </h1>
        </div>
        <p class="max-w-md text-[1.0625rem] leading-relaxed text-white/40">
          Perspectives on brand strategy, design, and the business of creative excellence.
        </p>
      </div>
    </section>

    <!-- Featured Article -->
    <section v-if="featuredPost" class="border-b border-[var(--silk)]">
      <NuxtLink :to="`/magazine/${featuredPost.slug}`" class="group grid lg:grid-cols-2">
        <div class="relative overflow-hidden bg-[var(--cloud)]" style="aspect-ratio: 4/3; min-height: 400px;">
          <img
            v-if="featuredImgSrc"
            :src="featuredImgSrc"
            :alt="featuredPost.title ?? ''"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
        <div class="flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-20">
          <span v-if="featuredCategory" class="hue-label-sm mb-4 tracking-[0.15em]" :style="featuredCategoryColor ? `color: ${featuredCategoryColor}` : ''">
            {{ featuredCategory }}
          </span>
          <h2 class="mb-4 text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-[1.15]">
            {{ featuredPost.title }}
          </h2>
          <p v-if="featuredPost.excerpt" class="mb-6 max-w-lg text-[1rem] leading-relaxed text-[var(--grey)]">
            {{ featuredPost.excerpt }}
          </p>
          <MagazineAuthorCard
            v-if="featuredPost.author"
            :author="featuredPost.author"
            :date="featuredPost.date_published ?? featuredPost.date_created"
            :reading-time="featuredPost.reading_time"
          />
        </div>
      </NuxtLink>
    </section>

    <!-- Category Filter -->
    <section v-if="categories.length" class="border-b border-[var(--silk)] px-6 py-5">
      <div class="hue-container flex flex-wrap items-center gap-3">
        <button
          :class="!activeCategory ? 'bg-[var(--near-black)] text-white' : 'bg-transparent text-[var(--grey)] hover:text-[var(--near-black)]'"
          class="rounded-full border border-[var(--silk)] px-4 py-1.5 text-[0.8125rem] transition-all"
          @click="activeCategory = null"
        >All</button>
        <button
          v-for="cat in categories"
          :key="cat.slug!"
          :class="activeCategory === cat.slug ? 'bg-[var(--near-black)] text-white' : 'bg-transparent text-[var(--grey)] hover:text-[var(--near-black)]'"
          class="rounded-full border border-[var(--silk)] px-4 py-1.5 text-[0.8125rem] transition-all"
          @click="activeCategory = activeCategory === cat.slug ? null : cat.slug"
        >{{ cat.name }}</button>
      </div>
    </section>

    <!-- Editorial Grid -->
    <section class="hue-section px-6 py-16 md:py-24">
      <div class="hue-container">
        <div v-if="pending" class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="mb-4 bg-[var(--cloud)]" style="aspect-ratio: 4/3;" />
            <div class="h-4 w-3/4 bg-[var(--cloud)]" />
            <div class="mt-2 h-3 w-1/2 bg-[var(--cloud)]" />
          </div>
        </div>

        <div v-else-if="gridPosts.length" class="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          <!-- First two are large -->
          <MagazineCard
            v-for="(post, i) in gridPosts"
            :key="post.id"
            :post="post"
            :large="i < 2"
            :class="i < 2 ? 'lg:col-span-1' : ''"
          />
        </div>

        <div v-else class="py-20 text-center">
          <p class="hue-editorial-lg">Articles coming soon.</p>
          <p class="mt-3 text-[0.875rem] text-[var(--grey)]">Subscribe below to be the first to know.</p>
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
const { fetchBlogPosts, fetchBlogCategories, assetUrl } = useDirectus()

const activeCategory = ref<string | null>(null)

const { data: categories } = await useAsyncData('blog-categories', () => fetchBlogCategories())
const { data: allPosts, pending } = await useAsyncData(
  'blog-posts',
  () => fetchBlogPosts({ limit: 50 }),
)

const featuredPost = computed(() =>
  (allPosts.value ?? []).find(p => p.featured) ?? (allPosts.value ?? [])[0] ?? null
)

const featuredImgSrc = computed(() => {
  const id = featuredPost.value?.featured_image
  return id ? assetUrl(id, { width: 1200, quality: 80 }) : null
})

const featuredCategory = computed(() => featuredPost.value?.categories?.[0]?.blog_categories_id?.name)
const featuredCategoryColor = computed(() => featuredPost.value?.categories?.[0]?.blog_categories_id?.color)

const gridPosts = computed(() => {
  const posts = (allPosts.value ?? []).filter(p => p.id !== featuredPost.value?.id)
  if (!activeCategory.value) return posts
  return posts.filter(p =>
    p.categories?.some(c => c.blog_categories_id?.slug === activeCategory.value)
  )
})

useSeoMeta({
  title: 'hue: magazine | Brand Strategy & Design Insights',
  description: 'Perspectives on brand strategy, design, and the business of creative excellence from Hue Creative Agency.',
})

defineOgImage({ component: 'HueOg', props: { title: 'hue: magazine', description: 'Brand strategy & design insights', label: 'Magazine' } })
</script>

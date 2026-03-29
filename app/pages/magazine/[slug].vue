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
const route = useRoute()
const { fetchBlogPost, assetUrl } = useDirectus()

const { data: post } = await useAsyncData(
  `blog-${route.params.slug}`,
  () => fetchBlogPost(route.params.slug as string),
)

if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Article not found' })

const primaryCategory = computed(() => post.value?.categories?.[0]?.blog_categories_id ?? null)

const heroImgSrc = computed(() => {
  const id = post.value?.featured_image
  return id ? assetUrl(id, { width: 1400, quality: 85 }) : null
})

const authorName = computed(() => {
  const a = post.value?.author
  return a ? [a.first_name, a.last_name].filter(Boolean).join(' ') : ''
})

const authorImgSrc = computed(() => {
  const id = post.value?.author?.photo ?? post.value?.author?.image
  return id ? assetUrl(id, { width: 160, height: 160, quality: 80 }) : null
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

const ogImageUrl = computed(() => {
  const id = post.value?.featured_image ?? post.value?.images?.[0]?.directus_files_id
  return id ? assetUrl(id, { width: 1200, height: 630, quality: 85 }) : null
})

const seo = post.value?.seo

useSeoMeta({
  title: seo?.title || `${post.value?.title} | hue: magazine`,
  description: seo?.description || post.value?.excerpt ?? undefined,
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
])
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <div class="border-b border-[var(--silk)] bg-white px-2 md:px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/magazine" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" /> Magazine
        </NuxtLink>
      </div>
    </div>

    <!-- Category Hero -->
    <section class="hue-section px-2 md:px-6 py-16 md:py-24">
      <div class="hue-container">
        <p class="hue-label mb-4">Category</p>
        <h1 class="hue-display-lg mb-4">{{ categoryName }}</h1>
        <p v-if="categoryDescription" class="hue-body-lg max-w-xl text-[var(--grey)]">{{ categoryDescription }}</p>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="hue-section-alt px-2 md:px-6 py-16">
      <div class="hue-container">
        <div v-if="pending" class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="mb-4 bg-[var(--cloud)]" style="aspect-ratio: 4/3;" />
            <div class="h-4 w-3/4 bg-[var(--cloud)]" />
          </div>
        </div>

        <div v-else-if="posts.length" class="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          <MagazineCard v-for="post in posts" :key="post.id" :post="post" />
        </div>

        <div v-else class="py-20 text-center">
          <p class="hue-editorial-lg">No articles in this category yet.</p>
          <NuxtLink to="/magazine" class="hue-link mt-4 inline-flex">
            Browse all articles <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <InlineCapture
      :dark="true"
      label="Stay in the loop"
      headline="Get brand insights delivered."
      button-text="Subscribe"
      context="Magazine category"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { fetchBlogPosts, fetchBlogCategories } = useDirectus()

const { data: categories } = await useAsyncData('blog-categories', () => fetchBlogCategories())
const category = computed(() => (categories.value ?? []).find(c => c.slug === slug))

const categoryName = computed(() => category.value?.name ?? slug)
const categoryDescription = computed(() => category.value?.description)

const { data: posts, pending } = await useAsyncData(
  `blog-category-${slug}`,
  () => fetchBlogPosts({ limit: 50, category: slug }),
)

useSeoMeta({
  title: `${categoryName.value} | hue: magazine`,
  description: `Articles about ${categoryName.value} from Hue Creative Agency.`,
})

defineOgImage({ component: 'HueOg', props: { title: categoryName.value, description: `Articles about ${categoryName.value}`, label: 'Magazine' } })
</script>

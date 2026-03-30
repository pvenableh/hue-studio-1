<template>
  <NuxtLink :to="`/magazine/${post.slug}`" class="group block">
    <div class="relative overflow-hidden bg-[var(--cloud)]" :style="{ aspectRatio: large ? '3/4' : '4/3' }">
      <img
        v-if="imgSrc"
        :src="imgSrc"
        :alt="post.title ?? ''"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
    <div :class="large ? 'pt-8' : 'pt-5'">
      <div v-if="categoryName" class="mb-2">
        <span class="hue-label-sm tracking-[0.15em]" :style="categoryColor ? `color: ${categoryColor}` : ''">
          {{ categoryName }}
        </span>
      </div>
      <h3 :class="large ? 'text-[1.75rem] md:text-[2.25rem] font-light leading-[1.15]' : 'text-[1.125rem] font-light leading-tight'">
        {{ post.title }}
      </h3>
      <p v-if="post.excerpt" class="mt-2 text-[0.875rem] leading-relaxed text-[var(--grey)]" :class="large ? 'line-clamp-3' : 'line-clamp-2'">
        {{ post.excerpt }}
      </p>
      <div class="mt-3 flex items-center gap-3 text-[0.75rem] text-[var(--silver)]">
        <span v-if="authorName">{{ authorName }}</span>
        <span v-if="authorName && formattedDate" class="text-[var(--silk)]">&middot;</span>
        <span v-if="formattedDate">{{ formattedDate }}</span>
        <span v-if="post.reading_time" class="text-[var(--silk)]">&middot;</span>
        <span v-if="post.reading_time">{{ post.reading_time }} min read</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { DirectusBlogPost } from '~/composables/useDirectus'

const props = defineProps<{
  post: DirectusBlogPost
  large?: boolean
}>()

const { assetUrl } = useDirectus()

const imgSrc = computed(() => {
  const id = props.post.featured_image ?? props.post.images?.[0]?.directus_files_id
  return id ? assetUrl(id, props.large ? 'large' : 'medium') : null
})

const categoryName = computed(() => props.post.categories?.[0]?.blog_categories_id?.name)
const categoryColor = computed(() => props.post.categories?.[0]?.blog_categories_id?.color)

const authorName = computed(() => {
  const a = props.post.author
  if (!a) return null
  return [a.first_name, a.last_name].filter(Boolean).join(' ')
})

const formattedDate = computed(() => {
  const d = props.post.date_published ?? props.post.date_created
  if (!d) return null
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})
</script>

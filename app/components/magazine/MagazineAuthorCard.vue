<template>
  <div class="flex items-center gap-4">
    <NuxtLink v-if="author.url" :to="`/team/${author.url}`" class="shrink-0">
      <img
        v-if="avatarSrc"
        :src="avatarSrc"
        :alt="fullName"
        class="h-12 w-12 rounded-full object-cover"
      />
      <div v-else class="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--cloud)]">
        <span class="text-[0.75rem] font-medium text-[var(--grey)]">{{ initials }}</span>
      </div>
    </NuxtLink>
    <div>
      <NuxtLink v-if="author.url" :to="`/team/${author.url}`" class="text-[0.875rem] font-medium hover:text-[var(--accent)] transition-colors">
        {{ fullName }}
      </NuxtLink>
      <p v-else class="text-[0.875rem] font-medium">{{ fullName }}</p>
      <div class="flex items-center gap-2 text-[0.75rem] text-[var(--grey)]">
        <span v-if="author.title">{{ author.title }}</span>
        <template v-if="date">
          <span v-if="author.title" class="text-[var(--silver)]">&middot;</span>
          <span>{{ formattedDate }}</span>
        </template>
        <template v-if="readingTime">
          <span class="text-[var(--silver)]">&middot;</span>
          <span>{{ readingTime }} min read</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusBlogAuthor } from '~/composables/useDirectus'

const props = defineProps<{
  author: DirectusBlogAuthor
  date?: string | null
  readingTime?: number | null
}>()

const { assetUrl } = useDirectus()

const fullName = computed(() => [props.author.first_name, props.author.last_name].filter(Boolean).join(' '))
const initials = computed(() => [props.author.first_name?.[0], props.author.last_name?.[0]].filter(Boolean).join(''))

const avatarSrc = computed(() => {
  const id = props.author.photo ?? props.author.image
  return id ? assetUrl(id, 'avatar') : null
})

const formattedDate = computed(() => {
  if (!props.date) return null
  return new Date(props.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})
</script>

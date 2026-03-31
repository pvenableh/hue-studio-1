<template>
  <NuxtLink
    :to="`/case-studies/${cs.url}`"
    class="group grid overflow-hidden md:grid-cols-2"
    :class="reverse ? 'md:[direction:rtl]' : ''"
  >
    <!-- Image -->
    <div
      class="relative flex items-center justify-center overflow-hidden"
      :class="reverse ? 'md:[direction:ltr]' : ''"
      style="aspect-ratio: 4/3"
    >
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="cs.title ?? ''"
        class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        :loading="eager ? 'eager' : 'lazy'"
      />
      <div v-else class="flex h-full w-full items-center justify-center">
        <span class="hue-label">{{ cs.organization?.name ?? cs.client ?? cs.title }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col justify-between p-10 md:[direction:ltr]">
      <div>
        <p v-if="number" class="mb-2 text-[0.625rem] tracking-widest text-[var(--silver)]">{{ number }} / Featured</p>
        <p class="hue-label-sm mb-3" style="color: var(--color-accent);">{{ primaryService }}{{ industry ? ` · ${industry}` : '' }}</p>
        <h2 class="mb-4 text-[1.25rem] font-light uppercase tracking-[0.08em] leading-tight">{{ cs.title }}</h2>
        <p
          v-if="cs.excerpt"
          class="mb-6 line-clamp-3 text-[0.875rem] leading-relaxed text-[var(--grey)]"
        >{{ cs.excerpt }}</p>
        <!-- Result callout -->
        <div v-if="cs.results" class="mb-6 border-l-2 border-[var(--color-accent)] bg-[var(--snow)] py-2 pl-4">
          <p class="mb-1 text-[0.5625rem] font-medium uppercase tracking-widest" style="color: var(--color-accent);">Business Outcome</p>
          <p class="line-clamp-2 text-[0.9375rem] italic leading-snug" style="font-family:var(--font-editorial);" v-html="stripHtml(cs.results)" />
        </div>
      </div>
      <div class="flex items-end justify-between">
        <div class="flex gap-6">
          <div v-if="primaryService">
            <p class="hue-label-sm mb-1 text-[var(--silver)]">Services</p>
            <p class="text-[0.75rem] text-[var(--grey)]">{{ allServices.join(', ') }}</p>
          </div>
        </div>
        <span class="text-[0.6875rem] uppercase tracking-wider" style="color: var(--color-accent);">View Case Study →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { DirectusCaseStudy } from '~/composables/useDirectus'

const props = defineProps<{
  cs: DirectusCaseStudy
  imageSrc?: string | null
  eager?: boolean
  number?: string
  reverse?: boolean
}>()

const { stripHtml } = useDirectus()

const allServices = computed(() =>
  (props.cs.services ?? []).map((s) => s.services_id?.name).filter(Boolean) as string[]
)

const primaryService = computed(() => allServices.value[0] ?? '')

const industry = computed(() =>
  props.cs.industries?.[0]?.industries_id?.name?.split('/')[0]?.trim() ?? ''
)
</script>

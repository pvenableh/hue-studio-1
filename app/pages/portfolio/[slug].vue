<template>
  <div v-if="item">
    <!-- Back -->
    <div class="border-b border-[var(--silk)] bg-white px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/portfolio" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" />
          All Work
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="grid border-b border-[var(--silk)] lg:grid-cols-2">
      <div class="px-8 py-16 lg:px-14 lg:py-20">
        <p class="hue-label mb-4">{{ item.service?.name }}</p>
        <h1 class="hue-display-lg mb-5">{{ item.name }}</h1>
        <p v-if="item.client" class="mb-6 text-[0.9rem] text-[var(--grey)]">{{ item.client.name }}</p>
        <p v-if="item.description" class="hue-body-lg max-w-lg" v-html="item.description" />
      </div>
      <div class="bg-[var(--near-black)] px-10 py-16 lg:px-12">
        <p v-if="item.caption" class="hue-editorial-lg mb-10 text-white/80 italic" v-html="stripTags(item.caption)" />
        <div class="space-y-4 border-t border-white/10 pt-8">
          <div v-if="item.service" class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Service</span>
            <span class="text-[0.8125rem] text-white/60">{{ item.service.name }}</span>
          </div>
          <div v-if="item.client?.website" class="flex justify-between border-b border-white/5 pb-3">
            <span class="hue-label-sm text-white/30">Client</span>
            <a :href="item.client.website" target="_blank" class="text-[0.8125rem] text-white/60 hover:text-white">
              {{ item.client.name }}
            </a>
          </div>
          <div v-for="ind in validIndustries" :key="ind.id" class="flex justify-between pb-3">
            <span class="hue-label-sm text-white/30">Industry</span>
            <NuxtLink :to="`/industries/${ind.url}`" class="text-[0.8125rem] text-white/60 hover:text-white">
              {{ ind.name.split('/')[0].trim() }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured image -->
    <section v-if="item.featured_image" class="border-b border-[var(--silk)]">
      <img
        :src="assetUrl(item.featured_image, { width: 1400, height: 700, fit: 'cover', quality: 85 })"
        :alt="item.name"
        class="w-full object-cover"
        style="max-height: 60vh;"
      />
    </section>

    <!-- Challenge -->
    <section v-if="item.challenge" class="hue-section px-6 py-20">
      <div class="hue-container grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <span class="hue-label-sm text-[var(--silver)]">01</span>
          <p class="hue-label mt-1">The Challenge</p>
        </div>
        <div>
          <p class="hue-body-lg max-w-2xl" v-html="item.challenge" />
        </div>
      </div>
    </section>

    <!-- Image gallery -->
    <section v-if="galleryImages.length > 1" class="border-t border-[var(--silk)] px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Gallery</p>
        <div class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)]"
          :class="galleryImages.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
          <img
            v-for="(img, i) in galleryImages"
            :key="img.directus_files_id"
            :src="assetUrl(img.directus_files_id, { width: 700, height: 500, fit: 'cover', quality: 80 })"
            :alt="`${item.name} — image ${i + 1}`"
            class="w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Before / After - resolved from junction table -->
    <section v-if="beforeAfters.length" class="hue-section-alt px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-8">Before &amp; After</p>
        <div
          v-for="ba in beforeAfters"
          :key="ba.id"
          class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 mb-4"
        >
          <div v-if="ba.before_image" class="bg-white">
            <div class="flex items-center gap-2 border-b border-[var(--silk)] px-6 py-3">
              <div class="h-2 w-2 rounded-full bg-[var(--silver)]" />
              <span class="hue-label-sm text-[var(--grey)]">Before</span>
            </div>
            <img :src="assetUrl(ba.before_image, { width: 700, quality: 80 })" class="w-full object-cover" loading="lazy" :alt="`${item?.name} — before`" />
            <p v-if="ba.caption" class="px-6 py-4 text-[0.8125rem] text-[var(--grey)]">{{ ba.caption }}</p>
          </div>
          <div v-if="ba.after_image" class="bg-white">
            <div class="flex items-center gap-2 border-b border-[var(--silk)] px-6 py-3">
              <div class="h-2 w-2 rounded-full bg-[var(--near-black)]" />
              <span class="hue-label-sm">After</span>
            </div>
            <img :src="assetUrl(ba.after_image, { width: 700, quality: 80 })" class="w-full object-cover" loading="lazy" :alt="`${item?.name} — after`" />
            <p v-if="ba.title" class="px-6 py-4 text-[0.8125rem] text-[var(--grey)]">{{ ba.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related industry -->
    <section v-if="validIndustries.length" class="hue-section px-6 py-16">
      <div class="hue-container flex flex-wrap items-center gap-4">
        <p class="hue-label">More in this industry</p>
        <NuxtLink
          v-for="ind in validIndustries"
          :key="ind.id"
          :to="`/industries/${ind.url}`"
          class="hue-btn-outline text-[0.8125rem]"
        >
          {{ ind.name.split('/')[0].trim() }} →
        </NuxtLink>
      </div>
    </section>

    <!-- CTA -->
    <section class="hue-section-dark px-6 py-24 text-center">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-5 text-white">Start your project.</h2>
        <p class="mb-8 text-[0.9375rem] text-white/40">30-minute discovery call. No obligations.</p>
        <NuxtLink to="/contact" class="hue-btn-ghost">
          Schedule a Call
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>
  </div>

  <div v-else class="flex min-h-[60vh] items-center justify-center text-center">
    <div>
      <h1 class="hue-display-lg mb-4">Project Not Found</h1>
      <NuxtLink to="/portfolio" class="hue-link">← All Work</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { fetchPortfolioItem, assetUrl, resolvedBeforeAfters, stripHtml } = useDirectus()

const { data: item } = await useAsyncData(`portfolio-${slug}`, () => fetchPortfolioItem(slug))

if (!item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const validIndustries = computed(() =>
  (item.value?.industries ?? []).map((i) => i.industries_id).filter(Boolean)
)

const galleryImages = computed(() => item.value?.images ?? [])

// Use the helper to resolve the before/after junction table correctly
const beforeAfters = computed(() => item.value ? resolvedBeforeAfters(item.value) : [])

function stripTags(html: string) { return stripHtml(html) }

useSeoMeta({
  title: `${item.value?.name ?? 'Project'} | Portfolio | Hue Creative Agency`,
  description: item.value?.caption ? stripHtml(item.value.caption) : 'Portfolio project by Hue Creative Agency.',
})
</script>

<template>
  <div v-if="industry">
    <div class="border-b border-[var(--silk)] bg-white px-6 py-3">
      <div class="hue-container">
        <NuxtLink to="/industries" class="hue-link text-[0.8125rem] text-[var(--grey)]">
          <Icon name="lucide:arrow-left" class="size-3.5" /> All Industries
        </NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="grid border-b border-[var(--silk)] lg:grid-cols-[1fr_360px]">
      <div class="px-8 py-16 lg:px-14 lg:py-20">
        <p class="hue-label mb-4">Industry</p>
        <h1 class="hue-display-lg mb-5">{{ industry.name }}</h1>
        <p class="hue-editorial-md mb-6">"{{ industry.headline }}"</p>
        <p class="hue-body-lg max-w-lg">{{ industry.description }}</p>
      </div>
      <div class="bg-[var(--near-black)] px-10 py-16">
        <p class="hue-label-sm mb-5 text-white/30">Clients in this sector</p>
        <div class="mb-8 space-y-2">
          <p v-for="c in industry.clients" :key="c" class="text-[0.875rem] text-white/60">{{ c }}</p>
          <p v-if="!industry.clients.length" class="text-[0.875rem] text-white/30 italic">Portfolio work available — enquire directly.</p>
        </div>
        <div v-if="industry.quote" class="border-t border-white/10 pt-8">
          <p class="hue-editorial-md italic text-white/70">"{{ industry.quote.text }}"</p>
          <p class="mt-3 hue-label-sm text-white/30">— {{ industry.quote.author }}</p>
        </div>
      </div>
    </section>

    <!-- Challenges & Solutions -->
    <section class="hue-section px-6 py-20">
      <div class="hue-container grid gap-12 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-8">Common challenges</p>
          <ul class="space-y-4">
            <li v-for="c in industry.challenges" :key="c" class="flex items-start gap-3">
              <span class="mt-2 block h-px w-4 shrink-0 bg-[var(--silver)]" />
              <p class="text-[0.9375rem] text-[var(--color-text-secondary)]">{{ c }}</p>
            </li>
          </ul>
        </div>
        <div>
          <p class="hue-label mb-8">How we help</p>
          <ul class="space-y-4">
            <li v-for="s in industry.solutions" :key="s" class="flex items-start gap-3">
              <span class="mt-2 block h-px w-4 shrink-0 bg-[var(--near-black)]" />
              <p class="text-[0.9375rem] text-[var(--color-text-secondary)]">{{ s }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Services for this industry -->
    <section class="hue-section-alt px-6 py-20">
      <div class="hue-container">
        <p class="hue-label mb-8">Services we provide</p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="svc in industry.services"
            :key="svc"
            :to="`/creative-services/${svcSlug(svc)}`"
            class="rounded-full border border-[var(--silk)] bg-white px-5 py-2.5 text-[0.875rem] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ svc }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Portfolio for this industry (live Directus) -->
    <section class="hue-section px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Work in this industry</p>
          <NuxtLink :to="`/portfolio?industry=${encodeURIComponent(industry.name)}`" class="hue-link text-[0.8125rem]">
            See all <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>

        <div v-if="pending" class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-3">
          <div v-for="i in 3" :key="i" class="h-64 animate-pulse bg-[var(--cloud)]" />
        </div>

        <div v-else-if="industryProjects.length" class="grid gap-px overflow-hidden rounded-xl border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="item in industryProjects"
            :key="item.id"
            :to="`/portfolio/${item.slug || item.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div class="relative overflow-hidden" style="aspect-ratio: 4/3;">
              <img
                v-if="imgUrl(item)"
                :src="imgUrl(item)"
                :alt="item.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-[var(--cloud)]">
                <span class="hue-label-sm">{{ item.client?.short_name }}</span>
              </div>
            </div>
            <div class="p-6">
              <span class="hue-label-sm">{{ item.service?.name }}</span>
              <h3 class="mt-2 text-[1rem] font-light transition-transform duration-300 group-hover:translate-x-1">{{ item.name }}</h3>
              <p v-if="item.client" class="mt-1 text-[0.8125rem] text-[var(--color-text-muted)]">{{ item.client.name }}</p>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="rounded-xl border border-[var(--silk)] bg-[var(--snow)] py-16 text-center">
          <p class="hue-editorial-md">Portfolio for this industry coming soon.</p>
          <NuxtLink to="/portfolio" class="hue-link mt-4 inline-flex">Browse all work <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
        </div>
      </div>
    </section>

    <!-- Other industries -->
    <section class="hue-section-alt px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">Explore other industries</p>
          <NuxtLink
            v-for="ind in otherIndustries"
            :key="ind.slug"
            :to="`/industries/${ind.slug}`"
            class="rounded-full border border-[var(--silk)] px-4 py-2 text-[0.8125rem] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ ind.shortName }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div class="px-6 pb-0">
      <div class="hue-container">
        <div class="overflow-hidden rounded-t-2xl bg-[var(--near-black)] px-10 py-16 text-center">
          <h2 class="hue-display-lg mb-4 text-white">
            In {{ industry.shortName }}?<br>Let's talk about
            <span style="font-family:var(--font-editorial);font-style:italic;">your brand.</span>
          </h2>
          <p class="mb-8 text-[0.9375rem] text-white/40">30-minute strategy session. No obligations.</p>
          <NuxtLink to="/contact" class="hue-btn-ghost">
            Book a Strategy Session <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'
import { industries, getIndustryBySlug } from '~/data/industries'
import { serviceDetails } from '~/data/services'

const route = useRoute()
const industry = getIndustryBySlug(route.params.slug as string)
if (!industry) throw createError({ statusCode: 404, statusMessage: 'Industry not found' })

const { fetchPortfolio, assetUrl } = useDirectus()

const { data: allItems, pending } = await useAsyncData(
  `industry-portfolio-${industry.slug}`,
  () => fetchPortfolio({ limit: 100 })
)

const industryProjects = computed(() =>
  (allItems.value ?? []).filter((p) =>
    p.industries?.some((i) => {
      const name = i.industries_id?.name ?? ''
      return industry.name.split('/').some((part) => name.includes(part.trim()))
    })
  ).slice(0, 6)
)

const otherIndustries = computed(() =>
  industries.filter((i) => i.slug !== industry!.slug).slice(0, 5)
)

function imgUrl(item: DirectusPortfolioItem) {
  const id = item.featured_image ?? item.images?.[0]?.directus_files_id
  return id ? assetUrl(id, { width: 600, height: 400, fit: 'cover', quality: 80 }) : null
}

function svcSlug(name: string) {
  return serviceDetails.find((s) => s.name.toLowerCase().includes(name.toLowerCase().split('&')[0].trim()))?.slug ?? ''
}

useSeoMeta({
  title: `${industry.name} | Industries | Hue Creative Agency`,
  description: industry.description,
})
</script>

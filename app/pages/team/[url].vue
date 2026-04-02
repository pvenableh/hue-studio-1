<template>
  <div v-if="member">
    <!-- Hero -->
    <section ref="heroRef" class="relative overflow-hidden bg-[var(--near-black)]" style="height: clamp(500px, 70vh, 800px);">
      <!-- Blurred background fill -->
      <img
        v-if="heroImgSrc"
        :src="heroImgSrc"
        :alt="''"
        aria-hidden="true"
        class="absolute inset-0 h-full w-full object-cover blur-2xl scale-110 opacity-40"
        style="object-position: center 0%;"
      />

      <!-- Sharp portrait centered -->
      <img
        v-if="heroImgSrc"
        ref="bgWordRef"
        :src="heroImgSrc"
        :alt="fullName"
        class="absolute inset-0 mx-auto h-full object-contain drop-shadow-2xl"
        style="object-position: center top;"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <!-- Name overlay -->
      <h1
        ref="heroTitle"
        class="absolute bottom-[clamp(2.5rem,6vw,4rem)] left-0 px-4 md:px-10 uppercase leading-[0.95] tracking-[0.08em] font-light text-white/90"
        style="font-family: var(--font); font-size: clamp(2.5rem, 6vw, 4.5rem);"
      >
        {{ member.first_name }}<br />
        <span class="font-serif italic opacity-70" style="font-size: 0.6em; letter-spacing: 0;">{{ member.last_name }}</span>
      </h1>
    </section>

    <!-- Info + Bio -->
    <section class="px-2 md:px-6 py-16 md:py-20">
      <div class="hue-container grid gap-16 lg:grid-cols-[1fr_320px]">
        <div>
          <p class="hue-label mb-2">{{ member.title }}</p>
          <p v-if="member.headline" class="hue-editorial-md mt-2 mb-10 max-w-lg">{{ member.headline }}</p>
          <div v-if="member.extended_bio || member.bio" class="hue-body-lg max-w-2xl space-y-5 text-[var(--color-text-secondary)]" v-html="member.extended_bio ?? member.bio" />
        </div>
        <div class="space-y-8 lg:pt-2">
          <!-- Contact -->
          <div v-if="member.linkedin_url || member.email" class="space-y-3">
            <a
              v-if="member.linkedin_url"
              :href="member.linkedin_url"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-[0.75rem] text-[var(--grey)] transition-colors hover:text-[var(--color-text)]"
            >
              <Icon name="lucide:linkedin" class="size-3.5" /> LinkedIn
            </a>
            <a
              v-if="member.email"
              :href="`mailto:${member.email}`"
              class="block text-[0.75rem] text-[var(--grey)] transition-colors hover:text-[var(--color-text)]"
            >
              <Icon name="lucide:mail" class="size-3.5 inline" /> {{ member.email }}
            </a>
          </div>

          <!-- Specialties -->
          <div v-if="member.specialties?.length">
            <p class="hue-label-sm mb-4 text-[var(--silver)]">Specialties</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="s in member.specialties"
                :key="s"
                class="rounded-full bg-[var(--color-bg-alt)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-wider text-[var(--grey)]"
              >{{ s }}</span>
            </div>
          </div>

          <!-- Education -->
          <div v-if="member.education?.length">
            <p class="hue-label-sm mb-4 text-[var(--silver)]">Education</p>
            <div class="space-y-3">
              <div v-for="(edu, i) in member.education" :key="i">
                <p class="text-[0.875rem]">{{ edu.degree }}</p>
                <p class="text-[0.75rem] text-[var(--grey)]">{{ edu.school }}{{ edu.year ? ` · ${edu.year}` : '' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section v-if="posts?.length" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <div>
            <p class="hue-label mb-2">From the Magazine</p>
            <p class="text-[0.875rem] text-[var(--grey)]">Articles by {{ member.first_name }}</p>
          </div>
          <NuxtLink to="/magazine" class="hue-link text-[0.8125rem]">
            All articles <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <MagazineCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
    </section>

    <!-- Case Studies -->
    <section v-if="caseStudies?.length" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Projects</p>
          <NuxtLink to="/case-studies" class="hue-link text-[0.8125rem]">
            All case studies <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="cs in caseStudies"
            :key="cs.id"
            :to="`/case-studies/${cs.url}`"
            class="group block"
          >
            <div class="relative overflow-hidden rounded-sm bg-[var(--color-bg-alt)]" style="aspect-ratio: 4/3;">
              <img
                v-if="csImg(cs)"
                :src="csImg(cs)!"
                :alt="cs.title ?? ''"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div class="mt-4">
              <span v-if="csService(cs)" class="hue-label-sm" style="color: var(--color-accent);">{{ csService(cs) }}</span>
              <h3 class="mt-1 text-[0.9375rem] font-light transition-colors group-hover:text-[var(--color-accent)]">{{ cs.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <InlineCapture
      :dark="true"
      label="Work together"
      :headline="`Interested in working with ${member.first_name}?`"
      button-text="Send"
      :context="`Team profile: ${fullName}`"
    />
  </div>
</template>

<script setup lang="ts">
import type { DirectusCaseStudy } from '~/composables/useDirectus'

const route = useRoute()
const { fetchTeamMember, fetchTeamMemberPosts, fetchCaseStudies, assetUrl } = useDirectus()
const { parallaxElement, staggerEntrance } = useHeroAnimations()

const heroRef = ref<HTMLElement | null>(null)
const bgWordRef = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)

parallaxElement(bgWordRef, 0.15) // Subtle parallax on the portrait
staggerEntrance([heroTitle], { delay: 0.3 })

const { data: member } = await useAsyncData(
  `team-${route.params.url}`,
  () => fetchTeamMember(route.params.url as string),
)

if (!member.value) throw createError({ statusCode: 404, statusMessage: 'Team member not found' })

const fullName = computed(() => [member.value?.first_name, member.value?.last_name].filter(Boolean).join(' '))

const heroImgSrc = computed(() => {
  const id = member.value?.photo ?? member.value?.image
  return id ? assetUrl(id, 'xlarge-contain') : null
})

// Fetch their blog posts — featured prominently
const { data: posts } = await useAsyncData(
  `team-posts-${member.value?.id}`,
  () => member.value ? fetchTeamMemberPosts(member.value.id, 6) : Promise.resolve([]),
)

// Fetch case studies
const { data: caseStudies } = await useAsyncData(
  `team-cases-${member.value?.id}`,
  () => fetchCaseStudies({ limit: 6 }),
)

function csImg(cs: DirectusCaseStudy) {
  let id = cs.featured_image ?? cs.gallery?.[0]?.directus_files_id
  if (id) return assetUrl(id, 'medium-contain')

  for (const pi of cs.portfolio_items ?? []) {
    const p = pi.portfolio_id
    if (!p) continue
    id = p.featured_image ?? p.images?.[0]?.directus_files_id
    if (id) return assetUrl(id, 'medium-contain')
    for (const child of (p as any).projects ?? []) {
      id = child.featured_image ?? child.images?.[0]?.directus_files_id
      if (id) return assetUrl(id, 'medium-contain')
    }
  }
  return null
}

function csService(cs: DirectusCaseStudy) {
  return cs.services?.[0]?.services_id?.name ?? null
}

const teamOgImg = computed(() => {
  const id = member.value?.photo ?? member.value?.image
  return id ? assetUrl(id, 'large') : null
})

useSeoMeta({
  title: `${fullName.value} | ${member.value?.title} | Hue Creative Agency`,
  description: member.value?.headline ?? `${fullName.value}, ${member.value?.title} at Hue Creative Agency.`,
  ogImage: teamOgImg.value ?? undefined,
})

if (!teamOgImg.value) {
  defineOgImage({ component: 'HueOg', props: { title: fullName.value, description: member.value?.title ?? '', label: 'Team' } })
}

useSchemaOrg([
  {
    '@type': 'Person',
    name: fullName.value,
    jobTitle: member.value?.title ?? undefined,
    worksFor: { '@type': 'Organization', name: 'Hue Creative Agency' },
  },
])
</script>

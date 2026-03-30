<template>
  <div v-if="member">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-[var(--cloud)]" style="min-height: 80vh;">
      <img
        v-if="heroImgSrc"
        :src="heroImgSrc"
        :alt="fullName"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <!-- Name overlay -->
      <h1
        class="absolute bottom-0 left-0 px-4 pb-6 md:px-10 md:pb-10 text-[clamp(3rem,8vw,7rem)] italic leading-[0.95] text-white/90"
        style="font-family: var(--font-editorial);"
      >
        {{ member.first_name }}<br>{{ member.last_name }}
      </h1>
    </section>

    <!-- Info bar -->
    <section class="px-2 md:px-6 py-10">
      <div class="hue-container flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="hue-label mb-2">Team</p>
          <p v-if="member.title" class="text-[1.0625rem] text-[var(--grey)]">{{ member.title }}</p>
          <p v-if="member.headline" class="hue-editorial-md mt-2 max-w-lg">{{ member.headline }}</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a
            v-if="member.linkedin_url"
            :href="member.linkedin_url"
            target="_blank"
            rel="noopener"
            class="hue-btn-outline inline-flex items-center gap-2 text-[0.8125rem]"
          >
            <Icon name="lucide:linkedin" class="size-4" /> LinkedIn
          </a>
          <a
            v-if="member.email"
            :href="`mailto:${member.email}`"
            class="hue-btn-outline inline-flex items-center gap-2 text-[0.8125rem]"
          >
            <Icon name="lucide:mail" class="size-4" /> Email
          </a>
        </div>
      </div>
    </section>

    <!-- Bio -->
    <section v-if="member.extended_bio || member.bio" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container-sm">
        <p class="hue-label mb-8">About</p>
        <div class="hue-body-lg space-y-5 text-[var(--color-text-secondary)]" v-html="member.extended_bio ?? member.bio" />
      </div>
    </section>

    <!-- Specialties -->
    <section v-if="member.specialties?.length" class="hue-section-alt px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Specialties</p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="s in member.specialties"
            :key="s"
            class="rounded-full border border-[var(--silk)] bg-white px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-[var(--grey)]"
          >{{ s }}</span>
        </div>
      </div>
    </section>

    <!-- Case Studies / Projects -->
    <section v-if="caseStudies?.length" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Projects</p>
          <NuxtLink to="/case-studies" class="hue-link text-[0.8125rem]">
            All case studies <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="cs in caseStudies"
            :key="cs.id"
            :to="`/case-studies/${cs.url}`"
            class="group block bg-white transition-colors hover:bg-[var(--snow)]"
          >
            <div class="relative overflow-hidden bg-white" style="aspect-ratio: 4/3;">
              <img
                v-if="csImg(cs)"
                :src="csImg(cs)!"
                :alt="cs.title ?? ''"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div class="p-6">
              <span v-if="csService(cs)" class="hue-label-sm">{{ csService(cs) }}</span>
              <h3 class="mt-2 text-[1rem] font-light">{{ cs.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section v-if="posts?.length" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Latest articles</p>
          <NuxtLink to="/magazine" class="hue-link text-[0.8125rem]">
            All articles <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <MagazineCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
    </section>

    <!-- Career Timeline -->
    <section v-if="member.resume_highlights?.length" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container-sm">
        <p class="hue-label mb-10">Career</p>
        <div class="space-y-8 border-l border-[var(--silk)] pl-8">
          <div v-for="(item, i) in member.resume_highlights" :key="i" class="relative">
            <div class="absolute -left-[2.55rem] top-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            <p class="hue-label-sm mb-1">{{ item.year }}</p>
            <h3 class="text-[1.0625rem] font-medium">{{ item.role }}</h3>
            <p class="text-[0.875rem] text-[var(--grey)]">{{ item.company }}</p>
            <p v-if="item.description" class="mt-2 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section v-if="member.education?.length" class="hue-section-alt px-2 md:px-6 py-16">
      <div class="hue-container-sm">
        <p class="hue-label mb-8">Education</p>
        <div class="space-y-4">
          <div v-for="(edu, i) in member.education" :key="i" class="flex items-baseline justify-between gap-4">
            <div>
              <p class="text-[1rem] font-light">{{ edu.degree }}</p>
              <p class="text-[0.875rem] text-[var(--grey)]">{{ edu.school }}</p>
            </div>
            <span v-if="edu.year" class="hue-label-sm shrink-0">{{ edu.year }}</span>
          </div>
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

const { data: member } = await useAsyncData(
  `team-${route.params.url}`,
  () => fetchTeamMember(route.params.url as string),
)

if (!member.value) throw createError({ statusCode: 404, statusMessage: 'Team member not found' })

const fullName = computed(() => [member.value?.first_name, member.value?.last_name].filter(Boolean).join(' '))

const heroImgSrc = computed(() => {
  const id = member.value?.photo ?? member.value?.image
  return id ? assetUrl(id, { width: 960, quality: 85 }) : null
})

// Fetch their blog posts
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
  // 1. Case study's own image
  let id = cs.featured_image ?? cs.gallery?.[0]?.directus_files_id
  if (id) return assetUrl(id, { width: 600, quality: 80 })

  // 2. Check linked portfolio items and their child projects
  for (const pi of cs.portfolio_items ?? []) {
    const p = pi.portfolio_id
    if (!p) continue
    id = p.featured_image ?? p.images?.[0]?.directus_files_id
    if (id) return assetUrl(id, { width: 600, quality: 80 })
    // Check child projects
    for (const child of (p as any).projects ?? []) {
      id = child.featured_image ?? child.images?.[0]?.directus_files_id
      if (id) return assetUrl(id, { width: 600, quality: 80 })
    }
  }
  return null
}

function csService(cs: DirectusCaseStudy) {
  return cs.services?.[0]?.services_id?.name ?? null
}

const teamOgImg = computed(() => {
  const id = member.value?.photo ?? member.value?.image
  return id ? assetUrl(id, { width: 1200, height: 630, quality: 85 }) : null
})

useSeoMeta({
  title: `${fullName.value} | ${member.value?.title} | Hue`,
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

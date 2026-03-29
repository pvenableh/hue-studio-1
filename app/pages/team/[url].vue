<template>
  <div v-if="member">
    <!-- Hero -->
    <section class="grid border-b border-[var(--silk)] lg:grid-cols-[480px_1fr]">
      <div class="relative overflow-hidden bg-[var(--cloud)]" style="aspect-ratio: 4/5; max-height: 640px;">
        <img
          v-if="heroImgSrc"
          :src="heroImgSrc"
          :alt="fullName"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="flex flex-col justify-center px-8 py-14 lg:px-16 lg:py-20">
        <p class="hue-label mb-3">Team</p>
        <h1 class="mb-2 text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1]">{{ fullName }}</h1>
        <p v-if="member.title" class="mb-4 text-[1.0625rem] text-[var(--grey)]">{{ member.title }}</p>
        <p v-if="member.headline" class="hue-editorial-md mb-8 max-w-lg">{{ member.headline }}</p>
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
  return cs.featured_image ? assetUrl(cs.featured_image, { width: 600, quality: 80 }) : null
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

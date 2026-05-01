<template>
  <div v-if="cs">
    <BackLink to="/case-studies">All Case Studies</BackLink>

    <!-- Hero — matches portfolio detail layout -->
    <section ref="heroRef" class="relative overflow-x-clip bg-white px-2 md:px-6 py-16 lg:py-20">
      <span
        ref="bgWordRef"
        class="pointer-events-none absolute bottom-0 left-0 font-serif italic font-light text-[8rem] md:text-[14rem] lg:text-[20rem] leading-[1] opacity-[0.04] select-none translate-y-[0.2em]"
      >{{ bgWord }}</span>
      <div class="hue-container relative">
        <div class="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p ref="heroLabel" class="hue-label mb-4">
              {{ allServices[0] }}{{ csIndustries.length ? ` · ${csIndustries[0]?.name}` : '' }}
            </p>
            <h1 ref="heroTitle" class="mb-5 max-w-[14ch] uppercase tracking-[0.08em] leading-[0.95] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]" style="font-family: var(--font)">
              {{ cs.title }}
            </h1>
            <p v-if="cs.excerpt" ref="heroDesc" class="hue-body-lg max-w-lg text-[var(--grey)]">{{ cs.excerpt }}</p>
          </div>

          <!-- Meta card -->
          <div class="space-y-4 lg:pt-10">
            <div v-if="clientName">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Client</p>
              <p class="text-[0.75rem] uppercase tracking-[0.1em]">{{ clientName }}</p>
            </div>
            <div v-for="ind in csIndustries" :key="ind.id">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Industry</p>
              <NuxtLink :to="`/industries/${ind.url}`" class="text-[0.75rem] uppercase tracking-[0.1em] hover:text-[var(--color-accent)]">
                {{ ind.name }}
              </NuxtLink>
            </div>
            <div v-if="allServices.length">
              <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Services</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="svc in allServices" :key="svc" class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)]">{{ svc }}</span>
              </div>
            </div>
            <!-- Year/duration hidden for now -->
            <!-- <div v-if="cs.project_year || cs.project_duration" class="flex gap-8">
              <div v-if="cs.project_year">
                <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Year</p>
                <p class="text-[0.875rem]">{{ cs.project_year }}</p>
              </div>
              <div v-if="cs.project_duration">
                <p class="hue-label-sm mb-1.5 text-[var(--silver)]">Duration</p>
                <p class="text-[0.875rem]">{{ cs.project_duration }}</p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ DESKTOP: Sticky featured image with narrative overlay ═══ -->
    <div v-if="heroImage && (narrativeChallenge || narrativeApproach)" ref="narrativeWrapRef" class="relative hidden lg:block">
      <!-- Fixed background image — clipped to this wrapper -->
      <div class="clip-to-parent">
        <div class="fixed inset-0 h-screen w-full">
          <img
            :src="heroImage"
            :alt="cs.title ?? ''"
            class="h-full w-full object-cover"
          />
          <div ref="imageOverlayRef" class="absolute inset-0 bg-black" style="opacity: 0;" />
        </div>
      </div>

      <!-- Scrolling narrative content -->
      <div class="relative z-10">
        <!-- Spacer so content starts below fold -->
        <div class="h-[60vh]" />

        <div class="px-2 md:px-6">
          <!-- Challenge -->
          <section v-if="narrativeChallenge" class="py-20">
            <div class="hue-container max-w-3xl">
              <span class="text-[0.625rem] tracking-widest text-white/20">01</span>
              <p class="mt-2 mb-3 text-[1.75rem] font-light text-white/50 lg:text-[2.5rem]" style="font-family: var(--font-editorial);">The Challenge</p>
              <div class="hue-body-lg text-white/80" v-html="narrativeChallenge" />
            </div>
          </section>

          <!-- Approach -->
          <section v-if="narrativeApproach" class="py-20">
            <div class="hue-container max-w-3xl">
              <span class="text-[0.625rem] tracking-widest text-white/20">02</span>
              <p class="mt-2 mb-3 text-[1.75rem] font-light text-white/50 lg:text-[2.5rem]" style="font-family: var(--font-editorial);">Our Approach</p>
              <div class="hue-body-lg text-white/80" v-html="narrativeApproach" />
            </div>
          </section>

          <!-- Bottom spacer for scroll breathing room -->
          <div class="h-[30vh]" />
        </div>
      </div>
    </div>

    <!-- ═══ MOBILE + NO-IMAGE FALLBACK ═══ -->

    <!-- Featured image (mobile only, or when no narrative) -->
    <section v-if="heroImage" class="border-b border-[var(--silk)] lg:hidden">
      <img
        :src="heroImage"
        :alt="cs.title ?? ''"
        class="w-full object-cover"
        style="max-height: 60vh;"
      />
    </section>

    <!-- Challenge (mobile, or no image on desktop) -->
    <section v-if="narrativeChallenge" class="hue-section px-2 md:px-6 py-20" :class="heroImage && (narrativeChallenge || narrativeApproach) ? 'lg:hidden' : ''">
      <div class="hue-container grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <span class="text-[0.625rem] tracking-widest text-[var(--silk)]">01</span>
          <p class="hue-label mt-1">The Challenge</p>
        </div>
        <div class="hue-body-lg max-w-2xl" v-html="narrativeChallenge" />
      </div>
    </section>

    <!-- Approach (mobile, or no image on desktop) -->
    <section v-if="narrativeApproach" class="hue-section px-2 md:px-6 py-20" :class="heroImage && (narrativeChallenge || narrativeApproach) ? 'lg:hidden' : ''">
      <div class="hue-container grid gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <span class="text-[0.625rem] tracking-widest text-[var(--silk)]">02</span>
          <p class="hue-label mt-1">Our Approach</p>
        </div>
        <div class="hue-body-lg max-w-2xl" v-html="narrativeApproach" />
      </div>
    </section>

    <!-- Gallery (from case study) -->
    <section v-if="cs.gallery?.length" class="px-2 md:px-6 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Gallery</p>
        <div
          class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)]"
          :class="cs.gallery.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
          <img
            v-for="(img, i) in cs.gallery"
            :key="img.directus_files_id"
            :src="assetUrl(img.directus_files_id, 'medium-contain')"
            :alt="`${cs.title} — image ${i + 1}`"
            class="w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- ═══ OUTCOME + DELIVERABLES — Desktop: sticky scroll-reveal ═══ -->

    <!-- Desktop: combined sticky layout -->
    <section
      v-if="narrativeResults && childProjects.length"
      data-scroll-reveal-root
      class="hidden lg:block border-t border-[var(--silk)] px-2 md:px-6"
    >
      <div class="hue-container">
        <div class="grid grid-cols-[1fr_1fr] gap-16 lg:grid-cols-[380px_1fr] lg:gap-20">
          <!-- Left: sticky outcome -->
          <div class="sticky top-20 self-start pt-20">
            <p class="mb-5 text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent);">The Outcome</p>
            <TextScrollReveal
              :text="stripHtmlText(narrativeResults)"
              class="max-w-md text-[1.5rem] font-normal leading-snug text-[var(--near-black)] lg:text-[1.75rem]"
            />
          </div>

          <!-- Right: scrolling deliverables -->
          <div class="py-20">
            <p class="hue-label mb-8">Project Deliverables</p>
            <div class="flex flex-col gap-6">
              <div
                v-for="item in childProjects"
                :key="item.id"
                class="group block overflow-hidden border border-[var(--silk)] bg-white"
              >
                <!-- Video carousel -->
                <div v-if="itemVideos(item).length" class="relative overflow-hidden bg-black" style="aspect-ratio: 16/9;">
                  <Transition name="video-fade" mode="out-in">
                    <iframe
                      v-if="itemVideos(item)[currentVideoIndex(item.id)]?.platform === 'youtube'"
                      :key="`yt-${item.id}-${currentVideoIndex(item.id)}`"
                      :src="`https://www.youtube.com/embed/${extractYouTubeId(itemVideos(item)[currentVideoIndex(item.id)].link)}`"
                      class="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      loading="lazy"
                    />
                    <iframe
                      v-else-if="itemVideos(item)[currentVideoIndex(item.id)]?.platform === 'vimeo'"
                      :key="`vi-${item.id}-${currentVideoIndex(item.id)}`"
                      :src="`https://player.vimeo.com/video/${extractVimeoId(itemVideos(item)[currentVideoIndex(item.id)].link)}`"
                      class="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowfullscreen
                      loading="lazy"
                    />
                  </Transition>
                  <!-- Carousel nav -->
                  <div v-if="itemVideos(item).length > 1" class="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button class="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm text-[var(--grey)] transition-colors hover:bg-white hover:text-[var(--near-black)]" @click="stepVideo(item.id, -1, itemVideos(item).length)">
                      <Icon name="lucide:chevron-left" class="size-4" />
                    </button>
                    <button class="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm text-[var(--grey)] transition-colors hover:bg-white hover:text-[var(--near-black)]" @click="stepVideo(item.id, 1, itemVideos(item).length)">
                      <Icon name="lucide:chevron-right" class="size-4" />
                    </button>
                  </div>
                  <!-- Dots indicator -->
                  <div v-if="itemVideos(item).length > 1" class="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span v-for="(_, vi) in itemVideos(item)" :key="vi" class="block h-1.5 w-1.5 rounded-full transition-colors" :class="vi === currentVideoIndex(item.id) ? 'bg-white' : 'bg-white/40'" />
                  </div>
                </div>
                <!-- Image fallback -->
                <component
                  v-else
                  :is="item.url ? NuxtLink : 'div'"
                  v-bind="item.url ? { to: `/portfolio/${item.url}` } : {}"
                  class="block transition-colors hover:bg-[var(--snow)]"
                >
                  <div v-if="portfolioImgUrl(item)" class="flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 16/9;">
                    <img :src="portfolioImgUrl(item)!" :alt="item.name" class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                </component>
                <NuxtLink v-if="item.url" :to="`/portfolio/${item.url}`" class="block p-5 transition-colors hover:bg-[var(--snow)]">
                  <p v-if="primaryService(item)?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ primaryService(item)?.name }}</p>
                  <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ item.name }}</h3>
                  <p v-if="item.caption" class="mt-2 text-[0.75rem] text-[var(--grey)] line-clamp-2" v-html="item.caption" />
                </NuxtLink>
                <div v-else class="p-5">
                  <p v-if="primaryService(item)?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ primaryService(item)?.name }}</p>
                  <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ item.name }}</h3>
                  <p v-if="item.caption" class="mt-2 text-[0.75rem] text-[var(--grey)] line-clamp-2" v-html="item.caption" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Desktop: outcome only (no deliverables) -->
    <section
      v-else-if="narrativeResults && !childProjects.length"
      data-scroll-reveal-root
      class="hidden lg:block border-t border-[var(--silk)] px-2 md:px-6 py-20"
    >
      <div class="hue-container">
        <p class="mb-5 text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent);">The Outcome</p>
        <TextScrollReveal
          :text="stripHtmlText(narrativeResults)"
          class="max-w-lg text-[1.5rem] font-normal leading-snug text-[var(--near-black)] lg:text-[1.75rem]"
        />
      </div>
    </section>

    <!-- Desktop: deliverables only (no outcome) -->
    <section
      v-else-if="!narrativeResults && childProjects.length"
      class="hidden lg:block border-t border-[var(--silk)] px-2 md:px-6 py-20"
    >
      <div class="hue-container">
        <p class="hue-label mb-8">Project Deliverables</p>
        <div class="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <div
            v-for="item in childProjects"
            :key="item.id"
            class="group block overflow-hidden border border-[var(--silk)] bg-white"
          >
            <!-- Video carousel -->
            <div v-if="itemVideos(item).length" class="relative overflow-hidden bg-black" style="aspect-ratio: 16/9;">
              <Transition name="video-fade" mode="out-in">
                <iframe
                  v-if="itemVideos(item)[currentVideoIndex(item.id)]?.platform === 'youtube'"
                  :key="`d-yt-${item.id}-${currentVideoIndex(item.id)}`"
                  :src="`https://www.youtube.com/embed/${extractYouTubeId(itemVideos(item)[currentVideoIndex(item.id)].link)}`"
                  class="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                />
                <iframe
                  v-else-if="itemVideos(item)[currentVideoIndex(item.id)]?.platform === 'vimeo'"
                  :key="`d-vi-${item.id}-${currentVideoIndex(item.id)}`"
                  :src="`https://player.vimeo.com/video/${extractVimeoId(itemVideos(item)[currentVideoIndex(item.id)].link)}`"
                  class="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                />
              </Transition>
              <div v-if="itemVideos(item).length > 1" class="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button class="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm text-[var(--grey)] transition-colors hover:bg-white hover:text-[var(--near-black)]" @click="stepVideo(item.id, -1, itemVideos(item).length)">
                  <Icon name="lucide:chevron-left" class="size-4" />
                </button>
                <button class="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm text-[var(--grey)] transition-colors hover:bg-white hover:text-[var(--near-black)]" @click="stepVideo(item.id, 1, itemVideos(item).length)">
                  <Icon name="lucide:chevron-right" class="size-4" />
                </button>
              </div>
              <div v-if="itemVideos(item).length > 1" class="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span v-for="(_, vi) in itemVideos(item)" :key="vi" class="block h-1.5 w-1.5 rounded-full transition-colors" :class="vi === currentVideoIndex(item.id) ? 'bg-white' : 'bg-white/40'" />
              </div>
            </div>
            <!-- Image fallback -->
            <component
              v-else
              :is="item.url ? NuxtLink : 'div'"
              v-bind="item.url ? { to: `/portfolio/${item.url}` } : {}"
              class="block transition-colors hover:bg-[var(--snow)]"
            >
              <div v-if="portfolioImgUrl(item)" class="flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 16/9;">
                <img :src="portfolioImgUrl(item)!" :alt="item.name" class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
              </div>
            </component>
            <NuxtLink v-if="item.url" :to="`/portfolio/${item.url}`" class="block p-5 transition-colors hover:bg-[var(--snow)]">
              <p v-if="primaryService(item)?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ primaryService(item)?.name }}</p>
              <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ item.name }}</h3>
              <p v-if="item.caption" class="mt-2 text-[0.75rem] text-[var(--grey)] line-clamp-2" v-html="item.caption" />
            </NuxtLink>
            <div v-else class="p-5">
              <p v-if="primaryService(item)?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ primaryService(item)?.name }}</p>
              <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ item.name }}</h3>
              <p v-if="item.caption" class="mt-2 text-[0.75rem] text-[var(--grey)] line-clamp-2" v-html="item.caption" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ MOBILE FALLBACK — current sequential layout ═══ -->

    <!-- Mobile: deliverables -->
    <section v-if="childProjects.length" class="lg:hidden px-2 py-16">
      <div class="hue-container">
        <p class="hue-label mb-8">Project Deliverables</p>
        <div class="grid gap-px overflow-hidden border border-[var(--silk)] bg-[var(--silk)] grid-cols-2">
          <div
            v-for="item in childProjects"
            :key="item.id"
            class="group bg-white"
          >
            <!-- Video carousel -->
            <div v-if="itemVideos(item).length" class="relative overflow-hidden bg-black" style="aspect-ratio: 4/3;">
              <Transition name="video-fade" mode="out-in">
                <iframe
                  v-if="itemVideos(item)[currentVideoIndex(item.id)]?.platform === 'youtube'"
                  :key="`m-yt-${item.id}-${currentVideoIndex(item.id)}`"
                  :src="`https://www.youtube.com/embed/${extractYouTubeId(itemVideos(item)[currentVideoIndex(item.id)].link)}`"
                  class="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                />
                <iframe
                  v-else-if="itemVideos(item)[currentVideoIndex(item.id)]?.platform === 'vimeo'"
                  :key="`m-vi-${item.id}-${currentVideoIndex(item.id)}`"
                  :src="`https://player.vimeo.com/video/${extractVimeoId(itemVideos(item)[currentVideoIndex(item.id)].link)}`"
                  class="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                />
              </Transition>
              <!-- Carousel nav -->
              <div v-if="itemVideos(item).length > 1" class="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button class="pointer-events-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-sm text-[var(--grey)]" @click="stepVideo(item.id, -1, itemVideos(item).length)">
                  <Icon name="lucide:chevron-left" class="size-3" />
                </button>
                <button class="pointer-events-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-sm text-[var(--grey)]" @click="stepVideo(item.id, 1, itemVideos(item).length)">
                  <Icon name="lucide:chevron-right" class="size-3" />
                </button>
              </div>
              <!-- Dots indicator -->
              <div v-if="itemVideos(item).length > 1" class="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span v-for="(_, vi) in itemVideos(item)" :key="vi" class="block h-1 w-1 rounded-full" :class="vi === currentVideoIndex(item.id) ? 'bg-white' : 'bg-white/40'" />
              </div>
            </div>
            <!-- Image fallback -->
            <component
              v-else
              :is="item.url ? NuxtLink : 'div'"
              v-bind="item.url ? { to: `/portfolio/${item.url}` } : {}"
              class="block transition-colors hover:bg-[var(--snow)]"
            >
              <div v-if="portfolioImgUrl(item)" class="flex items-center justify-center overflow-hidden bg-white" style="aspect-ratio: 4/3;">
                <img :src="portfolioImgUrl(item)!" :alt="item.name" class="max-h-[70%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
              </div>
            </component>
            <NuxtLink v-if="item.url" :to="`/portfolio/${item.url}`" class="block p-4 transition-colors hover:bg-[var(--snow)]">
              <p v-if="primaryService(item)?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ primaryService(item)?.name }}</p>
              <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ item.name }}</h3>
            </NuxtLink>
            <div v-else class="p-4">
              <p v-if="primaryService(item)?.name" class="hue-label-sm mb-1" style="color: var(--color-accent);">{{ primaryService(item)?.name }}</p>
              <h3 class="text-[0.6875rem] font-medium uppercase tracking-[0.12em]">{{ item.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile: outcome -->
    <section v-if="narrativeResults" class="lg:hidden bg-[var(--near-black)] px-2 py-20">
      <div class="hue-container">
        <p class="mb-5 text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent);">The Outcome</p>
        <div class="max-w-lg text-[2.25rem] font-light leading-tight text-white" style="font-family:var(--font-editorial);" v-html="narrativeResults" />
      </div>
    </section>

    <!-- Before & After — carousel if multiple -->
    <section v-if="beforeAfters.length" class="px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-10 flex items-end justify-between">
          <p class="hue-label">Before &amp; After</p>
          <div v-if="beforeAfters.length > 1" class="flex gap-2">
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollBaCarousel(-1)">
              <Icon name="lucide:arrow-left" class="size-3.5" />
            </button>
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollBaCarousel(1)">
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </button>
          </div>
        </div>
        <div ref="baCarouselRef" class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" :class="beforeAfters.length === 1 ? '' : '-mx-2 px-2'">
          <div
            v-for="(ba, idx) in beforeAfters"
            :key="ba.id"
            class="snap-start"
            :class="beforeAfters.length === 1 ? 'w-full' : 'w-[85%] flex-none lg:w-[70%]'"
          >
            <div
              v-if="ba.before_image && ba.after_image"
              :ref="(el) => { if (el) sliderRefs[idx] = el as HTMLElement }"
              class="group relative cursor-col-resize select-none overflow-hidden rounded-sm bg-[var(--snow)]"
              style="aspect-ratio: 16/9;"
              @mousedown.prevent="startDrag(idx, $event)"
              @touchstart.prevent="startDrag(idx, $event)"
            >
              <!-- Before image (clipped to left of divider) -->
              <div class="absolute inset-0 flex items-center justify-center" :class="ba.is_logo ? 'p-12 md:p-20' : 'p-4 md:p-8'" :style="{ clipPath: `inset(0 ${100 - (sliderPositions[idx] ?? 50)}% 0 0)` }">
                <img :src="assetUrl(ba.before_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[60%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${cs.title} — before`" />
              </div>
              <!-- After image (clipped to right of divider) -->
              <div class="absolute inset-0 flex items-center justify-center" :class="ba.is_logo ? 'p-12 md:p-20' : 'p-4 md:p-8'" :style="{ clipPath: `inset(0 0 0 ${sliderPositions[idx] ?? 50}%)` }">
                <img :src="assetUrl(ba.after_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[60%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${cs.title} — after`" />
              </div>
              <div class="absolute top-0 bottom-0 z-10 -ml-px w-[2px] bg-[var(--near-black)]/20 transition-colors group-hover:bg-[var(--near-black)]/40" :style="{ left: `${sliderPositions[idx] ?? 50}%` }">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform group-hover:scale-110">
                  <Icon name="lucide:arrow-left-right" class="size-4 text-[var(--grey)]" />
                </div>
              </div>
              <span class="absolute top-4 left-4 hue-label-sm text-[var(--grey)] transition-opacity duration-200" :style="{ opacity: (sliderPositions[idx] ?? 50) < 15 ? 0 : 1 }">where it started</span>
              <span class="absolute top-4 right-4 hue-label-sm text-[var(--near-black)] transition-opacity duration-200" :style="{ opacity: (sliderPositions[idx] ?? 50) > 85 ? 0 : 1 }">how it finished</span>
            </div>
            <div v-else class="grid gap-8 md:grid-cols-2">
              <div v-if="ba.before_image" class="flex items-center justify-center rounded-sm bg-[var(--snow)]" :class="ba.is_logo ? 'p-12' : 'p-4'" style="aspect-ratio: 4/3;">
                <img :src="assetUrl(ba.before_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[50%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${cs.title} — before`" />
              </div>
              <div v-if="ba.after_image" class="flex items-center justify-center rounded-sm bg-[var(--snow)]" :class="ba.is_logo ? 'p-12' : 'p-4'" style="aspect-ratio: 4/3;">
                <img :src="assetUrl(ba.after_image, 'medium-contain')" :class="ba.is_logo ? 'max-h-[50%] max-w-[50%]' : 'max-h-[90%] max-w-[90%]'" class="object-contain" :alt="`${cs.title} — after`" />
              </div>
            </div>
            <p v-if="ba.caption || ba.title" class="mt-4 text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--grey)]">{{ ba.caption || ba.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Videos — carousel if multiple -->
    <section v-if="videos.length && !childProjects.length" class="border-t border-[var(--silk)] px-2 md:px-6 py-20">
      <div class="hue-container">
        <div class="mb-8 flex items-end justify-between">
          <p class="hue-label">Video</p>
          <div v-if="videos.length > 1" class="flex gap-2">
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollVideoCarousel(-1)">
              <Icon name="lucide:arrow-left" class="size-3.5" />
            </button>
            <button class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--silk)] text-[var(--grey)] transition-colors hover:border-[var(--near-black)] hover:text-[var(--near-black)]" @click="scrollVideoCarousel(1)">
              <Icon name="lucide:arrow-right" class="size-3.5" />
            </button>
          </div>
        </div>
        <div ref="videoCarouselRef" class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" :class="videos.length === 1 ? '' : '-mx-2 px-2'">
          <div
            v-for="video in videos"
            :key="video.id"
            class="snap-start"
            :class="videos.length === 1 ? 'w-full' : 'w-[85%] flex-none lg:w-[70%]'"
          >
            <div class="overflow-hidden rounded-sm" style="aspect-ratio: 16/9;">
              <iframe
                v-if="video.platform === 'youtube'"
                :src="`https://www.youtube.com/embed/${extractYouTubeId(video.link)}`"
                class="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <iframe
                v-else-if="video.platform === 'vimeo'"
                :src="`https://player.vimeo.com/video/${extractVimeoId(video.link)}`"
                class="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
              />
            </div>
            <p v-if="video.title" class="mt-3 text-[0.6875rem] font-medium uppercase tracking-[0.1em]">{{ video.title }}</p>
            <p v-if="video.description" class="mt-1 text-[0.625rem] uppercase tracking-[0.08em] text-[var(--grey)]">{{ video.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related industry -->
    <section v-if="csIndustries.length" class="hue-section px-2 md:px-6 py-16">
      <div class="hue-container">
        <div class="flex flex-wrap items-center gap-4">
          <p class="hue-label">More in this industry</p>
          <NuxtLink
            v-for="ind in csIndustries"
            :key="ind.id"
            :to="`/industries/${ind.url}`"
            class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-[var(--grey)] transition-all hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          >{{ ind.name }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-2 md:px-6 py-24" style="background: var(--color-accent);">
      <div class="hue-container flex flex-col items-center text-center gap-8">
        <h2 class="text-[2.5rem] md:text-[3.5rem] font-light leading-[1.05] text-white" style="font-family:var(--font-editorial);" v-html="ctaHeadline" />
        <ShimmerButton to="/contact" text="Book a Discovery Call" />
      </div>
    </section>
  </div>

  <div v-else class="flex min-h-[60vh] items-center justify-center text-center">
    <div>
      <h1 class="hue-display-lg mb-4">Case Study Not Found</h1>
      <NuxtLink to="/case-studies" class="hue-link">← All Case Studies</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectusPortfolioItem } from '~/composables/useDirectus'
const NuxtLink = resolveComponent('NuxtLink')

const route = useRoute()
const url = route.params.url as string
const { fetchCaseStudyByUrl, fetchPortfolioItemById, assetUrl, resolvedBeforeAfters, primaryService } = useDirectus()
const { parallaxElement, staggerEntrance } = useHeroAnimations()
const { trackBeforeAfterInteraction, trackCaseStudyView } = useAnalytics()
const { trackCaseStudyView: trackCaseStudyViewNew, useScrollDepthTracker } = useTracking()

const heroRef = ref<HTMLElement | null>(null)
const bgWordRef = ref<HTMLElement | null>(null)
const heroLabel = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroDesc = ref<HTMLElement | null>(null)
const narrativeWrapRef = ref<HTMLElement | null>(null)
const imageOverlayRef = ref<HTMLElement | null>(null)

// Animate overlay opacity on scroll — transparent → 70% as challenge comes into view
onMounted(async () => {
  await nextTick()
  if (!imageOverlayRef.value || !narrativeWrapRef.value || import.meta.server) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(imageOverlayRef.value, {
    opacity: 0.7,
    ease: 'none',
    scrollTrigger: {
      trigger: narrativeWrapRef.value,
      start: 'top top',
      end: '40% top',
      scrub: true,
    },
  })
})

const { data: cs } = await useAsyncData(`case-study-${url}`, () => fetchCaseStudyByUrl(url))

if (!cs.value) throw createError({ statusCode: 404, statusMessage: 'Case study not found' })

if (import.meta.client) {
  trackCaseStudyView(
    cs.value.title ?? '',
    cs.value.services?.[0]?.services_id?.name,
  )
  trackCaseStudyViewNew(
    url,
    cs.value.title ?? '',
    cs.value.industries?.[0]?.industries_id?.name,
  )
}

onMounted(() => {
  useScrollDepthTracker()
})

parallaxElement(bgWordRef, 0.3)
staggerEntrance([heroLabel, heroTitle, heroDesc])

/** Get linked portfolio item IDs from the junction — deduplicated */
const linkedIds = computed(() => {
  const ids = new Set<string>()
  ;(cs.value?.portfolio_items ?? []).forEach((pi) => {
    if (pi.portfolio_id?.id) ids.add(pi.portfolio_id.id)
  })
  return [...ids]
})

/** Fetch full portfolio items by ID — these are the deliverables */
const { data: fullPortfolioItems } = await useAsyncData(
  `case-study-portfolio-${url}`,
  async () => {
    const items = await Promise.all(
      linkedIds.value.map((id) => fetchPortfolioItemById(id))
    )
    return items.filter(Boolean) as DirectusPortfolioItem[]
  },
)

/** The linked portfolio items ARE the deliverables */
const childProjects = computed(() => fullPortfolioItems.value ?? [])

/** Industries from case study M2M */
const csIndustries = computed(() => {
  return (cs.value?.industries ?? [])
    .map((j: any) => j.industries_id)
    .filter((i: any) => i?.name && i?.url)
})

/** Client name — from M2O or organization */
const clientName = computed(() => {
  const org = cs.value?.organization
  if (org && typeof org === 'object' && org.name) return org.name
  const c = cs.value?.client
  if (!c) return null
  if (typeof c === 'object' && c.name) return c.name
  if (typeof c === 'string' && !/^[0-9a-f-]{36}$/i.test(c)) return c
  // Try from linked portfolio items
  for (const p of childProjects.value) {
    if (p.client && typeof p.client === 'object' && p.client.name) return p.client.name
  }
  return null
})

/** Background word — skip articles like "The", "A", "An" */
const bgWord = computed(() => {
  const articles = new Set(['the', 'a', 'an'])
  const words = (cs.value?.title ?? '').split(/\s+/)
  const meaningful = words.find((w) => !articles.has(w.toLowerCase()))
  return meaningful ?? words[0] ?? ''
})

/** Strip HTML for scroll reveal */
function stripHtmlText(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

/** Narrative content — all from the case study record */
const narrativeChallenge = computed(() => cs.value?.challenge ?? null)
const narrativeApproach = computed(() => cs.value?.solution ?? null)
const narrativeResults = computed(() => cs.value?.results ?? null)

/** All unique service names — from case study + linked portfolio items */
const allServices = computed(() => {
  const names = new Set<string>()
  cs.value?.services?.forEach((s) => { if (s.services_id?.name) names.add(s.services_id.name) })
  childProjects.value.forEach((p) => { p.services?.forEach((s) => { if (s.services_id?.name) names.add(s.services_id.name) }) })
  return [...names]
})

/** Contextual CTA headline */
const ctaHeadline = computed(() => {
  if (beforeAfters.value.length) return 'Ready for your own<br><em>before &amp; after?</em>'
  if (videos.value.length) return 'Ready to tell<br><em>your story?</em>'
  const svc = allServices.value[0]?.toLowerCase() ?? ''
  if (svc.includes('brand')) return 'Ready to build<br><em>your brand?</em>'
  if (svc.includes('digital') || svc.includes('web')) return 'Ready for a<br><em>digital presence?</em>'
  if (svc.includes('print') || svc.includes('graphic')) return 'Ready to make<br><em>an impression?</em>'
  if (svc.includes('event')) return 'Ready to create<br><em>an experience?</em>'
  return 'Like what you see?<br><em>Let\u2019s talk.</em>'
})

/** Carousel refs & scroll helpers */
const baCarouselRef = ref<HTMLElement | null>(null)
const videoCarouselRef = ref<HTMLElement | null>(null)

function scrollBaCarousel(dir: number) {
  const el = baCarouselRef.value
  if (!el) return
  const card = el.querySelector('.snap-start') as HTMLElement
  el.scrollBy({ left: dir * (card?.offsetWidth ?? 600), behavior: 'smooth' })
}

function scrollVideoCarousel(dir: number) {
  const el = videoCarouselRef.value
  if (!el) return
  const card = el.querySelector('.snap-start') as HTMLElement
  el.scrollBy({ left: dir * (card?.offsetWidth ?? 600), behavior: 'smooth' })
}

/** Hero image — from case study, fallback to first portfolio item with an image */
const heroImage = computed(() => {
  if (cs.value?.featured_image) return assetUrl(cs.value.featured_image, 'hero')
  const withImage = childProjects.value.find((p) => p.featured_image)
  if (withImage?.featured_image) return assetUrl(withImage.featured_image, 'hero')
  return null
})

/** Before & afters — aggregated from all linked portfolio items */
const beforeAfters = computed(() => {
  const all: any[] = []
  childProjects.value.forEach((p) => {
    all.push(...resolvedBeforeAfters(p))
  })
  // Dedupe by ID
  const seen = new Set<string>()
  return all.filter((ba) => {
    if (seen.has(ba.id)) return false
    seen.add(ba.id)
    return true
  })
})

/** Videos — aggregated from all linked portfolio items */
const videos = computed(() => {
  const all: any[] = []
  childProjects.value.forEach((p) => {
    (p.videos ?? []).forEach((v: any) => {
      if (v.id) all.push(v)
    })
  })
  return all
})

/** Before/After slider logic (matches portfolio detail) */
const sliderPositions = reactive<Record<number, number>>({})
const sliderRefs = reactive<Record<number, HTMLElement>>({})
let activeSlider = -1

function startDrag(idx: number, e: MouseEvent | TouchEvent) {
  activeSlider = idx
  trackBeforeAfterInteraction?.(cs.value?.title ?? 'Case Study')
  updateSlider(idx, e)
  const onMove = (ev: MouseEvent | TouchEvent) => updateSlider(idx, ev)
  const onUp = () => {
    activeSlider = -1
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchmove', onMove)
  window.addEventListener('touchend', onUp)
}

function updateSlider(idx: number, e: MouseEvent | TouchEvent) {
  const el = sliderRefs[idx]
  if (!el) return
  const rect = el.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
  sliderPositions[idx] = pct
}

/** Portfolio item image URL */
function portfolioImgUrl(item: DirectusPortfolioItem): string | null {
  const id = item.featured_image ?? item.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'medium-contain') : null
}

/** All videos from a portfolio item */
function itemVideos(item: DirectusPortfolioItem): { platform: string; link: string }[] {
  return ((item as any).videos ?? []).filter((v: any) => v?.link).map((v: any) => ({ platform: v.platform, link: v.link }))
}

/** First video from a portfolio item (if any) */
function itemVideo(item: DirectusPortfolioItem): { platform: string; link: string } | null {
  return itemVideos(item)[0] ?? null
}

/** Per-item video carousel index */
const videoIndexes = reactive<Record<string, number>>({})
function currentVideoIndex(itemId: string): number { return videoIndexes[itemId] ?? 0 }
function stepVideo(itemId: string, dir: number, total: number) {
  const cur = currentVideoIndex(itemId)
  videoIndexes[itemId] = (cur + dir + total) % total
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&\s]+)/)
  return match?.[1] ?? ''
}

function extractVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match?.[1] ?? ''
}

const csOgImg = computed(() => {
  const id = cs.value?.featured_image
    ?? cs.value?.gallery?.[0]?.directus_files_id
    ?? fullPortfolioItems.value?.[0]?.featured_image
    ?? fullPortfolioItems.value?.[0]?.images?.[0]?.directus_files_id
  return id ? assetUrl(id, 'large') : null
})

const csSeoTitle = computed(() => {
  const title = cs.value?.title ?? 'Case Study'
  const service = allServices.value[0]
  const industry = csIndustries.value[0]?.name
  const context = [service, industry].filter(Boolean).join(' & ')
  return context ? `${title} — ${context} | Hue` : `${title} | Hue`
})

useSeoMeta({
  title: csSeoTitle,
  description: cs.value?.excerpt ?? 'A case study by Hue.',
  ogImage: csOgImg.value ?? undefined,
})

const csVideoSchemas = (videos.value ?? [])
  .filter((v: any) => v.link && v.platform)
  .map((v: any) => {
    const vid = v.platform === 'youtube' ? extractYouTubeId(v.link) : extractVimeoId(v.link)
    const thumbnailUrl = v.platform === 'youtube'
      ? `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`
      : undefined
    const embedUrl = v.platform === 'youtube'
      ? `https://www.youtube.com/embed/${vid}`
      : `https://player.vimeo.com/video/${vid}`
    return {
      '@type': 'VideoObject' as const,
      'name': v.title || cs.value?.title || '',
      'description': v.description || cs.value?.excerpt || '',
      'thumbnailUrl': thumbnailUrl,
      'embedUrl': embedUrl,
      'uploadDate': cs.value?.date_created ?? undefined,
    }
  })

useSchemaOrg([
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://huestudios.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Case Studies', 'item': 'https://huestudios.com/case-studies' },
      { '@type': 'ListItem', 'position': 3, 'name': cs.value?.title ?? 'Case Study' },
    ],
  },
  ...csVideoSchemas,
])

if (!csOgImg.value) {
  defineOgImage({ component: 'HueOg', props: { title: cs.value?.title ?? 'Case Study', description: cs.value?.excerpt ?? 'A case study by Hue.', label: 'Case Study' } })
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* Video carousel crossfade */
.video-fade-enter-active,
.video-fade-leave-active { transition: opacity 0.35s ease; }
.video-fade-enter-from,
.video-fade-leave-to { opacity: 0; }

/* Clip fixed-position children to this container's bounds */
.clip-to-parent {
  clip: rect(0, auto, auto, 0);
  clip-path: inset(0);
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>

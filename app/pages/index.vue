<template>
  <div>
    <HomeHeroEditorial />

    <!-- ═══ WORK ═══ -->
    <section id="work" class="border-t border-[var(--color-border)] px-5 md:px-6 py-16 md:py-28">
      <div class="hue-container">
        <p class="hue-marginalia mb-4">Selected Work</p>
        <!-- PHASE 4 PLACEHOLDER: mount <HomeWorkIndex /> here -->
        <div class="border border-dashed border-[var(--color-border)] p-10 text-center text-[0.875rem] text-[var(--grey)]">
          Work Index — coming in Phase 4
        </div>
      </div>
    </section>

    <HomeRationaleStrip />
    <HomeEngagementTiers />

    <!-- ═══ CLOSING CTA ═══ -->
    <section ref="cta" class="border-t border-[var(--color-border)] px-5 md:px-6 py-20 md:py-36">
      <div class="hue-container">
        <h2 class="hue-display-lg cta-reveal mb-8">Ready to build on reason?</h2>
        <div class="cta-reveal flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <NuxtLink to="/brand-analysis" class="hue-btn" @click="trackCtaClick('Complimentary Brand Assessment', 'homepage_closing_cta')">
            Complimentary Brand Assessment
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
          <NuxtLink to="/contact" class="hue-link">Or start a conversation</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { trackCtaClick, useScrollDepthTracker } = useTracking()

useSeoMeta({
  title: 'Hue — Brand Strategy & Creative Execution | Miami Beach & New York',
  description: 'Strategic brand positioning and creative execution for growth-stage companies, government agencies, and mission-driven organizations. Woman-owned. Founded 2005. Miami Beach & New York.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Hue Creative Marketing', description: 'Brand strategy, digital experience, and creative execution for growth-stage companies.' } })

const cta = ref<HTMLElement | null>(null)
const { reveal } = useEditorialMotion(cta)
onMounted(() => {
  useScrollDepthTracker()
  reveal('.cta-reveal')
})
</script>

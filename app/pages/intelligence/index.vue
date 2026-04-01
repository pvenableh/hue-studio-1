<template>
  <div class="intel-dark">
    <IntelligenceIntelHero />
    <IntelligenceIntelSocialProof />
    <IntelligenceIntelProblem />
    <IntelligenceIntelTracks />
    <IntelligenceIntelServices />
    <IntelligenceIntelIndustries />
    <IntelligenceIntelPricing />
    <IntelligenceIntelAbout />
    <IntelligenceIntelContact />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Hue Intelligence — AI & Automation for Growing Organizations',
  meta: [
    { name: 'description', content: 'Boutique AI and automation services from Hue Studios. Turn your organization\'s data into intelligence — reports, automations, content, and custom dashboards.' },
    { property: 'og:title', content: 'Hue Intelligence — AI & Automation for Growing Organizations' },
    { property: 'og:description', content: 'Boutique AI and automation services from Hue Studios. Turn your organization\'s data into intelligence — reports, automations, content, and custom dashboards.' },
    { property: 'og:image', content: '/intelligence/og-image.png' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})

useScrollReveal()

// Intelligence page forces dark mode
const { forceOn, restore } = useDarkMode()
onMounted(() => forceOn())
onUnmounted(() => restore())
</script>

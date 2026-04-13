<template>
  <div class="intel-dark">
    <IntelligenceIntelHero ref="heroComp" />
    <IntelligenceIntelSocialProof />
    <IntelligenceIntelProblem />
    <IntelligenceIntelTracks />
    <IntelligenceIntelServices />
    <IntelligenceIntelIndustries />
    <IntelligenceIntelPricing ref="pricingComp" />
    <IntelligenceIntelAbout />
    <IntelligenceIntelContact />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  title: 'Hue Intelligence — AI & Automation for Growing Organizations',
  meta: [
    { name: 'description', content: 'Boutique AI and automation services from Hue. Turn your organization\'s data into intelligence — reports, automations, content, and custom dashboards.' },
    { property: 'og:title', content: 'Hue Intelligence — AI & Automation for Growing Organizations' },
    { property: 'og:description', content: 'Boutique AI and automation services from Hue. Turn your organization\'s data into intelligence — reports, automations, content, and custom dashboards.' },
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

// --- ScrollTrigger animations (lg+ only) ---
const heroComp = ref<InstanceType<typeof IntelligenceIntelHero> | null>(null)
const pricingComp = ref<InstanceType<typeof IntelligenceIntelPricing> | null>(null)
const triggers: ScrollTrigger[] = []
const tweens: gsap.core.Tween[] = []

onMounted(async () => {
  await nextTick()
  if (import.meta.server) return
  if (!window.matchMedia('(min-width: 1024px)').matches) return

  // A. Sticky hero with parallax fade-out
  const heroSection = heroComp.value?.sectionEl
  const heroContent = heroComp.value?.contentEl
  if (heroSection && heroContent) {
    const st = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
    })
    triggers.push(st)

    // Fade & scale content as hero scrolls out
    const tween = gsap.to(heroContent, {
      opacity: 0,
      scale: 0.96,
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    tweens.push(tween)
  }

  // B. Section stagger entrances
  const sections = document.querySelectorAll('.intel-section')
  sections.forEach((section) => {
    gsap.set(section, { opacity: 0, y: 50 })
    const tween = gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
    tweens.push(tween)
  })

  // D. Pricing cards parallax stagger
  const pricingEl = pricingComp.value?.$el as HTMLElement | undefined
  if (pricingEl) {
    const cards = pricingEl.querySelectorAll('.intel-card')
    cards.forEach((card, i) => {
      const offset = i === 1 ? 0 : 30 // Featured (middle) card moves at normal speed, flanking cards lag
      gsap.set(card, { y: offset })
      const tween = gsap.to(card, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: pricingEl,
          start: 'top 90%',
          end: 'top 40%',
          scrub: true,
        },
      })
      tweens.push(tween)
    })
  }

  // Recalculate after layout settles (fixes client-side navigation)
  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
  tweens.forEach((t) => t.kill())
})
</script>

<template>
  <span
    ref="wordRef"
    class="pointer-events-none absolute select-none italic opacity-[0.04]"
    :class="[
      'text-[#888]',
      right ? 'right-0' : 'left-0',
    ]"
    :style="positionStyle"
    style="font-family: var(--font-editorial);"
  >{{ word }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  word: string
  dark?: boolean
  right?: boolean
  top?: string
}>(), {
  dark: false,
  right: false,
})

const wordRef = ref<HTMLElement | null>(null)

const positionStyle = computed(() => ({
  bottom: '0',
  fontSize: 'clamp(8rem, 18vw, 20rem)',
  lineHeight: '1',
  fontWeight: '300',
  transform: 'translateY(0.2em)',
}))

// Parallax effect — word scrolls at a slower rate
onMounted(async () => {
  await nextTick()
  if (!wordRef.value || import.meta.server) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(wordRef.value, {
    yPercent: 80,
    ease: 'none',
    scrollTrigger: {
      trigger: wordRef.value.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
})
</script>

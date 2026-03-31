<template>
  <p ref="containerRef" :class="$attrs.class">
    <span
      v-for="(word, i) in words"
      :key="i"
      :ref="(el) => { if (el) wordEls[i] = el as HTMLElement }"
      class="inline-block transition-opacity duration-100"
      style="opacity: 0.15"
    >{{ word }}&nbsp;</span>
  </p>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  text: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const wordEls = reactive<Record<number, HTMLElement>>({})

const words = computed(() => props.text.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean))

onMounted(async () => {
  await nextTick()
  if (!containerRef.value || import.meta.server) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const els = Object.values(wordEls)
  if (!els.length) return

  // Each word reveals as user scrolls through the container's parent
  els.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value!.closest('[data-scroll-reveal-root]') ?? containerRef.value,
        start: () => `top+=${(i / els.length) * 60}% center`,
        end: () => `top+=${((i + 1) / els.length) * 60 + 10}% center`,
        scrub: true,
      },
    })
  })
})
</script>

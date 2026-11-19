<template>
  <section ref="root" class="border-t border-[var(--color-border)] px-5 md:px-6 py-16 md:py-28">
    <div class="hue-container">
      <p class="hue-marginalia mb-10 md:mb-14">01 / Rationale</p>
      <div class="grid gap-10 md:grid-cols-3 md:gap-12">
        <div v-for="step in steps" :key="step.n" class="rationale-step border-t border-[var(--near-black)] pt-5">
          <p class="hue-marginalia mb-4">{{ step.n }} — {{ step.title }}</p>
          <p class="text-[1.125rem] leading-snug text-[var(--near-black)]">{{ step.copy }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { n: '01', title: 'Diagnose', copy: 'Find the real business tension before anything is designed.' },
  { n: '02', title: 'Architect', copy: 'Build one rationale that holds across print, video, social and web.' },
  { n: '03', title: 'Grow', copy: 'Senior-led execution that compounds into measurable results.' },
]
const root = ref<HTMLElement | null>(null)
const { reveal } = useEditorialMotion(root)
onMounted(() => reveal('.rationale-step', { stagger: 0.12 }))
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    v-bind="to ? { to } : {}"
    class="cta-shimmer-btn group inline-flex items-center gap-2 px-8 py-3.5 text-[0.6875rem] uppercase tracking-wider text-white transition-transform duration-300 hover:scale-105"
    :class="btnClass"
  >
    <div class="shimmer-glow @container-[size]">
      <div class="shimmer-glow-inner"><div class="shimmer-glow-spin" /></div>
    </div>
    <div class="shimmer-bg" :style="bgStyle" />
    <div class="shimmer-depth" />
    <span class="relative z-10 flex items-center gap-2">
      <slot>{{ text }}</slot>
      <Icon v-if="icon" :name="icon" class="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </component>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')

interface Props {
  text?: string
  to?: string
  icon?: string
  background?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Book a Discovery Call',
  icon: 'lucide:arrow-right',
  background: '',
})

const btnClass = computed(() => props.class ?? '')

const bgStyle = computed(() =>
  props.background ? { background: props.background } : {}
)
</script>

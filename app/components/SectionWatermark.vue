<template>
  <span
    class="pointer-events-none absolute select-none text-[clamp(6rem,15vw,14rem)] uppercase leading-[0.85] italic opacity-[0.06]"
    :class="[
      dark ? 'text-white' : 'text-[var(--near-black)]',
      right ? 'right-0' : 'left-0',
    ]"
    :style="`font-family: var(--font-editorial); top: ${top ?? '-0.5rem'};`"
  >{{ word }}</span>
</template>

<script setup lang="ts">
defineProps<{
  word: string
  dark?: boolean
  right?: boolean
  top?: string
}>()
</script>

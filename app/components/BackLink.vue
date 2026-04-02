<template>
  <div class="px-2 py-2">
    <NuxtLink
      :to="to"
      class="inline-flex items-center gap-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.15em] transition-colors"
      :class="light ? 'text-white/60 hover:text-white/90' : 'text-[var(--silver)] hover:text-[var(--color-text)]'"
    >
      <Icon name="lucide:arrow-left" class="size-2.5" />
      <slot />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  light?: boolean
}>()
</script>

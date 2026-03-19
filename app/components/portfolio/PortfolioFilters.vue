<template>
  <div class="sticky top-[112px] z-40 border-b border-[var(--color-border)] bg-white/90 px-6 backdrop-blur-md">
    <div class="hue-container overflow-x-auto py-4">
      <div class="flex min-w-max items-center gap-6">
        <!-- Service filters -->
        <div class="flex items-center gap-2">
          <span class="hue-label-sm whitespace-nowrap text-[var(--silver)]">Service</span>
          <div class="flex gap-1.5">
            <button
              v-for="s in serviceFilters"
              :key="s"
              class="rounded-full border px-3 py-1.5 text-[0.75rem] font-medium transition-all"
              :class="activeService === s
                ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
                : 'border-[var(--silk)] text-[var(--grey)] hover:border-[var(--silver)] hover:text-[var(--near-black)]'"
              @click="emit('update:service', s)"
            >{{ s }}</button>
          </div>
        </div>

        <div class="h-4 w-px shrink-0 bg-[var(--silk)]" />

        <!-- Industry filters -->
        <div class="flex items-center gap-2">
          <span class="hue-label-sm whitespace-nowrap text-[var(--silver)]">Industry</span>
          <div class="flex flex-wrap gap-1.5">
            <button
              class="rounded-full border px-3 py-1.5 text-[0.75rem] transition-all"
              :class="activeIndustry === 'All'
                ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
                : 'border-[var(--silk)] text-[var(--grey)] hover:border-[var(--silver)] hover:text-[var(--near-black)]'"
              @click="emit('update:industry', 'All')"
            >All</button>
            <button
              v-for="ind in industries"
              :key="ind"
              class="rounded-full border px-3 py-1.5 text-[0.75rem] transition-all"
              :class="activeIndustry === ind
                ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
                : 'border-[var(--silk)] text-[var(--grey)] hover:border-[var(--silver)] hover:text-[var(--near-black)]'"
              @click="emit('update:industry', ind)"
            >{{ ind.split('/')[0].split('&')[0].trim() }}</button>
          </div>
        </div>

        <div class="ml-auto text-[0.75rem] text-[var(--silver)] whitespace-nowrap pl-4">
          {{ count }} project{{ count !== 1 ? 's' : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  serviceFilters: string[]
  industries: string[]
  activeService: string
  activeIndustry: string
  count: number
}>()

const emit = defineEmits<{
  'update:service': [val: string]
  'update:industry': [val: string]
}>()
</script>

<template>
  <!-- Floating filter pill — fixed bottom-center -->
  <div class="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
    <div
      class="relative flex items-center gap-3 rounded-full border border-[var(--silk)] bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300"
      :class="expanded ? 'px-6 py-4' : 'px-5 py-2.5 cursor-pointer hover:shadow-xl'"
      @mouseenter="expanded = true"
      @mouseleave="delayCollapse"
    >
      <!-- Collapsed state -->
      <template v-if="!expanded">
        <Icon name="lucide:sliders-horizontal" class="size-3.5 text-[var(--grey)]" />
        <span class="text-[0.6875rem] font-medium uppercase tracking-wider text-[var(--grey)]">
          Filter
        </span>
        <span v-if="hasActiveFilters" class="flex h-4 w-4 items-center justify-center rounded-full text-[0.5rem] text-white" style="background: var(--color-accent);">
          {{ activeFilterCount }}
        </span>
        <span class="text-[0.625rem] text-[var(--silver)]">{{ count }}</span>
      </template>

      <!-- Expanded state -->
      <template v-else>
        <div class="flex items-center gap-4">
          <!-- Service filters -->
          <div class="flex items-center gap-2">
            <span class="text-[0.5625rem] font-medium uppercase tracking-widest text-[var(--silver)]">Service</span>
            <div class="flex gap-1">
              <button
                v-for="s in serviceFilters"
                :key="s"
                class="rounded-full border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-wider transition-all"
                :class="activeService === s
                  ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
                  : 'border-[var(--silk)] text-[var(--grey)] hover:border-[var(--silver)] hover:text-[var(--near-black)]'"
                @click="emit('update:service', s)"
              >{{ s }}</button>
            </div>
          </div>

          <div class="h-4 w-px bg-[var(--silk)]" />

          <!-- Industry filters -->
          <div class="flex items-center gap-2">
            <span class="text-[0.5625rem] font-medium uppercase tracking-widest text-[var(--silver)]">Industry</span>
            <div class="flex gap-1">
              <button
                class="rounded-full border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-wider transition-all"
                :class="activeIndustry === 'All'
                  ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
                  : 'border-[var(--silk)] text-[var(--grey)] hover:border-[var(--silver)] hover:text-[var(--near-black)]'"
                @click="emit('update:industry', 'All')"
              >All</button>
              <button
                v-for="ind in industries"
                :key="ind"
                class="rounded-full border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-wider transition-all"
                :class="activeIndustry === ind
                  ? 'border-[var(--near-black)] bg-[var(--near-black)] text-white'
                  : 'border-[var(--silk)] text-[var(--grey)] hover:border-[var(--silver)] hover:text-[var(--near-black)]'"
                @click="emit('update:industry', ind)"
              >{{ ind.split('/')[0].split('&')[0].trim() }}</button>
            </div>
          </div>

          <div class="h-4 w-px bg-[var(--silk)]" />

          <span class="text-[0.625rem] text-[var(--silver)] whitespace-nowrap">{{ count }} project{{ count !== 1 ? 's' : '' }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
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

const expanded = ref(false)
let collapseTimer: ReturnType<typeof setTimeout> | null = null

function delayCollapse() {
  collapseTimer = setTimeout(() => { expanded.value = false }, 400)
}

const hasActiveFilters = computed(() => props.activeService !== 'All' || props.activeIndustry !== 'All')
const activeFilterCount = computed(() => {
  let c = 0
  if (props.activeService !== 'All') c++
  if (props.activeIndustry !== 'All') c++
  return c
})

// Keep expanded while interacting
watch(expanded, (val) => {
  if (val && collapseTimer) {
    clearTimeout(collapseTimer)
    collapseTimer = null
  }
})
</script>

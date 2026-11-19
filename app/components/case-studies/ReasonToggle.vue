<template>
  <div role="group" :aria-label="label" class="inline-flex rounded-full border border-[var(--color-border)] bg-white p-1">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      :aria-pressed="modelValue === opt.value"
      class="rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      :class="modelValue === opt.value
        ? 'bg-[var(--near-black)] text-white'
        : 'text-[var(--dark-grey)] hover:text-[var(--near-black)]'"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
export type ReasonView = 'surface' | 'rationale'

withDefaults(defineProps<{ modelValue: ReasonView, label?: string }>(), {
  label: 'Choose how to view the work',
})
const emit = defineEmits<{ 'update:modelValue': [value: ReasonView] }>()

const options: { value: ReasonView, label: string }[] = [
  { value: 'surface', label: 'Surface View' },
  { value: 'rationale', label: 'Rationale View' },
]
</script>

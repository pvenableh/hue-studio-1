<template>
  <section class="px-6 py-20" :class="dark ? 'bg-[var(--near-black)]' : 'bg-[var(--color-accent-tint)]'" :style="dark ? '' : 'border-top: 0.5px solid var(--color-accent-tint)'">
    <div class="hue-container">
      <div class="mb-10 grid gap-8 lg:grid-cols-[220px_1fr]">
        <div>
          <p class="text-[0.625rem] uppercase tracking-[0.25em]" style="color: var(--color-accent);">{{ label }}</p>
        </div>
        <div>
          <h2 class="text-[1.75rem] font-light" :class="dark ? 'text-white' : ''" style="font-family: var(--font-editorial);">{{ title }}</h2>
        </div>
      </div>

      <!-- Dual track indicator -->
      <div v-if="dualTrack" class="mb-6 flex gap-4">
        <div class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full" style="background: var(--color-accent);" />
          <span class="text-[0.625rem] uppercase tracking-widest" :class="dark ? 'text-white/40' : 'text-[var(--grey)]'">Track I — Brand Strategy</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full" :class="dark ? 'bg-white/60' : 'bg-[var(--near-black)]'" />
          <span class="text-[0.625rem] uppercase tracking-widest" :class="dark ? 'text-white/40' : 'text-[var(--grey)]'">Track II — Digital Experience</span>
        </div>
      </div>

      <div class="grid gap-px overflow-hidden rounded-sm" :class="dark ? 'bg-white/6' : 'bg-[var(--color-accent-tint)]'">
        <div
          v-for="(phase, i) in phases"
          :key="i"
          class="grid items-start gap-8 p-6 transition-colors md:grid-cols-[60px_1fr_1fr]"
          :class="dark ? 'bg-[#111110] hover:bg-[#1a1a18]' : 'bg-[var(--color-accent-tint)] hover:bg-white'"
        >
          <div class="text-[1.75rem] font-light" :class="dark ? 'text-white/10' : 'text-[color-mix(in srgb, var(--color-accent) 20%, transparent)]'" style="font-family: var(--font-editorial);">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <div>
            <h3 class="text-[1.0625rem]" :class="dark ? 'text-white/90' : ''" style="font-family: var(--font-editorial);">{{ phase.title }}</h3>
            <p class="mt-1 text-[0.625rem] uppercase tracking-widest" style="color: var(--color-accent);">{{ phase.duration }}</p>
          </div>
          <p class="text-[0.8125rem] leading-relaxed" :class="dark ? 'text-white/35' : 'text-[var(--grey)]'">{{ phase.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface TimelinePhase {
  title: string
  duration: string
  description: string
  track?: 'brand' | 'digital' | 'both'
}

withDefaults(defineProps<{
  label?: string
  title?: string
  phases: TimelinePhase[]
  dark?: boolean
  dualTrack?: boolean
}>(), {
  label: 'The Process',
  title: 'What working with us actually looks like.',
  dark: false,
  dualTrack: false,
})
</script>

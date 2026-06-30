<template>
  <div>
    <!-- Collapsible content stays in the DOM (good for SEO + a11y), animated
         open/closed via grid-template-rows. -->
    <div
      :id="panelId"
      class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      role="region"
    >
      <div class="overflow-hidden" :class="open ? '' : 'opacity-0'" :style="{ transition: 'opacity 0.4s ease' }">
        <slot />
      </div>
    </div>

    <div class="mt-5 flex" :class="align === 'center' ? 'justify-center' : 'justify-start'">
      <button
        type="button"
        class="hue-link"
        :aria-expanded="open"
        :aria-controls="panelId"
        @click="open = !open"
      >
        {{ open ? closeLabel : openLabel }}
        <Icon :name="open ? 'lucide:minus' : 'lucide:plus'" class="size-3.5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

const props = withDefaults(defineProps<{
  openLabel?: string
  closeLabel?: string
  align?: 'start' | 'center'
  defaultOpen?: boolean
}>(), {
  openLabel: 'Read more',
  closeLabel: 'Show less',
  align: 'start',
  defaultOpen: false,
})

const open = ref(props.defaultOpen)
const panelId = `reveal-${useId()}`
</script>

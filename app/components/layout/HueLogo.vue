<template>
  <NuxtLink to="/" class="hue-logo" aria-label="Hue Creative Agency — Home">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48.62 98.44"
      :style="{ height: size, width: 'auto', transform: 'rotate(-90deg)' }"
    >
      <path :fill="fillColor" d="M372.32,355.65v-6.28h19.35c-3.5-2-5.48-6.14-5.48-10.77,0-3.5,1.25-8.52,5.28-10.44,1.32-.66,2.91-1.12,7.73-1.12h20.74v3.56c0,5.61-19.62,2.78-19.62,2.78-3,0-9.38,0-9.38,7.13a8.57,8.57,0,0,0,4.43,7.79c1.85,1.06,5,1.06,7,1.06h17.57v6.28Z" style="transform: translate(-372.32px, -257.21px)" />
      <path :fill="fillColor" d="M386.78,314.89h21.34c3.24,0,7.33-.73,7.33-7.07,0-3.1-1.06-6-3.7-7.79-2-1.39-4.56-1.39-6.21-1.39,0,0-18.76,1.87-18.76-2.07v-4.33h27c.66,0,4.36-.13,6.21-.2v6.47l-5.68.13c2.31,1.19,6,3.44,6,10.57,0,8.19-4.69,12-11.23,12H386.78Z" style="transform: translate(-372.32px, -257.21px)" />
      <path :fill="fillColor" d="M404.49,281.09c6.87.13,12-2.71,12-9.51,0-5.93-6.87-6.3-6.87-9.67v-4.33a11.26,11.26,0,0,1,6.94,2.84c1.65,1.45,4.43,4.76,4.43,11.43,0,10.44-6.47,15.39-17,15.39-6.54,0-12-1.32-15.59-6.54-2.25-3.17-2.44-7.13-2.44-9.05,0-14.86,13.15-14.53,18.56-14.4Zm-4.36-17.51c-3.17-.07-9.78.53-9.78,8.19,0,4,2.44,8.92,9.78,9Z" style="transform: translate(-372.32px, -257.21px)" />
    </svg>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  fill?: 'dark' | 'light' | 'grey'
  size?: string
}>(), {
  fill: 'dark',
  size: '20px',
})

const fillColor = computed(() => {
  switch (props.fill) {
    case 'light': return '#ffffff'
    case 'grey':  return '#c7c7c7'
    default:      return '#1d1d1f'
  }
})
</script>

<style scoped>
.hue-logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 300ms ease;
}
.hue-logo:hover { opacity: 0.6; }
</style>

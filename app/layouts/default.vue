<template>
  <div>
    <div class="pwa-safe-area" />
    <LayoutSiteNav />
    <main>
      <slot />
    </main>
    <LayoutSiteFooter />
    <!-- Site-wide "Book a Call" (general request form). Suppressed on individual
         team profiles, where the only booking action is that person's own
         Earnest scheduler. -->
    <StickyContact v-if="!isTeamProfile" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isTeamProfile = computed(() => /^\/team\/[^/]+/.test(route.path))
</script>

<style scoped>
@media all and (display-mode: standalone) {
  .pwa-safe-area {
    height: env(safe-area-inset-top, 0px);
    background: var(--color-bg);
  }
}
</style>

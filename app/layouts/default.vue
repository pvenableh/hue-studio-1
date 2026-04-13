<template>
  <div>
    <div class="pwa-safe-area" />
    <LayoutSiteNav />
    <main>
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>

<style scoped>
@media all and (display-mode: standalone) {
  .pwa-safe-area {
    height: env(safe-area-inset-top, 0px);
    background: var(--color-bg);
  }
}
</style>

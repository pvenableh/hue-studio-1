<template>
  <div class="relative">
    <div class="pwa-safe-area" />
    <!-- Floating Menu Button -->
    <button
      class="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center transition-all hover:opacity-70"
      @click="menuOpen = true"
    >
      <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
      </svg>
    </button>

    <!-- Menu Sheet Overlay -->
    <Teleport to="body">
      <Transition name="sheet">
        <div v-if="menuOpen" class="fixed inset-0 z-[100]" @click.self="menuOpen = false">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="menuOpen = false" />

          <!-- Sheet -->
          <div class="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-[var(--near-black)] shadow-2xl">
            <!-- Close -->
            <button class="absolute right-6 top-6 text-white/50 transition-colors hover:text-white" @click="menuOpen = false">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="px-10 py-20">
              <!-- Logo -->
              <NuxtLink to="/" class="mb-16 block" @click="menuOpen = false">
                <LayoutLogo color="rgba(255,255,255,0.6)" class="h-8 w-auto" />
              </NuxtLink>

              <!-- Navigation -->
              <nav class="mb-16 space-y-1">
                <NuxtLink
                  v-for="link in navLinks"
                  :key="link.to"
                  :to="link.to"
                  class="block py-3 text-[1.5rem] font-light text-white/70 transition-colors hover:text-white"
                  @click="menuOpen = false"
                >{{ link.label }}</NuxtLink>
              </nav>

              <!-- CTA -->
              <div class="mb-16">
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center gap-2 rounded-full bg-white px-2 md:px-6 py-3 text-[0.8125rem] font-medium text-[var(--near-black)] transition-opacity hover:opacity-90"
                  @click="menuOpen = false"
                >
                  Book a Call
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </NuxtLink>
              </div>

              <!-- Footer Info -->
              <div class="space-y-6 border-t border-white/10 pt-10">
                <div>
                  <p class="mb-2 text-[0.625rem] font-medium uppercase tracking-[0.25em] text-white/25">Contact</p>
                  <a href="mailto:contact@huestudios.com" class="block text-[0.875rem] text-white/50 hover:text-white/70">contact@huestudios.com</a>
                  <p class="mt-1 text-[0.8125rem] text-white/30">305.680.0485</p>
                </div>
                <div>
                  <p class="mb-2 text-[0.625rem] font-medium uppercase tracking-[0.25em] text-white/25">Studios</p>
                  <p class="text-[0.8125rem] text-white/30">Miami Beach, FL</p>
                  <p class="text-[0.8125rem] text-white/30">New York, NY</p>
                </div>
                <p class="text-[0.6875rem] text-white/15">&copy; {{ new Date().getFullYear() }} Hue Studios</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Page Content (no header) -->
    <main>
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const navLinks = [
  { label: 'Services', to: '/creative-services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Industries', to: '/industries' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Magazine', to: '/magazine' },
  { label: 'Partnerships', to: '/partnerships' },
  { label: 'About', to: '/about' },
]

// Close on escape
onMounted(() => {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') menuOpen.value = false }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.sheet-enter-active > div:first-child,
.sheet-leave-active > div:first-child {
  transition: opacity 300ms ease;
}
.sheet-enter-active > div:last-child,
.sheet-leave-active > div:last-child {
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sheet-enter-from > div:first-child,
.sheet-leave-to > div:first-child {
  opacity: 0;
}
.sheet-enter-from > div:last-child,
.sheet-leave-to > div:last-child {
  transform: translateX(100%);
}

@media all and (display-mode: standalone) {
  .pwa-safe-area {
    height: env(safe-area-inset-top, 0px);
    background: var(--color-bg);
  }
}
</style>

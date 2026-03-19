<template>
  <div>
    <!-- Audit announcement bar -->
    <div class="border-b border-[var(--color-border)] bg-[var(--white)] px-4 py-2.5">
      <div class="hue-container flex items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center rounded-full bg-[var(--near-black)] px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider text-white">Free</span>
          <p class="text-[0.78rem] text-[var(--color-text-secondary)]">
            <strong class="font-medium text-[var(--color-text)]">Brand Perception Audit</strong>
            — 8 questions. 15 minutes. Custom presentation in 5 days.
          </p>
        </div>
        <NuxtLink to="/brand-audit" class="hue-link shrink-0 text-[0.78rem]">
          Start Free Audit
          <Icon name="lucide:arrow-right" class="size-3" />
        </NuxtLink>
      </div>
    </div>

    <!-- Main nav -->
    <nav class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur-md">
      <div class="hue-container flex h-14 items-center justify-between">
        <LayoutHueLogo size="18px" />

        <!-- Desktop links -->
        <div class="hidden items-center gap-7 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-[0.8125rem] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            active-class="!text-[var(--near-black)] font-medium"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink to="/contact" class="hue-btn hidden text-[0.8125rem] sm:inline-flex">
            Book a Call
            <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
          <!-- Mobile menu toggle -->
          <button
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--silk)] md:hidden"
            @click="mobileOpen = !mobileOpen"
            aria-label="Toggle menu"
          >
            <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="size-4" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="border-t border-[var(--silk)] bg-white px-6 py-4 md:hidden">
          <div class="flex flex-col gap-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-[0.9375rem] text-[var(--color-text-secondary)]"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <NuxtLink to="/contact" class="hue-btn self-start" @click="mobileOpen = false">
              Book a Call
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </div>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Services',      to: '/creative-services' },
  { label: 'Portfolio',     to: '/portfolio' },
  { label: 'Industries',    to: '/industries' },
  { label: 'Case Studies',  to: '/case-studies' },
  { label: 'Partnerships',  to: '/partnerships' },
  { label: 'About',         to: '/about' },
]

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => { mobileOpen.value = false })
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.mobile-menu-enter-from,
.mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }
</style>

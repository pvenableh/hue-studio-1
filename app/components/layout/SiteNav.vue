<template>
  <header
    class="sticky top-0 z-50 transition-transform duration-300"
    :class="navHidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <!-- Audit announcement bar -->
    <NuxtLink to="/brand-audit" class="block px-2 md:px-6 py-2.5 transition-opacity hover:opacity-90" style="background: var(--color-accent); border-bottom: 1px solid var(--color-accent-hover);">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider text-white">Free</span>
          <p class="text-[0.78rem] text-white/80">
            <strong class="font-medium text-white">Brand Perception Audit</strong>
            <span class="hidden sm:inline"> — 10 questions. 15 minutes. Custom presentation in 5 days.</span>
          </p>
        </div>
        <span class="flex shrink-0 items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-white">
          Start Free
          <Icon name="lucide:arrow-right" class="size-3" />
        </span>
      </div>
    </NuxtLink>

    <!-- Main nav -->
    <nav class="bg-white/70 backdrop-blur-xl">
      <div class="flex h-16 items-end px-2 md:px-6 pb-3">
        <NuxtLink to="/" class="shrink-0">
          <LayoutLogo size="18px" class="w-20" />
        </NuxtLink>

        <!-- Desktop links -->
        <div class="ml-auto hidden items-end gap-8 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-[0.5rem] font-medium uppercase tracking-[0.3em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            active-class="!text-[var(--near-black)]"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Mobile menu toggle -->
        <button
          class="ml-auto mr-1 flex h-9 w-9 items-center justify-center md:hidden"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="size-4" />
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="border-t border-[var(--silk)] bg-white px-2 md:px-6 py-4 md:hidden">
          <div class="flex flex-col gap-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-[0.8125rem] uppercase tracking-wider text-[var(--color-text-secondary)]"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <MeetingRequest class="self-start" />
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
const navHidden = ref(false)

const navLinks = [
  { label: 'Services',      to: '/creative-services' },
  { label: 'Portfolio',     to: '/portfolio' },
  { label: 'Industries',    to: '/industries' },
  { label: 'Case Studies',  to: '/case-studies' },
  { label: 'Magazine',      to: '/magazine' },
  { label: 'Partnerships',  to: '/partnerships' },
  { label: 'About',         to: '/about' },
]

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => { mobileOpen.value = false })

// Hide nav on scroll down, show on scroll up
onMounted(() => {
  let lastY = 0
  const threshold = 60

  const onScroll = () => {
    const y = window.scrollY
    if (y < threshold) {
      navHidden.value = false
    } else if (y > lastY + 5) {
      navHidden.value = true
      mobileOpen.value = false
    } else if (y < lastY - 5) {
      navHidden.value = false
    }
    lastY = y
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.mobile-menu-enter-from,
.mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }
</style>

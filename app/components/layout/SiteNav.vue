<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="[
      navHidden ? '-translate-y-full' : 'translate-y-0',
      scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.06)]' : ''
    ]"
  >
    <!-- Analysis announcement bar (hidden on Intelligence page) -->
    <NuxtLink v-if="!isIntelligencePage" to="/brand-analysis" class="block px-2 md:px-6 py-2.5 transition-opacity hover:opacity-90" style="background: var(--color-accent); border-bottom: 1px solid var(--color-accent-hover);">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider text-white">Free</span>
          <p class="text-[0.78rem] text-white/80">
            <strong class="font-medium text-white">Brand Perception Analysis</strong>
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
    <nav :class="isDarkNav ? (scrolled ? 'bg-[var(--color-bg)]/90 backdrop-blur-xl' : 'bg-transparent backdrop-blur-none') : 'bg-[var(--color-bg)]/70 backdrop-blur-xl'" class="overflow-hidden transition-colors duration-300">
      <div class="relative flex h-16 items-end px-2 md:px-6 pb-3">
        <NuxtLink to="/" class="absolute bottom-[-1px] left-0 md:-bottom-[2px] md:left-0 z-10 shrink-0">
          <LayoutLogo size="18px" :animate="true" class="w-32" />
        </NuxtLink>
        <div class="w-24 shrink-0" /><!-- spacer for logo -->

        <!-- Desktop links -->
        <div class="ml-auto hidden items-end gap-8 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-[0.5rem] font-medium uppercase tracking-[0.3em] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            active-class="!text-[var(--color-text)]"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Dark mode toggle switch (desktop) -->
        <button
          class="dark-switch ml-4 hidden md:flex"
          :class="{ 'is-on': isDarkNav }"
          role="switch"
          :aria-checked="isDarkNav ? 'true' : 'false'"
          aria-label="Toggle dark mode"
          @click="toggleDarkMode"
        >
          <span class="dark-switch-thumb" />
        </button>

        <!-- Mobile menu toggle -->
        <button
          class="mobile-toggle ml-auto mr-1 flex h-9 w-9 items-center justify-center md:hidden"
          :class="mobileOpen ? 'is-open' : ''"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <span class="hamburger-lines">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile menu overlay — rendered outside header to overlay the entire page -->
  <Teleport to="body">
    <Transition name="mobile-overlay">
      <div v-if="mobileOpen" class="fixed inset-0 z-[60] md:hidden" @click.self="mobileOpen = false">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[var(--near-black)]/80 backdrop-blur-sm" @click="mobileOpen = false" />

        <!-- Menu panel — full width, full height, drops from top -->
        <div class="mobile-panel absolute inset-0 bg-[var(--near-black)] px-6 pt-20">
          <!-- Close button -->
          <button
            class="absolute right-5 top-5 flex h-9 w-9 items-center justify-center text-white/40 transition-colors hover:text-white"
            @click="mobileOpen = false"
            aria-label="Close menu"
          >
            <Icon name="lucide:x" class="size-5" />
          </button>

          <!-- Dark mode toggle — level with close button -->
          <div class="absolute left-6 top-5 z-10 flex h-9 items-center gap-2">
            <button
              class="dark-switch dark-switch-mobile"
              :class="{ 'is-on': isDarkNav }"
              role="switch"
              :aria-checked="isDarkNav ? 'true' : 'false'"
              aria-label="Toggle dark mode"
              @click="toggleDarkMode"
            >
              <span class="dark-switch-thumb" />
            </button>
            <span class="text-[0.5rem] font-medium uppercase tracking-[0.2em] text-white/25">{{ isDarkNav ? 'Dark' : 'Light' }}</span>
          </div>

          <!-- Logo watermark -->
          <LayoutLogo color="rgba(255,255,255,0.04)" class="menu-watermark pointer-events-none absolute bottom-0 w-[103%] -left-2 select-none" />

          <nav class="relative z-10 flex h-full flex-col justify-between pb-10">
            <div class="flex flex-col gap-5">
              <NuxtLink
                to="/"
                class="mobile-link text-[0.625rem] font-medium uppercase tracking-[0.3em] text-white/50 transition-all duration-300 hover:text-white hover:tracking-[0.35em]"
                :style="{ transitionDelay: '80ms' }"
                exact-active-class="!text-white"
                @click="mobileOpen = false"
              >
                Home
              </NuxtLink>
              <NuxtLink
                v-for="(link, i) in navLinks"
                :key="link.to"
                :to="link.to"
                class="mobile-link text-[0.625rem] font-medium uppercase tracking-[0.3em] text-white/50 transition-all duration-300 hover:text-white hover:tracking-[0.35em]"
                :style="{ transitionDelay: `${120 + i * 40}ms` }"
                active-class="!text-white"
                @click="mobileOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <MeetingRequest class="mobile-cta self-start !bg-transparent !border !border-white/20 !text-white/70 hover:!border-white/40 hover:!text-white" />
              </div>
              <p class="text-[0.5rem] uppercase tracking-[0.3em] text-white/20">Miami Beach · New York</p>
            </div>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
const navHidden = ref(false)
const scrolled = ref(false)

const navLinks = [
  { label: 'Services',      to: '/creative-services' },
  { label: 'Portfolio',     to: '/portfolio' },
  { label: 'Industries',    to: '/industries' },
  { label: 'Case Studies',  to: '/case-studies' },
  { label: 'Intelligence',  to: '/intelligence' },
  { label: 'Magazine',      to: '/magazine' },
  { label: 'Partnerships',  to: '/partnerships' },
  { label: 'About',         to: '/about' },
]

// Dark mode state — nav adapts to site-wide toggle
const { isDark, toggle: toggleDarkMode } = useDarkMode()
const isDarkNav = isDark

// Intelligence page hides the announcement bar
const isIntelligencePage = computed(() => route.path.startsWith('/intelligence'))

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => { mobileOpen.value = false })

// Lock body scroll when mobile menu open
watch(mobileOpen, (open) => {
  if (import.meta.server) return
  document.body.style.overflow = open ? 'hidden' : ''
})

// Hide nav on scroll down, show on scroll up
onMounted(() => {
  let lastY = 0
  const threshold = 60

  const onScroll = () => {
    const y = window.scrollY
    scrolled.value = y > 10
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
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.body.style.overflow = ''
  })
})
</script>

<style scoped>
/* ── Hamburger icon with animated lines ── */
.hamburger-lines {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 16px;
}
.hamburger-lines span {
  display: block;
  height: 1.5px;
  width: 100%;
  background: currentColor;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
  transform-origin: center;
}
.mobile-toggle.is-open .hamburger-lines span:nth-child(1) {
  transform: translateY(5.5px) rotate(45deg);
}
.mobile-toggle.is-open .hamburger-lines span:nth-child(2) {
  opacity: 0;
}
.mobile-toggle.is-open .hamburger-lines span:nth-child(3) {
  transform: translateY(-5.5px) rotate(-45deg);
}

/* ── Overlay transitions ── */
.mobile-overlay-enter-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-overlay-leave-active {
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-overlay-enter-active .mobile-panel {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-overlay-leave-active .mobile-panel {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}
.mobile-overlay-enter-from .mobile-panel,
.mobile-overlay-leave-to .mobile-panel {
  transform: translateY(-100%);
}

/* ── Staggered link entrance ── */
.mobile-overlay-enter-active .mobile-link {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-overlay-enter-from .mobile-link {
  opacity: 0;
  transform: translateY(-10px);
}

/* ── Smooth link exit ── */
.mobile-overlay-leave-active .mobile-link {
  transition: opacity 0.2s ease;
}
.mobile-overlay-leave-to .mobile-link {
  opacity: 0;
}

/* ── Logo watermark depth animation ── */
.mobile-overlay-enter-active .menu-watermark {
  transition: opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}
.mobile-overlay-enter-from .menu-watermark {
  opacity: 0;
  transform: translateY(30px) scale(0.97);
}
.mobile-overlay-leave-active .menu-watermark {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-overlay-leave-to .menu-watermark {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

/* ── Dark mode toggle switch ── */
.dark-switch {
  position: relative;
  width: 28px;
  height: 14px;
  border-radius: 7px;
  background: var(--color-text-muted, #999);
  opacity: 0.35;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.25s ease, opacity 0.25s ease;
}
.dark-switch:hover { opacity: 0.6; }
.dark-switch.is-on { background: rgba(255,255,255,0.4); opacity: 0.5; }
.dark-switch.is-on:hover { opacity: 0.7; }

.dark-switch-thumb {
  position: absolute;
  top: 1.5px;
  left: 1.5px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  color: #333;
}
.dark-switch.is-on .dark-switch-thumb {
  transform: translateX(14px);
  color: #1a1a1a;
}

.dark-switch-mobile {
  width: 32px;
  height: 16px;
  border-radius: 8px;
  opacity: 0.5;
}
.dark-switch-mobile .dark-switch-thumb {
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
}
.dark-switch-mobile.is-on .dark-switch-thumb {
  transform: translateX(16px);
}
</style>

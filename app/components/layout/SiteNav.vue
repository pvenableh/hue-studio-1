<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="navHidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <!-- Main nav -->
    <nav class="bg-white/85 backdrop-blur-md border-b border-[var(--color-border)] overflow-hidden">
      <div class="relative flex h-16 items-end px-2 md:px-6 pb-3">
        <NuxtLink to="/" class="absolute bottom-[-1px] left-0 md:-bottom-[2px] md:left-0 z-10 shrink-0">
          <LayoutLogo size="18px" :animate="true" class="w-32" />
        </NuxtLink>
        <div class="w-24 shrink-0" /><!-- spacer for logo -->

        <!-- Desktop links -->
        <div class="ml-auto hidden items-center gap-8 lg:flex xl:gap-10">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-accent,#B8975A)]"
            active-class="!text-[var(--color-text)]"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="rounded-full bg-[var(--near-black)] px-5 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-80"
          >
            Start a Conversation
          </NuxtLink>
        </div>

        <!-- Mobile menu toggle -->
        <button
          class="mobile-toggle ml-auto mr-1 flex h-9 w-9 items-center justify-center lg:hidden"
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
      <div v-if="mobileOpen" class="fixed inset-0 z-[60] lg:hidden" @click.self="mobileOpen = false">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[var(--near-black)]/80 backdrop-blur-sm" @click="mobileOpen = false" />

        <!-- Menu panel — full width, full height, drops from top -->
        <div class="mobile-panel absolute inset-0 bg-white px-6 pt-20">
          <!-- Close button -->
          <button
            class="absolute right-5 top-5 flex h-9 w-9 items-center justify-center text-[var(--dark-grey)] transition-colors hover:text-[var(--near-black)]"
            @click="mobileOpen = false"
            aria-label="Close menu"
          >
            <Icon name="lucide:x" class="size-5" />
          </button>

          <!-- Logo watermark -->
          <LayoutLogo color="rgba(20,20,19,0.04)" class="menu-watermark pointer-events-none absolute bottom-0 w-[103%] -left-2 select-none" />

          <nav class="relative z-10 flex h-full flex-col justify-between pb-10">
            <div class="flex flex-col gap-5">
              <NuxtLink
                to="/"
                class="mobile-link text-[0.625rem] font-medium uppercase tracking-[0.3em] text-[var(--dark-grey)] transition-all duration-300 hover:text-[var(--near-black)] hover:tracking-[0.35em]"
                :style="{ transitionDelay: '80ms' }"
                exact-active-class="!text-[var(--near-black)]"
                @click="mobileOpen = false"
              >
                Home
              </NuxtLink>
              <NuxtLink
                v-for="(link, i) in navLinks"
                :key="link.to"
                :to="link.to"
                class="mobile-link text-[0.625rem] font-medium uppercase tracking-[0.3em] text-[var(--dark-grey)] transition-all duration-300 hover:text-[var(--near-black)] hover:tracking-[0.35em]"
                :style="{ transitionDelay: `${120 + i * 40}ms` }"
                active-class="!text-[var(--near-black)]"
                @click="mobileOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <NuxtLink to="/contact" class="mobile-cta self-start rounded-full bg-[var(--near-black)] px-5 py-2.5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white" @click="mobileOpen = false">Start a Conversation</NuxtLink>
              </div>
              <p class="text-[0.5rem] uppercase tracking-[0.3em] text-[var(--grey)]">Miami Beach · New York</p>
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

const navLinks = [
  { label: 'Work',         to: '/case-studies' },
  { label: 'Approach',     to: '/about' },
  { label: 'Capabilities', to: '/creative-services' },
]

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
/* ── Mobile toggle entrance/exit ── */
.mobile-toggle {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}
.mobile-toggle.is-open {
  opacity: 0;
  transform: translateY(8px);
}

/* ── Hamburger icon with animated lines ── */
.hamburger-lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 34px;
}
.hamburger-lines span {
  display: block;
  height: 1px;
  width: 100%;
  background: currentColor;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
  transform-origin: center;
}
/* X animation disabled — close button is inside the mobile menu overlay
.mobile-toggle.is-open .hamburger-lines span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.mobile-toggle.is-open .hamburger-lines span:nth-child(2) {
  opacity: 0;
}
.mobile-toggle.is-open .hamburger-lines span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}
*/

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
</style>

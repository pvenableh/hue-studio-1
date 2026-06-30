<template>
  <div
    class="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:justify-end sm:px-6"
    aria-hidden="false"
  >
    <div
      ref="capsuleRef"
      class="sticky-capsule pointer-events-auto flex items-center gap-3 rounded-sm border border-[var(--color-border-light)] bg-[var(--color-bg)]/95 px-3 py-2.5 shadow-[var(--shadow-lg)] backdrop-blur-md sm:gap-4 sm:px-4"
      :class="visible ? 'is-visible' : ''"
    >
      <span class="relative ml-1 hidden size-1.5 shrink-0 sm:flex">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
        <span class="relative inline-flex size-1.5 rounded-full bg-[var(--color-accent)]" />
      </span>
      <p class="hidden text-[0.8125rem] leading-tight text-[var(--color-text-secondary)] sm:block">
        Have a project <span style="font-family:var(--font-editorial);font-style:italic;">in mind?</span>
      </p>
      <MeetingRequest class="!px-4 !py-2 text-[0.75rem]">
        Book a Call
        <Icon name="lucide:arrow-right" class="size-3.5" />
      </MeetingRequest>
      <button
        type="button"
        aria-label="Dismiss"
        class="ml-0.5 shrink-0 text-[var(--silver)] transition-colors hover:text-[var(--color-text)]"
        @click="dismiss"
      >
        <Icon name="lucide:x" class="size-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'hue-sticky-contact-dismissed'

const visible = ref(false)
const capsuleRef = ref<HTMLElement | null>(null)
let dismissed = false
let footerObserver: IntersectionObserver | null = null
let footerInView = false

function update() {
  if (dismissed) { visible.value = false; return }
  const pastHero = window.scrollY > window.innerHeight * 0.85
  visible.value = pastHero && !footerInView
}

function dismiss() {
  dismissed = true
  visible.value = false
  try { sessionStorage.setItem(STORAGE_KEY, '1') } catch {}
}

onMounted(() => {
  try { dismissed = sessionStorage.getItem(STORAGE_KEY) === '1' } catch {}

  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })

  // Hide once the footer (which carries its own CTA) scrolls into view.
  const footer = document.querySelector('footer')
  if (footer && 'IntersectionObserver' in window) {
    footerObserver = new IntersectionObserver(
      (entries) => { footerInView = entries[0]?.isIntersecting ?? false; update() },
      { rootMargin: '0px 0px -10% 0px' }
    )
    footerObserver.observe(footer)
  }

  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
  footerObserver?.disconnect()
})
</script>

<style scoped>
.sticky-capsule {
  opacity: 0;
  transform: translateY(140%);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
.sticky-capsule.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .sticky-capsule { transition: opacity 0.3s ease; transform: none; }
}
</style>

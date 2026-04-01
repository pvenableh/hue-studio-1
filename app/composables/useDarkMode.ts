/**
 * Dark mode composable with localStorage persistence.
 *
 * Adds/removes the `dark` class on <html>.
 * Certain pages (e.g. /intelligence) can force dark mode via `forceOn()`.
 */
const STORAGE_KEY = 'hue-dark-mode'

const isDark = ref(false)
const isForced = ref(false)

export function useDarkMode() {
  function apply(dark: boolean) {
    if (import.meta.server) return
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
  }

  function toggle() {
    const next = !isDark.value
    apply(next)
    isForced.value = false
    try { localStorage.setItem(STORAGE_KEY, next ? '1' : '0') } catch {}
  }

  /** Force dark mode on (e.g. Intelligence page). Does not persist to storage. */
  function forceOn() {
    isForced.value = true
    apply(true)
  }

  /** Restore to user preference (called when leaving a forced-dark page). */
  function restore() {
    if (!isForced.value) return
    isForced.value = false
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      apply(stored === '1')
    } catch {
      apply(false)
    }
  }

  /** Initialize from storage or system preference. Call once on app mount. */
  function init() {
    if (import.meta.server) return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        apply(stored === '1')
        return
      }
    } catch {}
    // Fallback to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(prefersDark)
  }

  return { isDark: readonly(isDark), isForced: readonly(isForced), toggle, forceOn, restore, init }
}

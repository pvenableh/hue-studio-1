<template>
  <div class="hue-section min-h-screen px-5 md:px-6 py-14 md:py-24">
    <div class="hue-container">
      <!-- Intro -->
      <div class="mb-10 max-w-2xl">
        <p class="hue-label mb-3" style="color: var(--color-accent);">Proof of Concept</p>
        <h1 class="hue-display-lg mb-4">
          Embeddable card &amp; <span style="font-family:var(--font-editorial);font-style:italic;">booking.</span>
        </h1>
        <p class="hue-body-lg">
          A self-contained CardDesk widget — digital business card plus live booking — that any user can drop onto their own site with one snippet. Customize it below; the preview and the embed code update live.
        </p>
        <p class="hue-body-sm mt-3">
          Demo runs on sample data. In production the widget hydrates from the shared scheduling API (event types, availability) and the user's CardDesk profile.
        </p>
      </div>

      <div class="grid gap-10 lg:grid-cols-[1fr_400px]">
        <!-- ── Customizer + code ── -->
        <div>
          <!-- Accent -->
          <div class="mb-8">
            <p class="hue-label-sm mb-3">Accent</p>
            <div class="flex flex-wrap items-center gap-2">
              <button
                v-for="c in accents"
                :key="c.value"
                class="flex items-center gap-2 rounded-sm border px-3 py-2 text-[0.75rem] transition-colors"
                :class="accent === c.value ? 'border-[var(--near-black)]' : 'border-[var(--silk)] hover:border-[var(--silver)]'"
                @click="accent = c.value"
              >
                <span class="size-3.5 rounded-full" :style="{ background: c.value }" />
                {{ c.name }}
              </button>
              <label class="flex items-center gap-2 rounded-sm border border-[var(--silk)] px-3 py-2 text-[0.75rem]">
                Custom
                <input type="color" v-model="accent" class="h-5 w-7 cursor-pointer border-0 bg-transparent p-0" />
              </label>
            </div>
          </div>

          <!-- Theme -->
          <div class="mb-8">
            <p class="hue-label-sm mb-3">Theme</p>
            <div class="inline-flex rounded-sm border border-[var(--silk)] p-1">
              <button
                v-for="t in (['light','dark'] as const)"
                :key="t"
                class="rounded-[2px] px-4 py-1.5 text-[0.75rem] capitalize transition-colors"
                :class="theme === t ? 'bg-[var(--near-black)] text-white' : 'text-[var(--grey)]'"
                @click="theme = t"
              >{{ t }}</button>
            </div>
          </div>

          <!-- Embed style -->
          <div class="mb-8">
            <p class="hue-label-sm mb-3">Embed style</p>
            <div class="grid gap-2 sm:grid-cols-3">
              <button
                v-for="m in modes"
                :key="m.value"
                class="rounded-sm border p-3 text-left transition-colors"
                :class="mode === m.value ? 'border-[var(--color-accent)] bg-[var(--color-accent-tint)]' : 'border-[var(--silk)] hover:border-[var(--silver)]'"
                @click="mode = m.value"
              >
                <p class="text-[0.8125rem] font-medium">{{ m.name }}</p>
                <p class="mt-0.5 text-[0.6875rem] text-[var(--grey)]">{{ m.hint }}</p>
              </button>
            </div>
          </div>

          <!-- Generated code -->
          <div class="mb-8">
            <div class="mb-3 flex items-center justify-between">
              <p class="hue-label-sm">Copy &amp; paste into your site</p>
              <button class="hue-link" @click="copy">
                {{ copied ? 'Copied' : 'Copy code' }}
                <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
              </button>
            </div>
            <pre class="overflow-x-auto rounded-sm bg-[var(--near-black)] p-5 text-[0.75rem] leading-relaxed text-white/80"><code>{{ snippet }}</code></pre>
            <p class="mt-2 text-[0.6875rem] text-[var(--silver)]">Replace <code>{{ '{USER_ID}' }}</code> with the user's CardDesk handle. The popup loader injects a floating button; inline drops the card straight into the page.</p>
          </div>

          <!-- On your Hue site -->
          <div>
            <p class="hue-label-sm mb-3">On your Hue site (team / profile page)</p>
            <div class="rounded-sm border border-[var(--silk)] bg-[var(--snow)] p-6 md:p-10">
              <div class="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <p class="hue-label mb-3" style="color: var(--color-accent);">The Team</p>
                  <h3 class="hue-display-md mb-3">Camila Hoffman</h3>
                  <p class="hue-body-sm">Creative Director and co-founder. Book time directly — the card and calendar are the same embeddable widget, themed to match Hue.</p>
                </div>
                <div class="flex justify-center md:justify-end">
                  <ClientOnly>
                    <EmbedBookingWidget :accent="accent" :theme="theme" />
                    <template #fallback><div class="h-[560px] w-[360px] animate-pulse rounded-sm bg-[var(--cloud)]" /></template>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Live preview (sticky) ── -->
        <div class="lg:sticky lg:top-24 lg:self-start">
          <p class="hue-label-sm mb-3">Live preview</p>
          <div
            class="flex justify-center rounded-sm p-6 transition-colors"
            :class="theme === 'dark' ? 'bg-[var(--near-black)]' : 'bg-[var(--snow)] border border-[var(--silk)]'"
          >
            <ClientOnly>
              <EmbedBookingWidget :accent="accent" :theme="theme" />
              <template #fallback><div class="h-[560px] w-[360px] animate-pulse rounded-sm bg-[var(--cloud)]" /></template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'EmbedPocPage' })
useSeoMeta({ title: 'Embed POC — CardDesk Booking Widget', robots: 'noindex' })

const accents = [
  { name: 'Hue Gold', value: '#C4973B' },
  { name: 'Copper', value: '#B87333' },
  { name: 'Ink', value: '#1d1d1f' },
  { name: 'Teal', value: '#2F7E78' },
  { name: 'Cobalt', value: '#3457D5' },
]
const modes = [
  { value: 'inline', name: 'Inline', hint: 'Embeds in the page flow' },
  { value: 'popup', name: 'Popup button', hint: 'Floating “Book a Call”' },
  { value: 'link', name: 'Direct link', hint: 'Share a hosted page' },
] as const

const accent = ref('#C4973B')
const theme = ref<'light' | 'dark'>('light')
const mode = ref<'inline' | 'popup' | 'link'>('inline')
const copied = ref(false)

const snippet = computed(() => {
  const a = encodeURIComponent(accent.value)
  const base = 'https://carddesk.app'
  if (mode.value === 'link') {
    return `${base}/u/{USER_ID}?accent=${a}&theme=${theme.value}`
  }
  if (mode.value === 'popup') {
    return `<script
  src="${base}/embed.js"
  data-user="{USER_ID}"
  data-mode="popup"
  data-label="Book a Call"
  data-accent="${accent.value}"
  data-theme="${theme.value}"><\/script>`
  }
  return `<iframe
  src="${base}/embed/{USER_ID}?accent=${a}&theme=${theme.value}"
  width="360" height="640"
  style="border:0;border-radius:4px;max-width:100%"
  loading="lazy" title="Book a session"></iframe>`
})

async function copy() {
  try {
    await navigator.clipboard.writeText(snippet.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch { /* clipboard unavailable */ }
}
</script>

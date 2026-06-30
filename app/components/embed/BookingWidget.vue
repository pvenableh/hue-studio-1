<template>
  <!-- Self-contained, theme-able embed widget: digital business card + booking.
       All colors derive from CSS vars set on the root so it's portable to any
       site. In production this would hydrate from Directus (cd_cards, event_types,
       availability); here it runs on the `profile` / `eventTypes` props. -->
  <div class="bw" :class="`bw--${theme}`" :style="rootStyle">
    <!-- ── Card header (digital business card) ── -->
    <div class="bw__head">
      <div class="bw__avatar">
        <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" />
        <span v-else>{{ initials }}</span>
      </div>
      <div class="bw__id">
        <p class="bw__name">{{ profile.name }}</p>
        <p class="bw__role">{{ profile.role }}<template v-if="profile.company"> · {{ profile.company }}</template></p>
        <p v-if="profile.location" class="bw__loc">{{ profile.location }}</p>
      </div>
    </div>

    <div v-if="profile.links?.length" class="bw__links">
      <span v-for="l in profile.links" :key="l.label" class="bw__chip">{{ l.label }}</span>
    </div>

    <div class="bw__rule" />

    <!-- ── Booking ── -->
    <div v-if="!submitted">
      <p class="bw__kicker">Book a session</p>

      <!-- Event type -->
      <div class="bw__events">
        <button
          v-for="ev in eventTypes"
          :key="ev.id"
          type="button"
          class="bw__event"
          :class="{ 'is-active': ev.id === selectedEvent }"
          @click="selectedEvent = ev.id; selectedSlot = ''"
        >
          <span class="bw__event-label">{{ ev.label }}</span>
          <span class="bw__event-dur">{{ ev.duration }} min</span>
        </button>
      </div>

      <!-- Date strip -->
      <div class="bw__dates">
        <button
          v-for="d in days"
          :key="d.iso"
          type="button"
          class="bw__date"
          :class="{ 'is-active': d.iso === selectedDate }"
          @click="selectedDate = d.iso; selectedSlot = ''"
        >
          <span class="bw__date-dow">{{ d.dow }}</span>
          <span class="bw__date-num">{{ d.day }}</span>
        </button>
      </div>

      <!-- Time slots -->
      <div class="bw__slots">
        <button
          v-for="s in slots"
          :key="s.time"
          type="button"
          class="bw__slot"
          :class="{ 'is-active': s.time === selectedSlot }"
          :disabled="!s.open"
          @click="selectedSlot = s.time"
        >
          {{ s.time }}
        </button>
      </div>

      <!-- Mini form, revealed once a slot is chosen -->
      <div class="bw__form" :data-open="!!selectedSlot">
        <div class="bw__form-inner">
          <input v-model="form.name" class="bw__input" type="text" placeholder="Your name" />
          <input v-model="form.email" class="bw__input" type="email" placeholder="you@email.com" />
        </div>
      </div>

      <button
        type="button"
        class="bw__cta"
        :disabled="!canConfirm"
        @click="confirm"
      >
        {{ ctaLabel }}
      </button>

      <p class="bw__foot">Powered by <strong>CardDesk</strong></p>
    </div>

    <!-- ── Success ── -->
    <div v-else class="bw__success">
      <div class="bw__check">✓</div>
      <p class="bw__success-title">Request sent.</p>
      <p class="bw__success-sub">{{ profile.name.split(' ')[0] }} will confirm your {{ selectedEventLabel }} on {{ prettySelectedDate }} at {{ selectedSlot }} shortly.</p>
      <button type="button" class="bw__link" @click="reset">Book another time</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

interface EventType { id: string; label: string; duration: number }
interface ProfileLink { label: string; url?: string }
interface Profile {
  name: string
  role?: string
  company?: string
  location?: string
  avatar?: string
  links?: ProfileLink[]
}

const props = withDefaults(defineProps<{
  accent?: string
  theme?: 'light' | 'dark'
  radius?: number
  profile?: Profile
  eventTypes?: EventType[]
}>(), {
  accent: '#C4973B',
  theme: 'light',
  radius: 4,
  profile: () => ({
    name: 'Camila Hoffman',
    role: 'Creative Director',
    company: 'Hue',
    location: 'Miami Beach · New York',
    links: [{ label: 'Email' }, { label: 'LinkedIn' }, { label: 'huestudios.com' }],
  }),
  eventTypes: () => [
    { id: 'discovery', label: 'Discovery Call', duration: 45 },
    { id: 'quick', label: 'Quick Chat', duration: 30 },
  ],
})

const rootStyle = computed(() => ({
  '--bw-accent': props.accent,
  '--bw-radius': `${props.radius}px`,
}))

const initials = computed(() =>
  props.profile.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
)

// --- Schedule (client-only to avoid SSR/hydration time drift) ---
const days = ref<{ iso: string; dow: string; day: number }[]>([])
const selectedEvent = ref(props.eventTypes[0]?.id ?? '')
const selectedDate = ref('')
const selectedSlot = ref('')

const ALL_TIMES = ['9:00', '9:30', '10:00', '10:30', '11:00', '1:00', '1:30', '2:00', '2:30', '3:00']

onMounted(() => {
  const out: { iso: string; dow: string; day: number }[] = []
  const d = new Date()
  while (out.length < 10) {
    d.setDate(d.getDate() + 1)
    const dow = d.getDay()
    if (dow === 0 || dow === 6) continue // weekdays only
    out.push({
      iso: d.toISOString().slice(0, 10),
      dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dow],
      day: d.getDate(),
    })
  }
  days.value = out
  selectedDate.value = out[0]?.iso ?? ''
})

// Deterministic "availability" per date so a couple of slots read as booked
const slots = computed(() => {
  const seed = selectedDate.value ? parseInt(selectedDate.value.slice(-2), 10) : 0
  return ALL_TIMES.map((time, i) => ({ time, open: (i + seed) % 4 !== 0 }))
})

const form = reactive({ name: '', email: '' })
const submitted = ref(false)

const selectedEventLabel = computed(() =>
  props.eventTypes.find((e) => e.id === selectedEvent.value)?.label ?? 'meeting'
)
const canConfirm = computed(() => !!selectedSlot.value && !!form.name && /.+@.+\..+/.test(form.email))
const ctaLabel = computed(() => (selectedSlot.value ? 'Request this time' : 'Pick a time'))

const prettySelectedDate = computed(() => {
  const d = days.value.find((x) => x.iso === selectedDate.value)
  return d ? `${d.dow} ${d.day}` : ''
})

function confirm() {
  if (!canConfirm.value) return
  // POC: simulate. Production posts to the shared scheduling API.
  submitted.value = true
}
function reset() {
  submitted.value = false
  selectedSlot.value = ''
  form.name = ''
  form.email = ''
}
</script>

<style scoped>
.bw {
  --bw-bg: #ffffff;
  --bw-text: #1d1d1f;
  --bw-muted: #86868b;
  --bw-line: #ececec;
  --bw-field: #f6f6f6;
  --bw-on-accent: #ffffff;
  width: 360px;
  max-width: 100%;
  box-sizing: border-box;
  background: var(--bw-bg);
  color: var(--bw-text);
  border: 1px solid var(--bw-line);
  border-radius: var(--bw-radius);
  padding: 24px;
  font-family: 'Avenir Next', 'Helvetica Neue', system-ui, sans-serif;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}
.bw *, .bw *::before, .bw *::after { box-sizing: border-box; }
.bw--dark {
  --bw-bg: #161618;
  --bw-text: #f0ede8;
  --bw-muted: #8a8a8f;
  --bw-line: #2c2c2e;
  --bw-field: #1f1f22;
  --bw-on-accent: #1d1d1f;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

/* Header */
.bw__head { display: flex; align-items: center; gap: 14px; }
.bw__avatar {
  width: 52px; height: 52px; flex-shrink: 0;
  border-radius: 50%;
  background: var(--bw-accent);
  color: var(--bw-on-accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.05rem; font-weight: 500; letter-spacing: 0.02em;
  overflow: hidden;
}
.bw__avatar img { width: 100%; height: 100%; object-fit: cover; }
.bw__name { font-size: 1.0625rem; font-weight: 400; font-style: italic; font-family: 'Bauer Bodoni', 'Cormorant Garamond', Georgia, serif; margin: 0; }
.bw__role { font-size: 0.75rem; color: var(--bw-muted); margin: 2px 0 0; }
.bw__loc { font-size: 0.6875rem; color: var(--bw-muted); margin: 1px 0 0; opacity: 0.8; }

.bw__links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.bw__chip {
  font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--bw-muted); border: 1px solid var(--bw-line);
  border-radius: 999px; padding: 4px 10px;
}

.bw__rule { height: 1px; background: var(--bw-line); margin: 20px 0; }

.bw__kicker {
  font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.18em;
  color: var(--bw-muted); margin: 0 0 12px;
}

/* Event types */
.bw__events { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.bw__event {
  text-align: left; background: var(--bw-bg); cursor: pointer;
  border: 1px solid var(--bw-line); border-radius: var(--bw-radius);
  padding: 10px 12px; transition: border-color 0.2s, background 0.2s;
}
.bw__event:hover { border-color: var(--bw-muted); }
.bw__event.is-active { border-color: var(--bw-accent); background: color-mix(in srgb, var(--bw-accent) 8%, transparent); }
.bw__event-label { display: block; font-size: 0.8125rem; font-weight: 500; }
.bw__event-dur { display: block; font-size: 0.6875rem; color: var(--bw-muted); margin-top: 1px; }

/* Date strip */
.bw__dates {
  display: flex; gap: 6px; margin-top: 16px; overflow-x: auto;
  scrollbar-width: none; -ms-overflow-style: none;
  padding-bottom: 2px;
}
.bw__dates::-webkit-scrollbar { display: none; }
.bw__date {
  flex: 0 0 auto; width: 46px; cursor: pointer;
  background: var(--bw-bg); border: 1px solid var(--bw-line);
  border-radius: var(--bw-radius); padding: 8px 0; text-align: center;
  transition: border-color 0.2s, background 0.2s;
}
.bw__date:hover { border-color: var(--bw-muted); }
.bw__date.is-active { border-color: var(--bw-accent); background: var(--bw-accent); color: var(--bw-on-accent); }
.bw__date-dow { display: block; font-size: 0.5625rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.7; }
.bw__date-num { display: block; font-size: 0.9375rem; font-weight: 400; margin-top: 2px; }

/* Slots */
.bw__slots { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-top: 14px; }
.bw__slot {
  cursor: pointer; font-size: 0.75rem; padding: 7px 0; text-align: center;
  background: var(--bw-field); color: var(--bw-text);
  border: 1px solid transparent; border-radius: var(--bw-radius);
  transition: border-color 0.2s, background 0.2s, opacity 0.2s;
}
.bw__slot:hover:not(:disabled) { border-color: var(--bw-accent); }
.bw__slot.is-active { background: var(--bw-accent); color: var(--bw-on-accent); }
.bw__slot:disabled { opacity: 0.3; cursor: not-allowed; text-decoration: line-through; }

/* Mini form (reveal) */
.bw__form { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.35s ease; }
.bw__form[data-open='true'] { grid-template-rows: 1fr; }
.bw__form-inner { overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding-top: 14px; }
.bw__input {
  width: 100%; font-size: 0.8125rem; padding: 9px 10px;
  background: var(--bw-field); color: var(--bw-text);
  border: 1px solid var(--bw-line); border-radius: var(--bw-radius); outline: none;
}
.bw__input:focus { border-color: var(--bw-accent); }
.bw__input::placeholder { color: var(--bw-muted); }

/* CTA */
.bw__cta {
  width: 100%; margin-top: 16px; cursor: pointer;
  background: var(--bw-accent); color: var(--bw-on-accent);
  border: 0; border-radius: var(--bw-radius); padding: 12px;
  font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;
  transition: opacity 0.2s, transform 0.2s;
}
.bw__cta:hover:not(:disabled) { opacity: 0.9; }
.bw__cta:disabled { opacity: 0.4; cursor: not-allowed; }

.bw__foot { text-align: center; font-size: 0.625rem; color: var(--bw-muted); margin: 12px 0 0; }
.bw__foot strong { color: var(--bw-text); font-weight: 600; }

/* Success */
.bw__success { text-align: center; padding: 18px 0 6px; }
.bw__check {
  width: 44px; height: 44px; margin: 0 auto 14px; border-radius: 50%;
  background: color-mix(in srgb, var(--bw-accent) 14%, transparent);
  color: var(--bw-accent); display: flex; align-items: center; justify-content: center;
  font-size: 1.25rem;
}
.bw__success-title { font-size: 1.0625rem; font-style: italic; font-family: 'Bauer Bodoni', 'Cormorant Garamond', Georgia, serif; margin: 0; }
.bw__success-sub { font-size: 0.8125rem; color: var(--bw-muted); margin: 8px auto 0; max-width: 260px; line-height: 1.5; }
.bw__link { background: none; border: 0; cursor: pointer; color: var(--bw-accent); font-size: 0.75rem; margin-top: 16px; text-transform: uppercase; letter-spacing: 0.1em; }
</style>

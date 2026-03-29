<template>
  <!-- Trigger button -->
  <button v-if="!isOpen" @click="isOpen = true; trackMeetingModalOpen()" class="hue-btn" v-bind="$attrs">
    <slot>
      Book a Call
      <Icon name="lucide:arrow-right" class="size-3.5" />
    </slot>
  </button>

  <!-- Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" @click.self="isOpen = false">
        <div class="w-full max-w-md lg:max-w-lg rounded-sm bg-white shadow-xl">

          <!-- Header -->
          <div class="flex items-center justify-between border-b border-[var(--silk)] px-2 md:px-6 py-4">
            <div>
              <p class="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[var(--silver)]">Schedule</p>
              <p class="text-[1.125rem] font-light" style="font-family: var(--font-editorial);">Strategy Session</p>
            </div>
            <button @click="isOpen = false" class="text-[var(--silver)] hover:text-[var(--near-black)]">
              <Icon name="lucide:x" class="size-5" />
            </button>
          </div>

          <!-- Form -->
          <div v-if="!submitted" class="px-2 md:px-6 py-5">
            <div class="space-y-4">
              <div class="grid gap-3 sm:grid-cols-2">
                <div>
                  <label class="hue-label-field">First name</label>
                  <input v-model="form.firstName" type="text" class="hue-input" required placeholder="Jane" />
                </div>
                <div>
                  <label class="hue-label-field">Last name</label>
                  <input v-model="form.lastName" type="text" class="hue-input" placeholder="Smith" />
                </div>
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <div>
                  <label class="hue-label-field">Work email</label>
                  <input v-model="form.email" type="email" class="hue-input" required placeholder="jane@company.com" />
                </div>
                <div>
                  <label class="hue-label-field">Company</label>
                  <input v-model="form.company" type="text" class="hue-input" placeholder="Acme Corp" />
                </div>
              </div>

              <!-- Meeting type -->
              <div>
                <label class="hue-label-field">What type of meeting?</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="mt in meetingTypes"
                    :key="mt.value"
                    type="button"
                    class="rounded-sm border p-3 text-left transition-all"
                    :class="form.meetingType === mt.value
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent-tint)]'
                      : 'border-[var(--silk)] hover:border-[var(--silver)]'"
                    @click="form.meetingType = mt.value; form.duration = mt.duration"
                  >
                    <p class="text-[0.8125rem] font-medium">{{ mt.label }}</p>
                    <p class="text-[0.6875rem] text-[var(--grey)]">{{ mt.duration }} min</p>
                  </button>
                </div>
              </div>

              <!-- Preferred date/time -->
              <div class="grid gap-3 sm:grid-cols-2">
                <div>
                  <label class="hue-label-field">Preferred date</label>
                  <input v-model="form.preferredDate" type="date" class="hue-input" :min="minDate" />
                </div>
                <div>
                  <label class="hue-label-field">Preferred time</label>
                  <select v-model="form.preferredTime" class="hue-input">
                    <option value="">Flexible</option>
                    <option value="morning">Morning (9am–12pm)</option>
                    <option value="afternoon">Afternoon (12pm–3pm)</option>
                    <option value="late-afternoon">Late Afternoon (3pm–5pm)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="hue-label-field">Anything we should know?</label>
                <textarea v-model="form.notes" class="hue-input" rows="2" placeholder="What's on your mind?" />
              </div>
            </div>

            <button
              class="hue-btn mt-5 w-full justify-center"
              :disabled="submitting || !form.email || !form.firstName"
              @click="handleSubmit"
            >
              <span v-if="submitting">Sending…</span>
              <span v-else>Request Meeting</span>
              <Icon v-if="!submitting" name="lucide:arrow-right" class="size-3.5" />
            </button>

            <p class="mt-3 text-center text-[0.6875rem] text-[var(--silver)]">
              We'll confirm your meeting within 1 business day.
            </p>
          </div>

          <!-- Success -->
          <div v-else class="px-2 md:px-6 py-10 text-center">
            <Icon name="lucide:calendar-check" class="mx-auto mb-4 size-10" style="color: var(--color-accent);" />
            <p class="text-[1.125rem] font-light" style="font-family: var(--font-editorial);">Meeting request received.</p>
            <p class="mt-2 text-[0.875rem] text-[var(--grey)]">
              We'll confirm your {{ meetingTypeLabel }} and send a calendar invite within 1 business day.
            </p>
            <button class="hue-link mx-auto mt-6" @click="isOpen = false">Close</button>
          </div>

          <!-- Option B: Direct booking link (hidden until ready) -->
          <!-- <div class="border-t border-[var(--silk)] px-2 md:px-6 py-3 text-center">
            <a :href="earnestBookingUrl" target="_blank" class="text-[0.6875rem] text-[var(--grey)] hover:text-[var(--near-black)]">
              Or book directly from our calendar →
            </a>
          </div> -->
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const { trackMeetingModalOpen, trackFormSubmit } = useAnalytics()

const isOpen = ref(false)
const submitting = ref(false)
const submitted = ref(false)

// Option B — uncomment when calendar sync is ready
// const earnestBookingUrl = 'https://earnest.guru/book/YOUR_USER_ID'

const meetingTypes = [
  { value: 'consultation', label: 'Quick Chat', duration: 30 },
  { value: 'discovery', label: 'Discovery Call', duration: 45 },
  { value: 'project_review', label: 'Project Review', duration: 60 },
  { value: 'presentation', label: 'Presentation', duration: 60 },
]

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  meetingType: 'discovery',
  duration: 45,
  preferredDate: '',
  preferredTime: '',
  notes: '',
})

const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})

const meetingTypeLabel = computed(() =>
  meetingTypes.find((mt) => mt.value === form.meetingType)?.label ?? 'meeting'
)

const { submitMeeting } = useDirectus()

async function handleSubmit() {
  submitting.value = true
  await submitMeeting({
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.email,
    company: form.company,
    meeting_type: form.meetingType,
    preferred_date: form.preferredDate || undefined,
    preferred_time: form.preferredTime || undefined,
    duration: form.duration,
    explanation: form.notes,
  })
  submitting.value = false
  submitted.value = true
  trackFormSubmit('meeting', { meeting_type: form.meetingType, duration: form.duration })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>

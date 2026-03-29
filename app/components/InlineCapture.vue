<template>
  <section class="px-2 md:px-6 py-16" :class="dark ? 'bg-[var(--near-black)]' : 'border-y border-[var(--silk)]'">
    <div class="hue-container">
      <div class="mx-auto max-w-2xl text-center">
        <p class="mb-2 text-[0.625rem] font-medium uppercase tracking-[0.25em]" :class="dark ? 'text-white/25' : 'text-[var(--silver)]'">
          {{ label }}
        </p>
        <h3 class="mb-6 text-[1.5rem] font-light" :class="dark ? 'text-white' : ''" style="font-family: var(--font-editorial);">
          {{ headline }}
        </h3>

        <form v-if="!submitted" @submit.prevent="handleSubmit" class="mx-auto flex max-w-lg gap-2">
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="First name"
            class="w-28 shrink-0 rounded-none border-0 border-b bg-transparent px-1 py-2 text-[0.8125rem] outline-none transition-colors"
            :class="dark
              ? 'border-white/20 text-white placeholder-white/25 focus:border-white/40'
              : 'border-[var(--silver)] text-[var(--near-black)] placeholder-[var(--silver)] focus:border-[var(--near-black)]'"
          />
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="your@email.com"
            class="min-w-0 flex-1 rounded-none border-0 border-b bg-transparent px-1 py-2 text-[0.8125rem] outline-none transition-colors"
            :class="dark
              ? 'border-white/20 text-white placeholder-white/25 focus:border-white/40'
              : 'border-[var(--silver)] text-[var(--near-black)] placeholder-[var(--silver)] focus:border-[var(--near-black)]'"
          />
          <button
            type="submit"
            :disabled="submitting"
            class="hue-btn shrink-0"
            :class="dark ? '!bg-[var(--color-accent)] hover:!bg-[var(--color-accent-hover)]' : ''"
          >
            <span v-if="submitting">…</span>
            <template v-else>
              {{ buttonText }}
              <Icon name="lucide:arrow-right" class="size-3" />
            </template>
          </button>
        </form>

        <div v-else class="flex items-center justify-center gap-2 py-2">
          <Icon name="lucide:check" class="size-4" :class="dark ? 'text-[var(--color-accent-on-dark)]' : 'text-[var(--color-accent)]'" />
          <p class="text-[0.875rem]" :class="dark ? 'text-white/60' : 'text-[var(--grey)]'">
            {{ successMessage }}
          </p>
        </div>

        <p v-if="!submitted" class="mt-3 text-[0.6875rem]" :class="dark ? 'text-white/15' : 'text-[var(--silver)]'">
          {{ note }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  headline?: string
  buttonText?: string
  successMessage?: string
  note?: string
  dark?: boolean
  /** 'contact' creates a lead, 'subscribe' adds to newsletter */
  type?: 'contact' | 'subscribe'
  /** Context passed as project/explanation on the lead */
  context?: string
}>(), {
  label: 'Get Started',
  headline: 'Interested in similar results for your brand?',
  buttonText: 'Send',
  successMessage: "We'll be in touch within 1 business day.",
  note: 'No spam. No obligation. Just a conversation.',
  dark: false,
  type: 'contact',
  context: '',
})

const { submitContact, submitSubscribe } = useDirectus()
const { trackFormSubmit } = useAnalytics()

const form = reactive({ name: '', email: '' })
const submitting = ref(false)
const submitted = ref(false)

async function handleSubmit() {
  submitting.value = true
  if (props.type === 'subscribe') {
    await submitSubscribe({ email: form.email, first_name: form.name })
  } else {
    await submitContact({
      first_name: form.name,
      email: form.email,
      project: props.context || 'Inline Inquiry',
      explanation: props.context ? `Inline capture from: ${props.context}` : 'Inline capture form submission',
    })
  }
  submitting.value = false
  submitted.value = true
  trackFormSubmit(props.type === 'subscribe' ? 'inline_subscribe' : 'inline_capture', { context: props.context })
}
</script>

<template>
  <section id="services" class="intel-section" style="background: var(--color-bg-alt);">
    <div class="intel-container px-6 md:px-10 lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <div class="intel-services-heading mb-14 lg:mb-0">
        <p class="intel-eyebrow mb-4 reveal">What We Build</p>
        <h2 class="intel-h2 reveal reveal-delay-1">
          Five layers of AI capability, deployed in sequence.
        </h2>
      </div>

      <div class="flex flex-col gap-2">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="group reveal cursor-pointer"
          :style="{ transitionDelay: `${i * 80}ms` }"
          @click="toggleStep(i)"
        >
          <div
            class="relative flex items-start gap-6 rounded-sm p-6 transition-colors duration-300 md:items-center md:gap-10"
            :class="activeStep === i ? 'bg-[var(--color-bg-alt)]' : 'hover:bg-[var(--color-bg-alt)]/50'"
            style="border-left: 2px solid var(--color-border);"
            :style="activeStep === i ? { borderLeftColor: 'var(--color-accent)' } : {}"
          >
            <span
              class="intel-step-number shrink-0 transition-colors duration-300"
              :style="activeStep === i ? { color: 'var(--color-accent)' } : {}"
            >
              {{ step.number }}
            </span>

            <div class="flex-1">
              <div class="flex items-center gap-3">
                <h3 class="intel-h3">{{ step.name }}</h3>
                <span class="intel-body-sm hidden md:inline">{{ step.short }}</span>
              </div>

              <!-- Expandable detail -->
              <Transition name="step-expand">
                <div v-if="activeStep === i" class="mt-4">
                  <p class="intel-body max-w-2xl" style="color: var(--color-text); opacity: 0.8;">
                    {{ step.detail }}
                  </p>
                </div>
              </Transition>
            </div>

            <Icon
              :name="activeStep === i ? 'lucide:minus' : 'lucide:plus'"
              class="size-4 shrink-0 transition-colors"
              :style="{ color: activeStep === i ? 'var(--color-accent)' : 'var(--color-border-light)' }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeStep = ref(0)

function toggleStep(i: number) {
  activeStep.value = activeStep.value === i ? -1 : i
}

const steps = [
  {
    number: '01',
    name: 'AI Insight Assistant',
    short: '"How many members renewed this quarter?" — answered in 2 seconds',
    detail: 'Your team types a question into a chat window — in plain English — and gets an accurate answer pulled directly from your own database. Member counts, project statuses, donor totals, open invoices. No spreadsheets to open. No one to ask. Just the answer.',
  },
  {
    number: '02',
    name: 'Automation Workflows',
    short: 'A membership lapses → renewal email sends on day 1, automatically',
    detail: 'When something changes in your system, the next step happens without anyone lifting a finger. A new lead comes in at midnight — by morning, they\'ve received a welcome email, your sales team got an alert, and the CRM is updated. A project status changes — the client gets a progress update. A renewal is 30 days out — the reminder sequence starts.',
  },
  {
    number: '03',
    name: 'Smart Content Engine',
    short: 'Click "Draft Newsletter" → a full issue from this month\'s data, ready to edit',
    detail: 'AI pulls from your latest projects, events, member news, and milestones to draft newsletters, donor impact reports, grant narratives, and event recaps. It writes in your voice, with your real data — not generic filler. Your team reviews and publishes. What used to take a week takes an afternoon.',
  },
  {
    number: '04',
    name: 'Custom AI Dashboard',
    short: 'Open one screen → today\'s KPIs, overdue tasks, and an AI-written summary',
    detail: 'Your team opens a single, branded screen and sees everything that matters: live numbers, items that need attention, and a plain-English summary of what changed since yesterday. Role-specific — your ED sees the big picture, your program manager sees their caseload, your development director sees donor activity.',
  },
  {
    number: '05',
    name: 'AI Operations Retainer',
    short: 'New automations added monthly as your team discovers more to automate',
    detail: 'Once your team starts using AI daily, they\'ll find ten more things it should handle. Our monthly retainer covers new automations, refinements to existing ones, staff training, and strategic calls to keep your system evolving. The value compounds — month over month, your team spends less time on manual work and more time on the work that matters.',
  },
]
</script>

<style scoped>
.step-expand-enter-active {
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  overflow: hidden;
}
.step-expand-leave-active {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
  overflow: hidden;
}
.step-expand-enter-from,
.step-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.step-expand-enter-to,
.step-expand-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>

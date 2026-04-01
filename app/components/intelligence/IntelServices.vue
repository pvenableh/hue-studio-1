<template>
  <section id="services" class="intel-section" style="background: var(--color-bg-alt);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">What We Build</p>
      <h2 class="intel-h2 mb-14 reveal reveal-delay-1">
        Five layers of AI capability, deployed in sequence.
      </h2>

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
    short: 'Ask your data anything',
    detail: 'Connect Claude to your Directus collections via MCP. Your team asks questions in plain English and gets instant, accurate answers — member stats, project status, donor history, anything in your database. No SQL. No spreadsheets.',
  },
  {
    number: '02',
    name: 'Automation Workflows',
    short: 'Your data triggers action',
    detail: 'When something changes in your system — a project status, a form submission, a membership lapse — AI takes the next step automatically. Emails written and sent. PDFs generated. Alerts dispatched. Staff freed.',
  },
  {
    number: '03',
    name: 'Smart Content Engine',
    short: 'Draft in seconds, publish in minutes',
    detail: 'AI generates newsletters, donor impact reports, proposal sections, and event recaps by pulling directly from your structured collections. Your voice, your data, your time back.',
  },
  {
    number: '04',
    name: 'Custom AI Dashboard',
    short: 'A command center for your team',
    detail: 'A branded, role-specific interface that surfaces your most important data with AI summaries, one-click prompt actions, and live KPIs. Built on your stack, designed for your people.',
  },
  {
    number: '05',
    name: 'AI Operations Retainer',
    short: 'Your intelligence, always evolving',
    detail: 'Monthly engagement: new automations, prompt refinement, new integrations, staff training, and strategic roadmap calls. AI is not a one-time project — it compounds.',
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

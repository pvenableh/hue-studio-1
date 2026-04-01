<template>
  <section class="intel-section" style="background: var(--color-bg);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">Built for Your Sector</p>
      <h2 class="intel-h2 mb-14 max-w-3xl reveal reveal-delay-1">
        The same intelligence, applied to your specific reality.
      </h2>

      <div class="grid gap-5 md:grid-cols-2">
        <div
          v-for="(industry, i) in industries"
          :key="industry.title"
          class="intel-card group reveal"
          :style="{ transitionDelay: `${i * 80}ms` }"
          style="border-top: 2px solid transparent;"
          @mouseenter="($event.currentTarget as HTMLElement).style.borderTopColor = 'var(--color-accent)'"
          @mouseleave="($event.currentTarget as HTMLElement).style.borderTopColor = 'transparent'"
        >
          <Icon :name="industry.icon" class="mb-5 size-6" style="color: var(--color-accent);" />
          <h3 class="intel-h3 mb-3">{{ industry.title }}</h3>
          <p class="intel-body mb-6">{{ industry.body }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="useCase in industry.useCases"
              :key="useCase"
              class="inline-block rounded-sm px-2.5 py-1 text-[0.6875rem]"
              style="background: var(--color-bg-alt); color: var(--color-text-muted); border: 1px solid var(--color-border);"
            >
              {{ useCase }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const industries = [
  {
    icon: 'lucide:building-2',
    title: 'Architecture & Construction',
    body: 'Stop hunting through email threads for RFI status. Know which projects are behind schedule and why. Draft project case studies and proposals in minutes. AI that speaks the language of deadlines, submittals, and client relationships.',
    useCases: ['RFI/submittal tracking', 'Proposal drafting', 'Project status summaries', 'Client communication automation'],
  },
  {
    icon: 'lucide:handshake',
    title: 'Chambers of Commerce',
    body: 'Automate member onboarding, renewal reminders, and event follow-ups. Generate member spotlight emails and event recaps from your database. Give your board instant access to membership intelligence.',
    useCases: ['Member lookup & reporting', 'Automated renewal sequences', 'Event recap generation', 'Board report automation'],
  },
  {
    icon: 'lucide:heart',
    title: 'NGOs & Nonprofits',
    body: 'Transform program data into compelling grant narratives and donor impact reports. Automate stewardship touchpoints. Give leadership the dashboards they need to make decisions — and funders the evidence they need to say yes.',
    useCases: ['Grant narrative drafting', 'Donor impact reports', 'Program data dashboards', 'Automated stewardship sequences'],
  },
  {
    icon: 'lucide:store',
    title: 'Small Businesses',
    body: 'Capture every lead. Follow up with every customer. Answer every question — even at 2am. AI automation that handles the operational tasks so your team focuses on what only humans can do.',
    useCases: ['AI website chat & lead capture', 'Follow-up automation', 'Inventory & order intelligence', 'Review and reputation monitoring'],
  },
]
</script>

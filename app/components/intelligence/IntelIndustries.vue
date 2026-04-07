<template>
  <section class="intel-section" style="background: var(--color-bg);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">Built for Your Sector</p>
      <h2 class="intel-h2 mb-14 max-w-3xl reveal reveal-delay-1">
        Here's what it looks like in your world.
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
    body: 'Today, your PM digs through email threads to find an RFI status. After: they type "What\'s the status of the Morrison submittal?" and get the answer in seconds. Proposals that took a week to assemble now draft themselves from your project data. Client updates go out automatically when a milestone is hit.',
    useCases: ['Instant project status lookup', 'Auto-drafted proposals from project data', 'Client updates sent on milestone changes', 'Weekly PM summary reports, auto-generated'],
  },
  {
    icon: 'lucide:handshake',
    title: 'Chambers of Commerce',
    body: 'Today, someone manually checks a spreadsheet to see who hasn\'t renewed. After: on the day a membership lapses, a personalized renewal email sends automatically. Your board report writes itself every month from live membership data. Event recaps go out the next morning with photos, attendance, and key takeaways — drafted by AI, reviewed by you.',
    useCases: ['"Who joined this quarter?" — answered instantly', 'Renewal emails sent the day a membership lapses', 'Monthly board reports generated automatically', 'Event recaps drafted overnight, ready by morning'],
  },
  {
    icon: 'lucide:heart',
    title: 'NGOs & Nonprofits',
    body: 'Today, your development director copies program stats into grant templates by hand. After: they click "Draft Q3 Grant Narrative" and get a first draft in 90 seconds — pre-filled with real outcomes, beneficiary counts, and financial data. Donor thank-you emails trigger automatically after every gift. Your ED opens a dashboard and sees program health at a glance.',
    useCases: ['Grant narratives drafted from real program data', 'Donor thank-you emails sent automatically after gifts', 'Impact reports generated with one click', 'Leadership dashboard with live program KPIs'],
  },
  {
    icon: 'lucide:store',
    title: 'Small Businesses',
    body: 'Today, leads fill out your form at 11pm and wait until Monday for a response. After: by the time they close the browser, they\'ve received a personalized follow-up, your team got an alert, and the lead is logged in your system. Customer questions get answered 24/7. Follow-ups never fall through the cracks.',
    useCases: ['Leads get a response in minutes, not days', '24/7 AI chat trained on your services', 'Automatic follow-up sequences for every inquiry', 'Weekly business summary delivered to your inbox'],
  },
]
</script>

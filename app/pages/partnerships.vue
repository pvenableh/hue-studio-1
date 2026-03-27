<template>
  <div>
    <section class="hue-section px-6 pb-16 pt-24 md:pt-32">
      <div class="hue-container">
        <p class="hue-label mb-4">Partnerships</p>
        <h1 class="hue-display-xl mb-6 max-w-2xl">
          Let's build something
          <span style="font-family:var(--font-editorial);font-style:italic;">together.</span>
        </h1>
        <p class="hue-body-lg max-w-xl mb-12">
          We believe in the power of collaboration. Whether you're an agency, a consultant, a developer, or a business looking for a creative partner — we'd love to explore how we can work together.
        </p>
      </div>
    </section>

    <section class="hue-section-alt px-6 py-20">
      <div class="hue-container grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] md:grid-cols-3">
        <div v-for="type in partnerTypes" :key="type.title" class="bg-white p-10">
          <Icon :name="type.icon" class="mb-6 size-6 text-[var(--grey)]" />
          <h3 class="mb-3 text-[1.05rem] font-medium">{{ type.title }}</h3>
          <p class="hue-body-sm mb-6">{{ type.description }}</p>
          <ul class="space-y-2">
            <li v-for="item in type.items" :key="item" class="flex items-start gap-2.5 text-[0.8125rem] text-[var(--color-text-muted)]">
              <span class="mt-2 block h-px w-3 shrink-0 bg-[var(--silver)]" />{{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="hue-section px-6 py-20">
      <div class="hue-container grid gap-16 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5">What we bring</p>
          <h2 class="hue-display-lg mb-6">20 years of craft,<br>available to your clients.</h2>
          <p class="hue-body-lg mb-8 max-w-lg">
            Partners get access to the same senior creative team that has delivered for A|X Armani Exchange, government agencies, and dozens of growth-stage companies. Co-branded collaboration built on trust.
          </p>
          <NuxtLink to="/contact" class="hue-btn">
            Start a Conversation <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <div v-for="item in offerings" :key="item.title" class="rounded-sm border border-[var(--silk)] p-7">
            <h3 class="mb-2 text-[1rem] font-medium">{{ item.title }}</h3>
            <p class="hue-body-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="hue-section-dark px-6 py-24 text-center">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-5 text-white">Ready to partner?</h2>
        <p class="mb-8 text-[0.9375rem] text-white/40">Let's talk about what a partnership could look like for your business.</p>
        <NuxtLink to="/contact" class="hue-btn-ghost">
          Get in Touch <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Partnerships | Hue Creative Agency',
  description: 'Partner with Hue Creative Agency. Co-branded creative services, agency partnerships, developer collaborations, and referral programs.',
})

defineOgImage({ component: 'HueOg', props: { title: 'Strategic Partnerships', description: 'Scalable creative infrastructure for agencies and consultancies.', label: 'Partnerships' } })

const partnerTypes = [
  {
    icon: 'lucide:building-2',
    title: 'Agency Partners',
    description: 'Extend your creative capabilities without growing your headcount. We work seamlessly as a co-branded creative partner.',
    items: ['Co-branded creative collaboration', 'Overflow capacity for peak periods', 'Joint project teams with senior creatives', 'NDA-protected engagements'],
  },
  {
    icon: 'lucide:code-2',
    title: 'Developer Partners',
    description: 'Your clients need great design. Our clients need great development. Let\'s refer each other and deliver more together.',
    items: ['Design-only engagements you develop', 'Referral fee arrangements', 'Joint project teams', 'Nuxt / Directus specialists welcome'],
  },
  {
    icon: 'lucide:handshake',
    title: 'Referral Partners',
    description: 'Know a company that needs branding or creative work? We have a structured referral program with real compensation.',
    items: ['Formal referral agreements', 'Transparent fee structure', 'No client poaching guarantee', 'Ongoing relationship support'],
  },
]

const offerings = [
  { title: 'Co-branded creative services', description: 'Brand identity, web design, print, and corporate design — collaborative engagements built on shared credit and trust.' },
  { title: 'Overflow & surge capacity', description: 'Senior creative support when your internal team is at capacity — seamlessly integrated.' },
  { title: 'Joint go-to-market', description: 'Co-branded service offerings for markets where our capabilities are complementary.' },
]
</script>

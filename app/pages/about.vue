<template>
  <div>
    <!-- Hero -->
    <section class="hue-section-dark relative overflow-hidden px-2 md:px-6 py-28 md:py-36">
      <SectionWatermark word="About" :dark="true" top="2rem" />
      <div class="hue-container relative grid gap-16 lg:grid-cols-2">
        <div>
          <p class="hue-label mb-5 text-white/40">About Hue</p>
          <h1 class="hue-display-xl text-white">
            Boutique experience<br>on
            <span style="font-family:var(--font-editorial);font-style:italic;">purpose.</span>
          </h1>
        </div>
        <div class="flex items-end">
          <p class="text-[1.0625rem] leading-relaxed text-white/45">
            Hue is a woman-owned, full-service brand strategy and digital experience firm headquartered in New York State, with offices in Miami Beach. We are boutique on purpose — every discipline is in-house, and every engagement is led directly by our senior principals. No junior handoffs. No offshore subcontractors.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Hue -->
    <section class="hue-section px-2 md:px-6 py-24">
      <div class="hue-container grid gap-16 lg:grid-cols-[1fr_400px]">
        <div>
          <p class="hue-label mb-8">Why Hue</p>
          <p class="hue-editorial-lg mb-8 max-w-xl">
            "Visual excellence is achieved through a process that is executed with a defined purpose."
          </p>
          <div class="max-w-2xl space-y-5">
            <p class="hue-body-lg">
              Defined as form and complexion, hue is subtle yet essential. This idea articulates the agency's core belief — the result, although subtle, is fundamental to its strength.
            </p>
            <p class="hue-body-lg">
              As a full-service creative marketing agency, hue offers brand strategy, campaign management, media planning, and creative development and production for all things digital — print, web, corporate, and video.
            </p>
            <p class="hue-body-lg">
              We create big ideas guided by business goals and successful marketing strategies. These ideas are implemented with innovation and visual excellence through our creative process. It all stems from one singular goal: define one voice, then make it undeniable.
            </p>
          </div>
        </div>
        <div class="space-y-4">
          <div class="hue-grid-bordered grid-cols-2">
            <div v-for="stat in stats" :key="stat.label" class="p-8 text-center">
              <p class="hue-editorial-xl">{{ stat.value }}</p>
              <p class="hue-label-sm mt-2">{{ stat.label }}</p>
            </div>
          </div>
          <div class="rounded-sm border border-[var(--silk)] p-7">
            <p class="hue-label-sm mb-4 text-[var(--silver)]">Our studios</p>
            <p class="mb-1 text-[0.9375rem] font-medium">Miami Beach, FL</p>
            <p class="hue-body-sm mb-5">605 Lincoln Road, Suite 200 · Miami Beach, FL 33139</p>
            <p class="mb-1 text-[0.9375rem] font-medium">New York, NY</p>
            <p class="hue-body-sm">New York Metropolitan Area</p>
          </div>
          <div class="rounded-sm border border-[var(--silk)] p-7">
            <p class="hue-label-sm mb-3 text-[var(--silver)]">Community</p>
            <p class="hue-body-sm">Proud members of the Miami Beach Chamber of Commerce</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Process — the real 4-stage framework -->
    <section class="hue-section-alt px-2 md:px-6 py-24">
      <div class="hue-container">
        <div class="mb-14">
          <p class="hue-label mb-3">Our Process</p>
          <h2 class="hue-display-lg max-w-xl">A holistic approach that shapes one singular voice.</h2>
        </div>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="step in processSteps" :key="step.number" class="bg-white p-9">
            <span class="hue-label-sm text-[var(--silver)]">{{ step.number }}</span>
            <h3 class="mt-4 mb-1.5 text-[1.05rem] font-medium">{{ step.title }}</h3>
            <p class="hue-label-sm mb-4 text-[var(--silver)]">{{ step.subtitle }}</p>
            <p class="hue-body-sm mb-5">{{ step.description }}</p>
            <ul class="space-y-1.5">
              <li
                v-for="item in step.items"
                :key="item"
                class="flex items-start gap-2 text-[0.75rem] text-[var(--color-text-muted)]"
              >
                <span class="mt-1.5 block h-px w-3 shrink-0 bg-[var(--silver)]" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Team — Camila & Peter -->
    <section class="hue-section relative overflow-hidden px-2 md:px-6 py-24">
      <SectionWatermark word="Team" top="1rem" />
      <div class="hue-container relative">
        <p class="hue-label mb-14">The Team</p>
        <div class="grid gap-16 lg:grid-cols-2">

          <!-- Camila -->
          <div>
            <div class="mb-8 overflow-hidden rounded-sm bg-[var(--cloud)]" style="aspect-ratio: 4/5; max-height: 480px;">
              <img
                src="https://admin.huestudios.company/assets/3b1d0737-f242-43f2-92cb-5bfdd0c907d8?width=552&height=875&format=webp"
                alt="Camila Hoffman — Creative Director / CEO at Hue"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p class="hue-label mb-1">Creative Director &amp; Brand Strategist</p>
            <NuxtLink to="/team/camila-hoffman" class="group">
              <h2 class="mb-4 text-[1.75rem] font-light transition-colors group-hover:text-[var(--accent)]">Camila Hoffman</h2>
            </NuxtLink>
            <div class="space-y-4 max-w-lg">
              <p class="hue-body">
                Before founding Hue, Camila served as Art Director at A|X Armani Exchange headquarters in New York City, where she participated in the worldwide repositioning of the brand — including the redesign of the corporate logo. She created the design concepts for every seasonal campaign and managed their deployment across every medium: print, web, in-store, and global events. She held that position from 2000 until 2008, when she founded Hue.
              </p>
              <p class="hue-body">
                That foundation in high-stakes, multi-market brand repositioning is the same strategic discipline she brings to every Hue engagement. As Creative Director, Camila has worked with organizations at both global and local scale — developing and repositioning brands, creating distinct voices that speak directly to target audiences, and overseeing every dimension of creative output from strategy through production.
              </p>
              <p class="hue-body">
                Camila holds a BFA in Communications Design from Parsons School of Design, New York City. In her words, good design is about <em>"creating something that has purpose, not just a product without meaning."</em> Hue is a woman-owned business, and Camila leads every client engagement as its principal and creative director.
              </p>
            </div>
          </div>

          <!-- Peter -->
          <div>
            <div class="mb-8 overflow-hidden rounded-sm bg-[var(--cloud)]" style="aspect-ratio: 4/5; max-height: 480px;">
              <img
                src="https://admin.huestudios.company/assets/b7d8b15b-78d1-4c98-8e75-dfa8e2554381?width=552&height=875&format=webp"
                alt="Peter Hoffman — Web Director & Development Lead at Hue"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p class="hue-label mb-1">Web Director &amp; Development Lead</p>
            <NuxtLink to="/team/peter-hoffman" class="group">
              <h2 class="mb-4 text-[1.75rem] font-light transition-colors group-hover:text-[var(--accent)]">Peter Hoffman</h2>
            </NuxtLink>
            <div class="space-y-4 max-w-lg">
              <p class="hue-body">
                Peter joined Hue in 2006 and has since led every digital experience the firm has produced — from complex CMS builds and interactive data platforms to native apps, SaaS programs, and full digital campaign infrastructure. To call him a web developer would be to undersell what he actually does. Peter is a builder of digital ecosystems — someone who thinks in systems, works across the full modern stack, and consistently delivers platforms that function as genuine operational tools rather than polished marketing surfaces.
              </p>
              <p class="hue-body">
                What sets Peter apart is his active integration of emerging technologies into real client work. He is not watching AI from the sidelines — he is building with it, designing platforms that incorporate intelligent connection mapping, AI-assisted content discovery, and automated data workflows that turn static information hubs into dynamic, responsive environments. His technical range spans component-based frontend frameworks, headless CMS architecture, API and data pipeline design, progressive web apps, and SaaS platform development — all kept current through 10 to 15 hours of structured learning every month.
              </p>
              <p class="hue-body">
                Peter holds a BA from Hobart College in Geneva, New York. His background in literature and design gives him the ability to see the relationship between content, architecture, and human experience — and build accordingly.
              </p>
              <!-- Tech capabilities -->
              <div class="mt-6 rounded-lg border border-[var(--silk)] p-5">
                <p class="hue-label-sm mb-4 text-[var(--silver)]">Technical Capabilities</p>
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="cap in techCaps" :key="cap.label">
                    <p class="text-[0.6875rem] font-medium text-[var(--dark-grey)]">{{ cap.label }}</p>
                    <p class="text-[0.75rem] text-[var(--grey)]">{{ cap.items }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="hue-section-alt px-2 md:px-6 py-24">
      <div class="hue-container grid gap-16 lg:grid-cols-[220px_1fr]">
        <div>
          <p class="hue-label">Our Story</p>
        </div>
        <div class="max-w-2xl space-y-5">
          <p class="hue-body-lg">
            Hue was established in 2005 when Camila and Peter decided to design their own life, their own way. They relocated to Upstate New York, and using the holistic approach Camila developed at a global fashion brand, built a boutique creative agency that recreates its thinking for each new project.
          </p>
          <p class="hue-body-lg">
            Over two decades, hue has worked with an array of clients and industries — rebranding large regional organizations, creating beautiful brands from global to local: fashion, government agencies, architecture and design, community development, events, arts and culture, real estate, tech, nonprofit, and more.
          </p>
          <p class="hue-body-lg">
            In November 2019, Camila and Peter moved to Miami Beach — to the heart of South Beach — expanding their market and realizing a life they had imagined since first falling in love with Miami in 2012. Today, Camila, Peter, and Winston (their dog) work daily from a beautiful office at 605 Lincoln Road, with gratitude, joy, and full enthusiasm.
          </p>
          <p class="hue-body-lg">
            Hue is proud to support local businesses, is an active member of the Miami Beach Chamber of Commerce, and is excited to continue crafting what is next for the region.
          </p>
        </div>
      </div>
    </section>

    <!-- Principles -->
    <section class="hue-section px-2 md:px-6 py-24">
      <div class="hue-container">
        <p class="hue-label mb-12">Our Principles</p>
        <div class="grid gap-px overflow-hidden rounded-sm border border-[var(--silk)] bg-[var(--silk)] sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="p in principles" :key="p.title" class="bg-white p-9">
            <span class="hue-label-sm text-[var(--silver)]">{{ p.num }}</span>
            <h3 class="mt-4 mb-3 text-[1rem] font-medium">{{ p.title }}</h3>
            <p class="hue-body-sm">{{ p.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Hue -->
    <WhyHue headline="Three things that set us apart from every other agency." />

    <!-- Quote -->
    <section class="hue-section px-2 md:px-6 py-20 text-center">
      <div class="hue-container-sm">
        <p class="hue-pullquote reveal">"Know thyself."</p>
        <p class="mt-4 hue-body-sm">— Plato</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="hue-section-dark px-2 md:px-6 py-24 text-center">
      <div class="mx-auto max-w-md">
        <h2 class="hue-display-lg mb-5 text-white">Ready to work together?</h2>
        <p class="mb-8 text-[0.9375rem] text-white/40">Start with a free brand audit or book a discovery call.</p>
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <NuxtLink to="/brand-audit" class="hue-btn-ghost">
            Free Brand Audit <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
          <NuxtLink to="/contact" class="hue-link">
            Book a Call <Icon name="lucide:arrow-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { processSteps } from '~/data/services'

useSeoMeta({
  title: 'About Hue | Creative Marketing Studio | Miami Beach & New York',
  description: 'Full-service creative marketing studio founded in 2005 by Camila Hoffman (former A|X Armani Exchange Art Director) and Peter Hoffman. Miami Beach & New York.',
})

defineOgImage({ component: 'HueOg', props: { title: 'About Hue', description: 'Woman-owned, full-service. Every engagement led by senior principals.', label: 'About' } })

useSchemaOrg([
  {
    '@type': 'Person',
    name: 'Camila Hoffman',
    jobTitle: 'Creative Director & Brand Strategist',
    worksFor: { '@type': 'Organization', name: 'Hue Creative Agency' },
  },
  {
    '@type': 'Person',
    name: 'Peter Hoffman',
    jobTitle: 'Web Director & Development Lead',
    worksFor: { '@type': 'Organization', name: 'Hue Creative Agency' },
  },
])

const techCaps = [
  { label: 'Frontend', items: 'Nuxt, Vue, React, GSAP' },
  { label: 'Backend / CMS', items: 'Directus, Node.js, API design' },
  { label: 'AI & Data', items: 'LLM integration, MCP, data pipelines' },
  { label: 'Platform', items: 'SaaS, PWA, multi-tenant architecture' },
  { label: 'Commerce', items: 'Stripe, subscription infrastructure' },
  { label: 'DevOps', items: 'Vercel, CDN, CI/CD, WebSockets' },
]

const stats = [
  { value: '20+', label: 'Years in Business' },
  { value: '2005', label: 'Year Founded' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '24', label: 'Years Experience' },
]

const principles = [
  {
    num: '01',
    title: 'Strategy before design.',
    body: 'We never open a design file before we understand your business. Every decision flows from a defined purpose.',
  },
  {
    num: '02',
    title: 'Senior creatives only.',
    body: 'You work directly with Camila and Peter. No handoffs, no junior teams. Boutique means accountability at every level.',
  },
  {
    num: '03',
    title: 'Holistic by nature.',
    body: 'Every project receives the same all-encompassing process — analysis, strategy, identity, execution. Nothing is overlooked.',
  },
  {
    num: '04',
    title: 'Results are the standard.',
    body: 'Beautiful work that does not perform is not work we are proud of. We measure success the way you do.',
  },
]

useScrollReveal()
</script>

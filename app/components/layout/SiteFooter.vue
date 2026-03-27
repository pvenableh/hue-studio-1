<template>
  <footer class="bg-[var(--near-black)]">
    <!-- CTA strip — hidden on pages that have their own CTA section -->
    <div v-if="showCta" class="border-b border-white/10 px-6 py-16 text-center">
      <div class="mx-auto max-w-md">
        <p class="hue-label mb-4 text-white/40">Start a Project</p>
        <h2 class="hue-display-lg mb-6 text-white">Let's create what<br>is possible.</h2>
        <p class="mb-8 text-[0.9375rem] leading-relaxed text-white/35">
          Ready to invest in a brand that performs? Let's talk about your business, your market, and what winning looks like.
        </p>
        <NuxtLink to="/contact" class="hue-btn-ghost">
          Schedule a Discovery Call
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </div>

    <!-- Newsletter strip -->
    <div class="border-b border-white/10 px-6 py-12">
      <div class="hue-container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <p class="hue-label mb-2 text-white/50">Stay in the loop</p>
          <p class="text-[0.9375rem] text-white/30">Brand insights, case studies, and studio updates. No spam.</p>
        </div>
        <form v-if="!subscribed" @submit.prevent="handleSubscribe" class="flex w-full max-w-md gap-2">
          <input
            v-model="subscribeEmail"
            type="email"
            required
            placeholder="your@email.com"
            class="flex-1 rounded-sm border border-white/10 bg-white/5 px-4 py-2.5 text-[0.875rem] text-white placeholder-white/25 outline-none transition focus:border-white/25"
          />
          <button type="submit" class="hue-btn shrink-0 text-[0.6875rem]" :disabled="subscribing">
            <span v-if="subscribing">…</span>
            <span v-else>Subscribe</span>
          </button>
        </form>
        <p v-else class="text-[0.875rem] text-white/50">
          <Icon name="lucide:check" class="mr-1.5 inline size-3.5" />You're in. Welcome.
        </p>
      </div>
    </div>

    <!-- Footer grid -->
    <div class="hue-container px-6 py-16 ">
      <div class="grid gap-12 md:grid-cols-4 my-20">
        <div class="md:col-span-1">
          <LayoutLogo fill="grey" size="18px" class="shrink-0 w-12"/>
          <p class="mt-6 text-[0.8125rem] leading-relaxed text-white/30">
            Strategic brand positioning and creative execution for growth-stage companies, government agencies, and mission-driven organizations.
          </p>
          <div class="mt-6 flex gap-3">
            <a href="mailto:contact@huestudios.com" class="footer-link text-[0.75rem]">contact@huestudios.com</a>
          </div>
          <p class="mt-2 text-[0.75rem] text-white/20">305.680.0485 · 917.710.5381</p>
           <div class="mt-8">
            <h3 class="hue-label mb-3 text-white/50">Locations</h3>
            <p class="text-[0.8125rem] text-white/25">605 Lincoln Road, Suite 200<br>Miami Beach, FL 33139</p>
            <p class="mt-2 text-[0.8125rem] text-white/25">New York, NY</p>
          </div>
        </div>

        <div>
          <h3 class="hue-label mb-5 text-white/50">Services</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/creative-services" class="footer-link">Service Packages</NuxtLink></li>
            <li><NuxtLink to="/creative-services#retainers" class="footer-link">Monthly Retainers</NuxtLink></li>
            <li><NuxtLink to="/creative-services#alacarte" class="footer-link">À La Carte</NuxtLink></li>
            <li><NuxtLink to="/scope" class="footer-link">Scope Builder</NuxtLink></li>
            <li><NuxtLink to="/brand-audit" class="footer-link">Free Brand Audit</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="hue-label mb-5 text-white/50">Industries</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/industries/government-ngo-community" class="footer-link">Government & NGO</NuxtLink></li>
            <li><NuxtLink to="/industries/architecture-engineering" class="footer-link">Architecture & Engineering</NuxtLink></li>
            <li><NuxtLink to="/industries/real-estate-development" class="footer-link">Real Estate</NuxtLink></li>
            <li><NuxtLink to="/industries/professional-services" class="footer-link">Professional Services</NuxtLink></li>
            <li><NuxtLink to="/industries/technology-saas" class="footer-link">Technology & SaaS</NuxtLink></li>
            <li><NuxtLink to="/industries" class="footer-link text-white/20">All Industries →</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="hue-label mb-5 text-white/50">Company</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/case-studies" class="footer-link">Case Studies</NuxtLink></li>
            <li><NuxtLink to="/portfolio" class="footer-link">Portfolio</NuxtLink></li>
            <li><NuxtLink to="/partnerships" class="footer-link">Partnerships</NuxtLink></li>
            <li><NuxtLink to="/about" class="footer-link">About Hue</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact</NuxtLink></li>
          </ul>
         
        </div>
      </div>

      <div class="flex flex-col items-center justify-center gap-4 pt-8 ">
        <p class="text-[0.6875rem] tracking-wider text-white/20">
          © {{ new Date().getFullYear() }} HUE CREATIVE AGENCY, INC. ALL RIGHTS RESERVED.
        </p>
        <p class="text-[0.6875rem] text-white/15 uppercase tracking-wider mb-20">Miami Beach · New York</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute()
const { submitSubscribe } = useDirectus()

// Pages that have their own CTA sections — hide the footer CTA to avoid doubling
const pagesWithOwnCta = ['/', '/about', '/partnerships', '/creative-services', '/brand-audit', '/contact']
const showCta = computed(() => {
  const path = route.path
  // Exact match or starts-with for dynamic routes like /creative-services/[slug], /case-studies/[url], /portfolio/[slug]
  return !pagesWithOwnCta.some(p => path === p) &&
    !path.startsWith('/creative-services/') &&
    !path.startsWith('/case-studies/') &&
    !path.startsWith('/portfolio/')
})

const subscribeEmail = ref('')
const subscribing = ref(false)
const subscribed = ref(false)

async function handleSubscribe() {
  subscribing.value = true
  const result = await submitSubscribe({ email: subscribeEmail.value })
  subscribing.value = false
  if (result.success) subscribed.value = true
}
</script>

<template>
  <footer class="bg-[var(--near-black)]">
    <!-- CTA strip -->
    <div class="border-b border-white/10 px-6 py-16 text-center">
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

    <!-- Footer grid -->
    <div class="hue-container px-6 py-16">
      <div class="grid gap-12 md:grid-cols-4">
        <div class="md:col-span-1">
          <LayoutHueLogo fill="grey" size="18px" />
          <p class="mt-6 text-[0.8125rem] leading-relaxed text-white/30">
            Strategic brand positioning, lead generation, and creative execution for growth-stage B2B companies.
          </p>
          <div class="mt-6 flex gap-3">
            <a href="mailto:contact@huestudios.com" class="footer-link text-[0.75rem]">contact@huestudios.com</a>
          </div>
          <p class="mt-2 text-[0.75rem] text-white/20">305.680.0485 · 917.710.5381</p>
        </div>

        <div>
          <h3 class="hue-label mb-5 text-white/50">Services</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/creative-services" class="footer-link">Service Packages</NuxtLink></li>
            <li><NuxtLink to="/creative-services#retainers" class="footer-link">Monthly Retainers</NuxtLink></li>
            <li><NuxtLink to="/creative-services#alacarte" class="footer-link">À La Carte</NuxtLink></li>
            <li><NuxtLink to="/brand-audit" class="footer-link">Free Brand Audit</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="hue-label mb-5 text-white/50">Industries</h3>
          <ul class="space-y-3">
            <li><NuxtLink to="/industries/architecture-engineering" class="footer-link">Architecture & Engineering</NuxtLink></li>
            <li><NuxtLink to="/industries/real-estate-development" class="footer-link">Real Estate</NuxtLink></li>
            <li><NuxtLink to="/industries/professional-services" class="footer-link">Professional Services</NuxtLink></li>
            <li><NuxtLink to="/industries/technology-saas" class="footer-link">Technology & SaaS</NuxtLink></li>
            <li><NuxtLink to="/industries/fashion-retail" class="footer-link">Fashion & Retail</NuxtLink></li>
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
          <div class="mt-8">
            <h3 class="hue-label mb-3 text-white/50">Locations</h3>
            <p class="text-[0.8125rem] text-white/25">605 Lincoln Road, Suite 200<br>Miami Beach, FL 33139</p>
            <p class="mt-2 text-[0.8125rem] text-white/25">New York, NY</p>
          </div>
        </div>
      </div>

      <div class="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
        <p class="text-[0.6875rem] tracking-wider text-white/20">
          © {{ new Date().getFullYear() }} HUE CREATIVE AGENCY, INC. ALL RIGHTS RESERVED.
        </p>
        <p class="text-[0.6875rem] text-white/15">Miami Beach · New York</p>
      </div>
    </div>
  </footer>
</template>

<template>
  <section class="intel-section" style="background: var(--color-bg);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">Who We Are</p>
      <h2 class="intel-h2 mb-12 reveal reveal-delay-1">
        Design-led. Development-built. AI-powered.
      </h2>

      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- Text -->
        <div class="reveal reveal-delay-2">
          <p class="intel-body-lg mb-6">
            Hue is a boutique creative agency in Miami Beach, founded by Peter and Camila
            Hoffman. Peter brings 15+ years of full-stack development across Nuxt, Directus, and
            modern AI tooling. Camila brings a decade of brand and creative direction, including
            work at A|X Armani Exchange.
          </p>
          <p class="intel-body-lg">
            Hue Intelligence is what happens when design thinking meets data infrastructure.
            We don't bolt AI onto existing websites. We build the systems that make AI genuinely
            useful — and the experiences that make people actually want to use them.
          </p>
        </div>

        <!-- Geometric element + trust signals -->
        <div class="reveal reveal-delay-3">
          <!-- Abstract geometric -->
          <div class="mb-10" aria-hidden="true">
            <svg width="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="max-w-sm">
              <rect x="0" y="0" width="180" height="180" rx="2" fill="#131210" stroke="#2A2720" stroke-width="1"/>
              <rect x="20" y="20" width="60" height="60" rx="2" fill="#D4973A" opacity="0.15"/>
              <rect x="100" y="100" width="60" height="60" rx="2" fill="#D4973A" opacity="0.25"/>
              <rect x="220" y="10" width="160" height="80" rx="2" fill="#1C1A17" stroke="#2A2720" stroke-width="1"/>
              <rect x="220" y="110" width="160" height="80" rx="2" fill="#1C1A17" stroke="#2A2720" stroke-width="1"/>
              <line x1="240" y1="40" x2="360" y2="40" stroke="#2A2720" stroke-width="1"/>
              <line x1="240" y1="60" x2="320" y2="60" stroke="#2A2720" stroke-width="1"/>
              <line x1="240" y1="140" x2="360" y2="140" stroke="#2A2720" stroke-width="1"/>
              <line x1="240" y1="160" x2="300" y2="160" stroke="#D4973A" stroke-width="1" opacity="0.5"/>
            </svg>
          </div>

          <!-- Trust signals -->
          <div class="grid grid-cols-3 gap-6">
            <div v-for="signal in trustSignals" :key="signal.label">
              <p class="mb-1 text-2xl font-light" style="font-family: var(--font); color: var(--color-accent);">
                {{ signal.value }}
              </p>
              <p class="intel-body-sm">{{ signal.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const trustSignals = [
  { value: '15+', label: 'Years of development experience' },
  { value: 'Directus', label: 'Implementation partner*' },
  { value: 'Boutique', label: 'You work directly with the founders, always' },
]
</script>

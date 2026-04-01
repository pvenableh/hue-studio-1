<template>
  <section class="intel-section" style="background: var(--color-bg);">
    <div class="intel-container px-6 md:px-10">
      <p class="intel-eyebrow mb-4 reveal">The Challenge</p>
      <h2 class="intel-h2 mb-12 max-w-3xl reveal reveal-delay-1">
        Your organization is sitting on a goldmine of untapped data.
      </h2>

      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <!-- Left: body copy -->
        <div class="reveal reveal-delay-2">
          <p class="intel-body-lg mb-6">
            Most small and mid-sized organizations have more data than they
            know what to do with — member records, project files, donor histories,
            contact databases. It lives in spreadsheets, email threads, and
            disconnected tools.
          </p>
          <p class="intel-body-lg">
            It answers no questions. It writes no reports. It reminds no one.
          </p>
        </div>

        <!-- Right: stat cards -->
        <div class="flex flex-col gap-4">
          <div v-for="(stat, i) in stats" :key="stat.label" class="intel-stat-card flex items-start gap-4 reveal" :style="{ transitionDelay: `${(i + 1) * 100}ms` }">
            <Icon :name="stat.icon" class="mt-0.5 size-5 shrink-0" style="color: var(--color-accent);" />
            <div>
              <p class="intel-h3 mb-1">{{ stat.value }}</p>
              <p class="intel-body-sm">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { icon: 'lucide:clock', value: '6–10 hrs/week', label: 'Lost to manual reporting and data lookup' },
  { icon: 'lucide:file-text', value: '70%', label: 'Of grant/proposal writing is repetitive structured content' },
  { icon: 'lucide:users', value: '1 in 3', label: 'Staff tasks could be automated with existing data' },
]
</script>

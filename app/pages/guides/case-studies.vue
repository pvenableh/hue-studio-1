<template>
  <div>
    <!-- Hero -->
    <section class="hue-section-dark relative overflow-hidden px-2 md:px-6 py-24 md:py-32">
      <SectionWatermark word="Guide" :dark="true" top="2rem" />
      <div class="hue-container relative">
        <p class="hue-label mb-5 text-white/40">Internal Guide</p>
        <h1 class="hue-display-lg text-white max-w-2xl">
          Case Studies
          <span style="font-family:var(--font-editorial);font-style:italic;">in Directus</span>
        </h1>
        <p class="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/45">
          Everything you need to create, edit, and manage case studies. From fields to relationships to publishing.
        </p>
        <div class="mt-10 flex items-center gap-4">
          <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-wider text-white/60">
            For Camila
          </span>
          <span class="text-[0.75rem] text-white/30">Updated March 2026</span>
        </div>
      </div>
    </section>

    <!-- Quick Nav -->
    <section class="hue-section border-b border-[var(--silk)] px-2 md:px-6 py-6">
      <div class="hue-container flex flex-wrap items-center gap-3">
        <span class="hue-label-sm text-[var(--silver)]">Jump to</span>
        <button
          v-for="s in sections"
          :key="s.id"
          class="rounded-full border border-[var(--silk)] px-3 py-1 text-[0.6875rem] font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--near-black)] hover:text-[var(--near-black)]"
          @click="scrollTo(s.id)"
        >
          {{ s.label }}
        </button>
      </div>
    </section>

    <!-- 1. Overview -->
    <section id="overview" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">1</span>
          <h2 class="hue-display-md">Overview</h2>
        </div>
        <div class="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p class="hue-body-lg mb-6">
              Case studies live in the <code class="rounded bg-[var(--cloud)] px-1.5 py-0.5 text-[0.875rem] font-medium text-[var(--near-black)]">case_studies</code> collection in Directus. They tell the story of a client project by combining portfolio items into a structured narrative.
            </p>
            <p class="hue-body-lg">
              Every case study follows a <strong>Challenge → Solution → Results</strong> arc — what problem the client faced, what Hue did, and the measurable outcomes.
            </p>
          </div>
          <div class="rounded-sm border border-[var(--silk)] bg-[var(--snow)] p-6">
            <p class="hue-label-sm mb-4 text-[var(--silver)]">Think of it this way</p>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Icon name="lucide:image" class="mt-0.5 size-4 shrink-0 text-[var(--grey)]" />
                <div>
                  <p class="text-[0.875rem] font-medium">Portfolio Items</p>
                  <p class="hue-body-sm">Individual design pieces — a logo, a website, print materials.</p>
                </div>
              </div>
              <div class="border-t border-[var(--silk)]" />
              <div class="flex items-start gap-3">
                <Icon name="lucide:book-open" class="mt-0.5 size-4 shrink-0 text-[var(--near-black)]" />
                <div>
                  <p class="text-[0.875rem] font-medium">Case Studies</p>
                  <p class="hue-body-sm">The narrative wrapper that ties multiple portfolio items into a compelling project story.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Fields Reference -->
    <section id="fields" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">2</span>
          <h2 class="hue-display-md">Fields Reference</h2>
        </div>
        <p class="hue-body-lg mb-8 max-w-xl">Every case study has these fields. Required fields are marked with a dot.</p>

        <div class="overflow-hidden rounded-sm border border-[var(--silk)]">
          <!-- Header -->
          <div class="grid grid-cols-[1fr_90px_48px_1.5fr] gap-px bg-[var(--near-black)] px-5 py-3 text-[0.6875rem] font-medium uppercase tracking-wider text-white/70 md:grid-cols-[160px_100px_56px_1fr]">
            <span>Field</span>
            <span>Type</span>
            <span class="text-center">Req</span>
            <span>Description</span>
          </div>
          <!-- Rows -->
          <div
            v-for="(field, i) in fields"
            :key="field.name"
            class="grid grid-cols-[1fr_90px_48px_1.5fr] gap-px border-t border-[var(--silk)] px-5 py-3 md:grid-cols-[160px_100px_56px_1fr]"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-[var(--snow)]'"
          >
            <span class="text-[0.875rem] font-medium text-[var(--near-black)]">{{ field.name }}</span>
            <span class="text-[0.8125rem] text-[var(--grey)]">{{ field.type }}</span>
            <span class="text-center">
              <span v-if="field.required" class="inline-block size-2 rounded-full bg-[var(--near-black)]" />
            </span>
            <span class="text-[0.8125rem] text-[var(--color-text-secondary)]">{{ field.description }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Featured Image & Hero -->
    <section id="hero-image" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">3</span>
          <h2 class="hue-display-md">Featured Image & Hero</h2>
        </div>
        <p class="hue-body-lg mb-10 max-w-xl">
          The featured image is the most prominent visual on a case study. It appears as a full-width hero on the detail page and as the card thumbnail on the listing page.
        </p>

        <!-- How it's used -->
        <div class="mb-10 grid gap-5 md:grid-cols-2">
          <div class="rounded-sm border border-[var(--silk)] bg-white p-7">
            <div class="mb-3 flex items-center gap-3">
              <Icon name="lucide:monitor" class="size-5 text-[var(--near-black)]" />
              <h3 class="text-[0.9375rem] font-medium">Detail Page Hero</h3>
            </div>
            <p class="hue-body-sm">Displayed full-width below the project info. Cropped to fit a wide landscape format (roughly 16:9). Use the Directus focal point tool to control where the crop centers.</p>
          </div>
          <div class="rounded-sm border border-[var(--silk)] bg-white p-7">
            <div class="mb-3 flex items-center gap-3">
              <Icon name="lucide:layout-grid" class="size-5 text-[var(--near-black)]" />
              <h3 class="text-[0.9375rem] font-medium">Listing Card Thumbnail</h3>
            </div>
            <p class="hue-body-sm">Shown as a contained image inside a 16:9 card on the case studies index. Logos are scaled proportionally so wide and square marks look balanced next to each other.</p>
          </div>
        </div>

        <!-- What to upload -->
        <h3 class="hue-label mb-6">What makes a good featured image</h3>
        <div class="mb-8 space-y-4">
          <div v-for="rec in heroRecommendations" :key="rec.title" class="flex items-start gap-4">
            <div class="flex size-7 shrink-0 items-center justify-center rounded-full" :class="rec.good ? 'bg-[var(--near-black)]' : 'bg-[var(--silk)]'">
              <Icon :name="rec.good ? 'lucide:check' : 'lucide:x'" class="size-3.5" :class="rec.good ? 'text-white' : 'text-[var(--grey)]'" />
            </div>
            <div>
              <p class="text-[0.9375rem]"><strong>{{ rec.title }}</strong></p>
              <p class="hue-body-sm mt-0.5">{{ rec.description }}</p>
            </div>
          </div>
        </div>

        <!-- Fallback chain -->
        <div class="rounded-sm border-l-2 border-[var(--near-black)] bg-[var(--snow)] py-5 pl-5 pr-6">
          <p class="mb-2 text-[0.875rem] font-medium text-[var(--near-black)]">Fallback behavior</p>
          <p class="text-[0.8125rem] text-[var(--color-text-secondary)]">
            If no featured image is uploaded, the site automatically falls back to:
            the <strong>branding/logo portfolio item's</strong> featured image, then <strong>any linked portfolio item's</strong> featured image, then the <strong>first gallery image</strong> from a linked portfolio item. For the best result, always upload a dedicated featured image.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. The Story Sections -->
    <section id="story" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">4</span>
          <h2 class="hue-display-md">The Story Sections</h2>
        </div>
        <p class="hue-body-lg mb-10 max-w-xl">
          These three rich-text fields form the narrative core. They use the HTML editor, so you can format with headings, lists, bold, italic, and links.
        </p>

        <div class="grid gap-5 md:grid-cols-3">
          <div v-for="s in storySections" :key="s.title" class="group rounded-sm border border-[var(--silk)] bg-white p-7 transition hover:border-[var(--silver)]">
            <div class="mb-4 flex items-center gap-3">
              <Icon :name="s.icon" class="size-5 text-[var(--grey)] transition group-hover:text-[var(--near-black)]" />
              <h3 class="text-[1rem] font-medium">{{ s.title }}</h3>
            </div>
            <p class="hue-body-sm">{{ s.description }}</p>
            <p class="hue-label-sm mt-4 text-[var(--silver)]">{{ s.prompt }}</p>
          </div>
        </div>

        <div class="mt-8 rounded-sm border-l-2 border-[var(--near-black)] bg-[var(--snow)] py-5 pl-5 pr-6">
          <p class="text-[0.8125rem] text-[var(--color-text-secondary)]">
            <strong class="text-[var(--near-black)]">Writing tip:</strong> Keep the Challenge focused on the client's pain, the Solution on what Hue specifically did, and Results on measurable outcomes. This structure helps potential clients see themselves in the story.
          </p>
        </div>
      </div>
    </section>

    <!-- 5. Relationships -->
    <section id="relationships" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">5</span>
          <h2 class="hue-display-md">Relationships</h2>
        </div>
        <p class="hue-body-lg mb-10 max-w-xl">
          Each case study connects to other collections. These fields appear at the bottom of the edit form.
        </p>

        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="r in relationships" :key="r.title" class="rounded-sm border border-[var(--silk)] bg-white p-7">
            <div class="mb-3 flex items-center gap-3">
              <div class="flex size-8 items-center justify-center rounded-full bg-[var(--cloud)]">
                <Icon :name="r.icon" class="size-4 text-[var(--near-black)]" />
              </div>
              <h3 class="text-[0.9375rem] font-medium">{{ r.title }}</h3>
            </div>
            <p class="hue-body-sm mb-3">{{ r.description }}</p>
            <div v-if="r.examples" class="flex flex-wrap gap-1.5">
              <span
                v-for="ex in r.examples"
                :key="ex"
                class="rounded-full bg-[var(--cloud)] px-2.5 py-0.5 text-[0.6875rem] font-medium text-[var(--dark-grey)]"
              >
                {{ ex }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Creating a New Case Study -->
    <section id="create" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">6</span>
          <h2 class="hue-display-md">Creating a New Case Study</h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="(step, i) in createSteps"
            :key="i"
            class="grid grid-cols-[40px_1fr] items-start gap-5 rounded-sm border border-[var(--silk)] bg-white p-5 transition hover:border-[var(--silver)]"
          >
            <span class="flex size-8 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.6875rem] font-bold text-white">{{ i + 1 }}</span>
            <div>
              <p class="text-[0.9375rem] font-medium text-[var(--near-black)]" v-html="step.text" />
              <p class="hue-body-sm mt-1">{{ step.hint }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Updating Existing -->
    <section id="update" class="hue-section px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">7</span>
          <h2 class="hue-display-md">Updating an Existing Case Study</h2>
        </div>

        <div class="space-y-4">
          <div v-for="item in updateItems" :key="item.title" class="flex items-start gap-4">
            <Icon name="lucide:check" class="mt-1 size-4 shrink-0 text-[var(--near-black)]" />
            <div>
              <p class="text-[0.9375rem]"><strong>{{ item.title }}</strong> — {{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Tips & Best Practices -->
    <section id="tips" class="hue-section-alt px-2 md:px-6 py-20">
      <div class="hue-container-md">
        <div class="mb-10 flex items-center gap-4">
          <span class="flex size-9 items-center justify-center rounded-full bg-[var(--near-black)] text-[0.75rem] font-bold text-white">8</span>
          <h2 class="hue-display-md">Tips & Best Practices</h2>
        </div>

        <div class="space-y-5">
          <div
            v-for="tip in tips"
            :key="tip.title"
            class="rounded-sm border-l-2 border-[var(--near-black)] bg-[var(--snow)] py-5 pl-5 pr-6"
          >
            <p class="mb-1 text-[0.875rem] font-medium text-[var(--near-black)]">{{ tip.title }}</p>
            <p class="text-[0.8125rem] text-[var(--color-text-secondary)]">{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section class="hue-section-dark px-2 md:px-6 py-20 text-center">
      <div class="hue-container-sm">
        <p class="hue-pullquote text-white">Questions? Reach out to Peter.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Case Studies Guide | Hue',
  description: 'Internal guide for creating and managing case studies in Directus.',
  robots: 'noindex, nofollow',
})

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'fields', label: 'Fields' },
  { id: 'hero-image', label: 'Hero Image' },
  { id: 'story', label: 'Story Sections' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'create', label: 'Create New' },
  { id: 'update', label: 'Update Existing' },
  { id: 'tips', label: 'Tips' },
]

const fields = [
  { name: 'Title', type: 'Text', required: true, description: 'The case study name (e.g. "Killowen")' },
  { name: 'URL / Slug', type: 'Auto-slug', required: true, description: 'Auto-generated from title, used for the page URL' },
  { name: 'Status', type: 'Dropdown', required: true, description: 'draft, published, or archived' },
  { name: 'Excerpt', type: 'Multiline', required: false, description: 'Short description for listings and previews (1-2 sentences)' },
  { name: 'Featured Image', type: 'Image', required: false, description: 'Hero / cover image upload' },
  { name: 'Client', type: 'Text', required: false, description: 'Client name override — use if different from Organization' },
  { name: 'Organization', type: 'Relation', required: false, description: 'Link to an existing organization record' },
  { name: 'Project Duration', type: 'Text', required: false, description: 'How long the project took (e.g. "8 weeks")' },
  { name: 'Project Year', type: 'Text', required: false, description: 'Year completed (e.g. "2024")' },
  { name: 'Project URL', type: 'Text', required: false, description: 'Live site URL (e.g. killowenconstruction.com)' },
  { name: 'Tags', type: 'Tags', required: false, description: 'Keywords for categorization (e.g. branding, architecture)' },
  { name: 'Featured', type: 'Toggle', required: false, description: 'Highlights on homepage and portfolio page' },
]

const heroRecommendations = [
  {
    good: true,
    title: 'A signature deliverable or brand collateral mockup',
    description: 'Stationery suite, packaging, signage, or a website screenshot on a device — something that shows the finished work in context.',
  },
  {
    good: true,
    title: 'High-resolution, landscape-oriented',
    description: 'The hero crops to roughly 16:9. Landscape images work best. Portrait or square images will be heavily cropped — use the Directus focal point tool if needed.',
  },
  {
    good: true,
    title: 'Clean background, strong contrast',
    description: 'White or neutral backgrounds let the work speak. Avoid busy textures or dark backgrounds that compete with the logo/design.',
  },
  {
    good: true,
    title: 'The logo on a white or light background for card thumbnails',
    description: 'On the listing page, the image is shown contained (not cropped). A logo on white gives the cleanest result and scales well across wide and square marks.',
  },
  {
    good: false,
    title: 'Raw logo files without context',
    description: 'A bare .png logo on transparent background can look flat. Prefer mockups or styled presentations that show the brand in use.',
  },
  {
    good: false,
    title: 'Low-resolution or heavily compressed images',
    description: 'The hero renders at up to 1920px wide. Upload at least 1920x1080 for crisp results. Directus handles compression via presets.',
  },
]

const storySections = [
  {
    title: 'Challenge',
    icon: 'lucide:alert-triangle',
    description: 'What problem did the client face? What were they looking for? Set the stage for the project.',
    prompt: 'The client\'s pain point',
  },
  {
    title: 'Solution',
    icon: 'lucide:lightbulb',
    description: 'What did Hue do? Describe the creative and strategic approach taken to solve the problem.',
    prompt: 'Hue\'s creative approach',
  },
  {
    title: 'Results',
    icon: 'lucide:trending-up',
    description: 'Outcomes, metrics, and business impact. What changed for the client after the work was done?',
    prompt: 'Measurable outcomes',
  },
]

const relationships = [
  {
    title: 'Gallery',
    icon: 'lucide:images',
    description: 'Upload additional images beyond the featured image. Drag to reorder them in the gallery.',
    examples: null,
  },
  {
    title: 'Services',
    icon: 'lucide:wrench',
    description: 'Link the services Hue provided for this project.',
    examples: ['Branding', 'Digital / Web', 'Print / Graphic', 'Corporate / Data'],
  },
  {
    title: 'Industries',
    icon: 'lucide:building-2',
    description: 'Link relevant industries for filtering and categorization on the site.',
    examples: null,
  },
  {
    title: 'Portfolio Items',
    icon: 'lucide:layout-grid',
    description: 'Link the actual design deliverables — the portfolio pieces that belong to this project.',
    examples: null,
  },
]

const createSteps = [
  { text: 'Navigate to <strong>Case Studies</strong> in the sidebar and click the <strong>+</strong> button', hint: 'Top right corner of the collection view.' },
  { text: 'Fill in the <strong>Title</strong>, set <strong>Status</strong> to draft, and write an <strong>Excerpt</strong>', hint: 'The excerpt is a 1-2 sentence summary for listing pages.' },
  { text: 'Upload a <strong>Featured Image</strong>', hint: 'This is the hero/cover visual that represents the project.' },
  { text: 'Write the <strong>Challenge</strong>, <strong>Solution</strong>, and <strong>Results</strong>', hint: 'Use the rich text editor — headings, lists, bold, and links all work.' },
  { text: 'Fill in <strong>Project Duration</strong>, <strong>Project Year</strong>, and <strong>Project URL</strong>', hint: 'Metadata that appears on the case study detail page.' },
  { text: 'Add <strong>Tags</strong> for categorization', hint: 'e.g. branding, architecture, construction, real estate.' },
  { text: 'Link <strong>Services</strong>, <strong>Industries</strong>, <strong>Portfolio Items</strong>, and upload <strong>Gallery</strong> images', hint: 'Scroll to the bottom of the form to find these relationship fields.' },
  { text: 'Set <strong>Status</strong> to <strong>published</strong> when ready', hint: 'Changes go live immediately — double-check everything first.' },
  { text: 'Toggle <strong>Featured</strong> if it should appear prominently', hint: 'Featured case studies show on the homepage and portfolio page.' },
]

const updateItems = [
  { title: 'Find it', description: 'Go to Case Studies and use search or filter by status to locate the case study.' },
  { title: 'Edit fields', description: 'Click into any case study and edit fields directly. Save when done.' },
  { title: 'Reorder gallery', description: 'Drag images into the desired position within the gallery field.' },
  { title: 'Add/remove relationships', description: 'Use the Services, Industries, and Portfolio Items fields at the bottom to add or remove links.' },
  { title: 'Remember', description: 'Changes are live immediately if the status is set to published.' },
]

const tips = [
  {
    title: 'Portfolio vs. Case Study',
    description: 'Portfolio items are individual design pieces (a logo, a website). Case studies wrap multiple portfolio items into a narrative with Challenge / Solution / Results.',
  },
  {
    title: 'Organization vs. Client field',
    description: 'If the client already exists in Organizations, link them there. The Client text field is just a display-name override for when the org name doesn\'t match what you want to show.',
  },
  {
    title: 'Display order',
    description: 'The Sort field controls the order case studies appear. Lower numbers show first. You can also drag to reorder in the Directus list view.',
  },
  {
    title: 'Archive, don\'t delete',
    description: 'Set status to archived instead of deleting. This preserves the record and all its relationships while hiding it from the live site.',
  },
  {
    title: 'Publish = Live',
    description: 'Changes are live immediately when status is set to published. Keep status as draft while you\'re still working on content.',
  },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

useScrollReveal()
</script>

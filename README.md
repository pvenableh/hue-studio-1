# Hue — Creative Marketing Studio

Full-service creative marketing for growth-stage companies. Brand strategy, digital experience, and lead generation — built on Nuxt 4 and Directus.

## Stack

- **Framework**: Nuxt 4 (`compatibilityVersion: 4`)
- **CMS**: Directus (headless, self-hosted at `admin.huestudios.company`)
- **Styling**: Tailwind CSS v4 + custom design tokens (`hue-theme.css`)
- **Fonts**: DM Sans + Cormorant Garamond
- **Icons**: Nuxt Icon (`lucide:*`)
- **Animation**: GSAP 3 (hero entrances) + CSS scroll reveal
- **UI**: shadcn-nuxt + Reka UI
- **Forms**: Server-side API route with Directus static token — all form submissions create leads, contacts, and mailing list entries in the CRM pipeline

## Setup

```bash
pnpm install
cp .env.example .env   # Add DIRECTUS_STATIC_TOKEN + NUXT_PUBLIC_DIRECTUS_URL
pnpm dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — GSAP hero, packages, process, live portfolio preview, industries, brand audit CTA |
| `/portfolio` | Portfolio grid with dual service + industry filters, featured case studies |
| `/portfolio/[slug]` | Case study / portfolio detail — challenge, creation, results, before/after, child projects |
| `/creative-services` | Service packages ($15K/$30K/$50K), retainers, à la carte |
| `/creative-services/[slug]` | Service detail — deliverables, who it's for, process steps, related work |
| `/industries` | Industries hub with sector positioning |
| `/industries/[slug]` | Industry detail — challenges, solutions, filtered portfolio |
| `/case-studies` | Case studies — narrative client stories linked to portfolio deliverables |
| `/case-studies/[url]` | Case study detail — challenge, solution, results, linked portfolio work |
| `/brand-audit` | Free Brand Perception Audit → creates lead + contact in CRM |
| `/about` | Team bios, founding story, process, principles |
| `/partnerships` | Agency / developer / referral partnerships |
| `/contact` | Strategy session request → creates lead + contact + newsletter subscription |

## Lead Generation Pipeline

All website forms flow through a single server API route (`/api/submit`) that uses a Directus static token to create records in the CRM:

| Form | Type | Creates |
|------|------|---------|
| Strategy Session (contact) | `contact` | Contact + Lead (scored) + Activity + Request + Newsletter sub |
| Brand Audit | `audit` | Contact + Lead (mid-funnel) + Activity + Request |
| Newsletter | `subscribe` | Contact + Mailing list entry |

Leads are auto-scored by budget, auto-prioritized, and assigned follow-up dates. They appear immediately in the Earnest CRM dashboard.

## Content Architecture: Case Studies + Portfolio

Two separate collections serve distinct purposes:

### Case Studies (`case_studies`) — The Story
Client-facing narratives with challenge/solution/results structure.
- `organization` — M2O to `organizations`
- `services` — M2M to `services`
- `portfolio_items` — M2M to `portfolio` (links deliverables to the narrative)
- `gallery` — M2M to `directus_files`
- `project_year` / `project_duration` — meta details

### Portfolio (`portfolio`) — The Work
Individual deliverables (logos, websites, brand guides, etc.).
- `service` — M2O to `services` (primary service category)
- `industries` — M2M to `industries` (multi-tag)
- `images` — M2M to `directus_files`
- `before_and_afters` — M2M to `before_and_afters`
- `videos` — O2M to `videos`
- `projects` — O2M self-reference via `parent_id` (child deliverables)

### Relationships

```
case_studies ──M2M──► portfolio ──M2M──► industries
     │                    │
     ├──M2M──► services   ├──M2O──► services
     ├──M2O──► organizations  ├──M2M──► directus_files
     └──M2M──► directus_files └──M2M──► before_and_afters
```

### Industries (7 unified categories)

| # | Name | Slug |
|---|---|---|
| 1 | Government & Community Development | `government-community-development` |
| 2 | Architecture & Construction | `architecture-construction` |
| 3 | Real Estate & Development | `real-estate-development` |
| 4 | Technology & SaaS | `technology-saas` |
| 5 | Fashion & Retail | `fashion-retail` |
| 6 | Professional Services | `professional-services` |
| 7 | Arts, Culture & Nonprofit | `arts-nonprofit` |

Industry detail content (headlines, challenges, solutions, quotes) lives in `app/data/industries.ts`. Slugs must match the Directus `url` field.

### Planned Improvements

- [ ] Add `industries` M2M to `case_studies` for direct industry tagging
- [ ] Simplify portfolio to pure deliverables (move narrative fields to case_studies only)
- [ ] Remove portfolio self-referencing `parent_id` in favor of case_studies grouping
- [ ] Drive homepage featured section from case_studies instead of portfolio

## Directus API

The `useDirectus` composable handles all reads. Key methods:

- `fetchPortfolio()` — all published portfolio items with full nested relations
- `fetchPortfolioItem(slug)` — single item by slug
- `fetchFeaturedPortfolio()` — featured portfolio items (`featured: true`, top-level)
- `fetchCaseStudies()` — all case studies with linked portfolio items
- `fetchCaseStudyByUrl(url)` — single case study by URL slug
- `submitContact()` / `submitAudit()` / `submitSubscribe()` — form submissions via `/api/submit`

Assets: `https://admin.huestudios.company/assets/{uuid}?width=600&fit=cover&quality=80`

## Design System

Tokens in `app/assets/css/hue-theme.css`:

- `.hue-display-xl/lg/md` — ultralight headlines
- `.hue-editorial-xl/lg/md` — italic serif accents
- `.hue-btn` / `.hue-btn-ghost` / `.hue-btn-outline` — buttons
- `.hue-card` / `.hue-card-featured` — cards
- `.hue-section` / `.hue-section-alt` / `.hue-section-dark` — section backgrounds
- `.hue-container` / `.hue-container-sm` — max-width containers
- `.reveal` — scroll-triggered fade-in

## Deployment

```bash
pnpm build      # SSR build (Vercel/Netlify)
pnpm preview    # Preview production build
pnpm generate   # Static generation
```

Set `NUXT_PUBLIC_DIRECTUS_URL` and `DIRECTUS_STATIC_TOKEN` in your deployment environment.

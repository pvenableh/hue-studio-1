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
| `/case-studies` | Case studies from `case_studies` collection (legacy — migrating to portfolio) |
| `/case-studies/[url]` | Case study detail from legacy collection |
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

## Portfolio as Case Studies

Portfolio items with `parent_id` children serve as case studies. The parent tells the story (`synopsis`, `challenge`, `creation`, `results`), and child items in `projects` are the individual deliverables. Key fields:

- `synopsis` — overview / brief
- `challenge` — the business problem
- `creation` — how we solved it
- `results` — business outcomes (new field)
- `featured` — flag for homepage/featured placement (new field)
- `project_year` / `project_duration` — meta card details (new fields)
- `before_and_afters` — visual transformation pairs
- `projects` — child portfolio items (O2M self-reference)

## Directus API

The `useDirectus` composable handles all reads. Key methods:

- `fetchPortfolio()` — all published portfolio items with full nested relations
- `fetchPortfolioItem(slug)` — single item by slug
- `fetchFeaturedPortfolio()` — featured case studies (parent items, `featured: true`)
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

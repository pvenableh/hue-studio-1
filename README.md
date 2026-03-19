# Hue Creative Agency — Nuxt 4 Site

Strategic brand positioning, lead generation, and creative execution for growth-stage B2B companies.

## Stack

- **Framework**: Nuxt 4 (`compatibilityVersion: 4`)
- **Styling**: Tailwind CSS v4 + custom design tokens (`hue-theme.css`)
- **CMS**: Directus (self-hosted at `admin.huestudios.company`)
- **Fonts**: DM Sans (Avenir Next proxy) + Cormorant Garamond (Bodoni proxy)
- **Icons**: Nuxt Icon (`lucide:*`)
- **Animation**: GSAP 3 (hero entrances) + CSS scroll reveal
- **UI**: shadcn-nuxt + Reka UI

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and add your Directus URL
cp .env.example .env

# 3. Start dev server
pnpm dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — GSAP hero, real 4-stage process, packages, live portfolio preview, industries, brand audit CTA, founding quote |
| `/portfolio` | Live Directus portfolio with dual service + industry filters |
| `/portfolio/[slug]` | Portfolio item detail — images, before/after (junction resolved), challenge, industry cross-links |
| `/creative-services` | Packages ($15K/$30K/$50K), expandable service list, retainers, à la carte, real process |
| `/creative-services/[slug]` | Individual service detail — deliverables, who it's for, process steps, industry links |
| `/industries` | Industries hub with "why industry matters" dark section |
| `/industries/[slug]` | Industry detail — challenges, solutions, live Directus portfolio filtered to sector |
| `/case-studies` | Case studies index from `case_studies` Directus collection, service filters |
| `/case-studies/[url]` | Case study detail — challenge, solution, results, gallery |
| `/brand-audit` | Free Brand Perception Audit form — POSTs to `requests` collection |
| `/about` | Camila & Peter bios (real, from live site), founding story, real 4-stage process, principles |
| `/partnerships` | Agency/developer/referral partnerships page |
| `/contact` | Contact form — POSTs to `requests` collection |

## Real brand details incorporated

- **Founded**: 2005 by Camila Hoffman and Peter Hoffman
- **Camila**: Art Director at A|X Armani Exchange 8+ years, Parsons BFA Communications Design, 24 years experience
- **Peter**: Digital Director since 2006, BA Hobart College
- **Office**: 605 Lincoln Road, Suite 200, Miami Beach, FL 33139
- **Process**: Understanding → Positioning → Brand Meaning → Big Idea (real 4-stage framework from live site)
- **Taglines**: "Design is intelligence made visible" (Lou Danziger) · "Visual excellence is achieved through a process that is executed with a defined purpose"
- **Clients**: A|X Armani Exchange, Pepsi, Eljin Construction, Omega Construction, Killowen, RKC Architecture, Water Works Realty, Dana Blair Designs, Binghamton Philharmonic, and more
- **Partnerships typo fixed**: "Parnertships" → "Partnerships" throughout

## Directus API

The `useDirectus` composable in `app/composables/useDirectus.ts` handles all API calls.

The portfolio endpoint used:
```
GET /items/portfolio
  ?fields=id,name,slug,url,status,caption,description,featured_image,
          client.*,industries.industries_id.*,service.*,images.directus_files_id
  &filter[status][_eq]=published
  &sort=sort
```

Assets are served via:
```
https://admin.huestudios.company/assets/{uuid}?width=600&height=400&fit=cover&quality=80
```

## Design System

All design tokens live in `app/assets/css/hue-theme.css`.

Key classes:
- `.hue-display-xl/lg/md` — Avenir Next ultralight headlines
- `.hue-editorial-xl/lg/md` — Cormorant Garamond italic accents
- `.hue-btn` / `.hue-btn-ghost` / `.hue-btn-outline` — pill buttons
- `.hue-card` / `.hue-card-featured` — card components
- `.hue-section` / `.hue-section-alt` / `.hue-section-dark` — section backgrounds
- `.hue-container` / `.hue-container-sm` — max-width containers
- `.reveal` + `.is-visible` — scroll-triggered fade-in animation

## Deployment

```bash
# Build
pnpm build

# Preview production build
pnpm preview

# Generate static site (if no SSR needed)
pnpm generate
```

The site is configured for SSR by default to support live Directus data fetching.
For Vercel/Netlify, set the `NUXT_PUBLIC_DIRECTUS_URL` environment variable in your deployment settings.

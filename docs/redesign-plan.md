# Hue Studios editorial redesign — execution plan

Branch: `claude/hue-studios-redesign-950a24`. Each phase runs in a **fresh session on the model named for it** (Opus 5.5, Sonnet 5.5 or Haiku 5.5 — never Fable). A session reads this file plus only the files its phase lists.

## Decisions (final — do not reopen)

| Topic | Decision |
|---|---|
| Founding year | **2005** (matches the live site). Hero eyebrow: `CREATIVE INTELLIGENCE · EST. 2005` |
| Scope | Homepage, nav, footer, `/case-studies` index, `/case-studies/[url]` detail. Every other page only inherits the retuned tokens. `/intelligence` is untouched. |
| Tokens | Retune the existing variables in `app/assets/css/hue-theme.css` in place. No second token set, no new fonts (Avenir Next + Bauer Bodoni stay). |
| Dark mode | Removed. Delete the nav toggle, `useDarkMode.ts`, `darkMode.client.ts` and the `html.dark` block. Site is light only. |
| Accent | Muted gold stays as the only accent, used for focus rings, active filter and link hover. Nothing else. |
| Nav | `Work` → `/case-studies`, `Approach` → `/about`, `Capabilities` → `/creative-services`, pill CTA `Start a Conversation` → `/contact`. |
| Footer | Carries Portfolio, Industries, Intelligence, Magazine, Partnerships, About. No routes deleted. |
| Homepage order | Hero → Work Index → Rationale Strip → Engagement Tiers → Closing CTA. All other current homepage sections are removed from the homepage (their own pages remain). |
| Hero | H1 `Reason creates.` / `Grow creative.` Subhead: "Principal-led brand, web, and video built on one rationale — so the creative grows the business." One CTA `Explore Selected Work` → `#work`. Visual: featured image of the first featured case study, framed, scale 1.04 → 1.0 on scroll. No reel until an asset exists. |
| Work Index source | `case_studies` (published), preceded by `current_work` rows with the outcome tag `In progress`. |
| Filter pills | `All`, `Brand` (Brand & Identity), `Web & Digital`, `Video & Motion` (Audio / Video), `Campaigns` (Content & Campaigns). Case studies are retagged to these. |
| Directus schema | Three nullable fields on `case_studies`: `rationale` (string), `outcome_tag` (string), `rationale_pins` (JSON list of `{image, x, y, title, note}`; `image` is an asset id, `x`/`y` are percentages). No new collection. Additive only — this is the shared Earnest production database. |
| Rationale toggle | Shown only when a case study has pins. Pins authored for the 5 featured case studies at launch. |
| Thin content | Cascun Farms case study → `draft`. |
| Closing CTA | "Ready to build on reason?" → `Complimentary Brand Assessment` (`/brand-analysis`), secondary link to `/contact`. No "Rationale Session" offering. |
| Tiers | Read from `app/data/services.ts` (Brand Foundation $15k+, Growth Engine $30k+, Market Presence $50k+). Not moved to Directus. |
| Motion | One composable, `app/composables/useEditorialMotion.ts`: `gsap.context` in `onMounted`, `ctx.revert()` in `onUnmounted`, `gsap.matchMedia` for reduced motion (opacity only). Eases `power3.out` / `power2.inOut`. Leave `gsap.client.ts` as is. |
| Verification | `pnpm build` at the end of every phase. No typecheck (not installed; do not add). One desktop and one mobile browser check per UI phase. |

## Token retune (Phase 1 values)

| Variable | New value | Note |
|---|---|---|
| `--near-black` | `#141413` | primary ink |
| `--dark-grey` | `#6E6D68` | secondary text |
| `--grey` | `#9E9D97` | labels at 12px+ uppercase only; fails AA as body text |
| `--snow` | `#FAFAFA` | unchanged |
| `--stone` (new) | `#F3F3F0` | image frames, pills |
| `--color-border` | `#E8E8E3` | hairlines |

## Token-efficiency rules for every session

- Never call Directus `read-collections` (522K characters) or read `app/types/directus.ts`. Use `read-items` with explicit `fields` and `limit`.
- Do not re-audit the repo. Trust this file.
- No subagents. No screenshots beyond the two checks per phase.
- New components go in `app/components/home/` or `app/components/case-studies/`; Nuxt prefixes them (`HomeHeroEditorial`, `CaseStudiesReasonToggle`).
- Commit at the end of the phase. Do not push.

## Phases

| # | Phase | Model | Depends on |
|---|---|---|---|
| 1 | Foundation | Sonnet | — |
| 2 | Directus fields and content | Opus | — |
| 3 | Nav, footer, homepage | Sonnet | 1 |
| 4 | Work Index | Sonnet | 1, 2 |
| 5 | Case study detail | Opus | 1, 2 |
| 6 | Cleanup and QA | Haiku | 3, 4, 5 |

Phases 1 and 2 can run in parallel. So can 4 and 5.

### 1. Foundation — Sonnet
Files: `app/assets/css/hue-theme.css`, `app/assets/css/main.css`, `app/components/layout/SiteNav.vue` (toggle only), `app/composables/useDarkMode.ts`, `app/plugins/darkMode.client.ts`, `nuxt.config.ts` (`theme-color` → `#FFFFFF`).
- Apply the token table. Delete dark mode as decided.
- Add `.hue-marginalia` (11px, uppercase, 0.14em tracking, `--grey`) for tags like `01 / RATIONALE`.
- Write `useEditorialMotion.ts` exposing `reveal(targets, opts)`, `maskHeadline(el)` and `parallax(el, from, to)`.
- Done when: build passes and no `html.dark` or `useDarkMode` references remain.

### 2. Directus fields and content — Opus
- Create the three fields with `create-field`. If the token lacks permission, stop and report.
- Read the 20 published case studies (`title, url, excerpt, challenge, solution, results, services.services_id.name`).
- Draft per case study: `rationale` (≤ 18 words, why the creative decision worked), `outcome_tag` (≤ 3 words), and the retag to the pill services. Draft 3–4 pins for each of the 5 featured case studies.
- **Show the drafts as one table and wait for Peter's approval before any `update-item`.** Use only facts already in the case study text.
- After approval: write the fields, apply retags, set Cascun Farms to draft.
- Add the three fields to `DirectusCaseStudy` and the case-study field list in `app/composables/useDirectus.ts`.

### 3. Nav, footer, homepage — Sonnet
Files: `SiteNav.vue`, `SiteFooter.vue`, `app/pages/index.vue`, new `home/HeroEditorial.vue`, `home/RationaleStrip.vue`, `home/EngagementTiers.vue`.
- Nav: one row, sticky, `bg-white/85 backdrop-blur-md`, hairline bottom border, links as decided.
- Rationale Strip copy: `01 — Diagnose` "Find the real business tension before anything is designed." / `02 — Architect` "Build one rationale that holds across print, video, social and web." / `03 — Grow` "Senior-led execution that compounds into measurable results."
- Tiers: 1px border cards, `#FAFAFA` hover, tagline, 3–4 deliverables from `services.ts`, arrow link to `/contact`.
- `index.vue` keeps its `useSeoMeta` and schema blocks; leave a `<HomeWorkIndex />` slot with `id="work"` for Phase 4.
- Done when: build passes, homepage has five sections, reduced-motion shows fades only.

### 4. Work Index — Sonnet
Files: new `home/WorkIndex.vue`, `app/pages/index.vue` (mount it), `app/pages/case-studies/index.vue` (reuse it, full list).
- Rows: index number, client / title, disciplines, outcome tag; hairline separators.
- Hover and keyboard focus reveal a preview frame (`featured_image`, else first linked portfolio image) and the `Rationale:` line. On touch, the preview shows inline.
- Pills filter client-side with a GSAP opacity and height transition. Rows missing `rationale` or `outcome_tag` render without them.
- Homepage shows `current_work` rows plus the first 6 case studies.

### 5. Case study detail — Opus
Files: `app/pages/case-studies/[url].vue` (891 lines — restructure, do not patch), new `case-studies/ReasonToggle.vue`, `case-studies/RationalePins.vue`.
- Top summary: title, one-sentence challenge (excerpt), `rationale`, disciplines.
- `Surface View`: uninterrupted images, video, before/after. `Rationale View`: pins positioned by `x`/`y` on their image, each opening a marginalia card. The toggle is a two-button group with `aria-pressed`; pins are focusable buttons.
- Remove the dark sticky-overlay narrative and the dark outcome block. Keep analytics calls, SEO meta and the 404 guard.
- Done when: a case study with pins and one without both render cleanly.

### 6. Cleanup and QA — Haiku
- Delete components the homepage no longer imports and nothing else uses (check with grep before each delete): `HeroSlider`, `useHeroSlider`, `heroSlides.ts`, `HomePortfolioPreview`, `IdeaChart`, `WhyHue`, and similar.
- Replace remaining `.reveal` uses on the in-scope pages with `useEditorialMotion`.
- Build, then one Lighthouse run on `/` and one case study. Report scores; fix only CLS regressions.

## Out of scope
Portfolio detail, services, industries, about, magazine, partnerships, scope and intelligence page redesigns; moving tiers to Directus; a hero reel.

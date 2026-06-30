// ─────────────────────────────────────────────────────────────────────────────
// "In the Studio" — current / in-progress work showcased on the home page.
//
// This is intentionally a hand-edited data file (not the CMS) so the team has
// full editorial control over how in-flight, often NDA-sensitive, client work
// is teased. Show enough to intrigue — never unshipped product detail.
//
// To add a real visual: set `image` to a Directus asset ID, or a path in
// /public (e.g. '/work/carddesk.jpg'). When omitted, a tasteful branded
// gradient is used instead — which keeps in-progress work NDA-safe by default.
// ─────────────────────────────────────────────────────────────────────────────

export interface CurrentWorkItem {
  id: string
  /** Client / project name */
  name: string
  /** One short, editorial descriptor — revealed on interaction */
  descriptor: string
  /** Small category label shown at rest, e.g. "Brand & Web" */
  category: string
  /** Status pill copy */
  status: string
  /** Discipline tags revealed on hover */
  disciplines: string[]
  /** Base tint used for the gradient fallback (any CSS color) */
  tint: string
  /** Optional image — Directus asset ID, absolute URL, or /public path */
  image?: string
  /** Optional link once there's a public page to point at */
  to?: string
}

export const currentWork: CurrentWorkItem[] = [
  {
    id: 'earnest',
    name: 'Earnest',
    category: 'Brand & Digital',
    descriptor: 'A new brand identity and digital experience, built from the ground up.',
    status: 'In Progress',
    disciplines: ['Brand Identity', 'Web Design', 'Art Direction'],
    tint: '#C4973B',
  },
  {
    id: 'carddesk',
    name: 'CardDesk',
    category: 'Product & Web',
    descriptor: 'Product design and a marketing site for a platform built to scale.',
    status: 'In Progress',
    disciplines: ['Product Design', 'UX/UI', 'Web Development'],
    tint: '#B87333',
  },
  {
    id: 'hoa-connect',
    name: 'HOA Connect',
    category: 'Platform & Brand',
    descriptor: 'A brand system and platform experience for community management.',
    status: 'In Progress',
    disciplines: ['Brand System', 'Platform UX', 'Web Design'],
    tint: '#6E6E73',
  },
  {
    id: 'greater-opportunities-2',
    name: 'Greater Opportunities 2.0',
    category: 'Website Redesign',
    descriptor: 'A full website redesign and brand refresh for a mission-driven organization.',
    status: 'In Progress',
    disciplines: ['Brand Refresh', 'Web Design', 'Content Strategy'],
    tint: '#D4A853',
  },
]

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
    category: 'Brand & Platform',
    descriptor: 'An all-in-one business-management platform — CRM, scheduling, projects, invoicing and AI, in one workspace.',
    status: 'In Progress',
    disciplines: ['Brand Identity', 'Product Design', 'Web App', 'AI'],
    tint: '#C4973B',
    image: 'https://app.earnest.guru/icon.png',
    to: 'https://earnest.guru',
  },
  {
    id: 'carddesk',
    name: 'CardDesk',
    category: 'Brand & App',
    descriptor: 'A companion app that turns networking into a game — digital business cards, streaks and XP that build real relationships.',
    status: 'In Progress',
    disciplines: ['Brand Identity', 'Product Design', 'PWA', 'AI'],
    tint: '#B87333',
    image: 'https://carddesk.earnest.guru/icons/icon-512.png',
    to: 'https://carddesk.earnest.guru',
  },
  {
    id: 'hoa-connect',
    name: 'HOA Connect',
    category: 'Brand & SaaS',
    descriptor: 'A multi-tenant platform for homeowners associations — community management, payments and resident communication in one branded experience, with bespoke sites for signature buildings.',
    status: 'In Progress',
    disciplines: ['Brand System', 'Product Design', 'Web App', 'AI'],
    tint: '#6E6E73',
    image: 'https://hoaconnect.info/images/hero-1033.webp',
    to: 'https://hoaconnect.info',
  },
  {
    id: 'greater-opportunities-2',
    name: 'Greater Opportunities 2.0',
    category: 'Web & Brand',
    descriptor: 'A ground-up website and brand refresh for a community-services nonprofit — making it radically simpler for residents to find the programs that help them.',
    status: 'In Progress',
    disciplines: ['Web Design', 'Brand Refresh', 'UX/UI'],
    tint: '#D4A853',
    image: 'https://new.greaterops.org/greater-ops-social.jpg',
  },
]

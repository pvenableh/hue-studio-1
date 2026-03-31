export interface DeliverableGroup {
  icon: string
  title: string
  items: string[]
}

export interface ServicePackage {
  id: string
  name: string
  tagline: string
  price: string
  featured: boolean
  bestFor: string
  groups: DeliverableGroup[]
}

export interface RetainerPlan {
  id: string
  name: string
  hours: string
  price: string
  description: string
  items: string[]
}

export interface AlacarteService {
  icon: string
  name: string
  price: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  subtitle: string
  description: string
  items: string[]
}

export interface ServiceDetail {
  id: string
  name: string
  slug: string
  tagline: string
  heroQuote: string
  timeline: string
  engagementType: string
  intro: string
  deliverables: { label: string; items: string[] }[]
  bestFor: { tag: string; title: string; description: string; highlighted?: boolean }[]
  process: { num: string; title: string; duration: string; description: string }[]
  industries: string[]
}

// ── THE REAL HUE PROCESS ─────────────────────────────────────────────────
// Sourced directly from huestudios.com — 4 stages: Understanding → Positioning → Brand Meaning → Big Idea
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understanding',
    subtitle: 'Analysis & Research',
    description: 'We begin with a deep analysis of your brand, market, and goals. No design decisions are made until we fully understand what we are solving for.',
    items: [
      'Marketing strategy & competitive analysis',
      'Trends, pricing & distribution review',
      'SWOT — strengths, weaknesses, opportunities, threats',
      'Target market, segments & stakeholder perceptions',
      'Vision, values, mission & culture',
      'Infrastructure & existing brand audit',
    ],
  },
  {
    number: '02',
    title: 'Positioning',
    subtitle: 'Strategy & Differentiation',
    description: 'We translate insight into strategy — defining how your brand occupies a distinct and valuable place in the mind of your audience.',
    items: [
      'Competitive advantage definition',
      'Brand strategy & differentiation framework',
      'Value proposition development',
      'Core values & brand attributes',
    ],
  },
  {
    number: '03',
    title: 'Brand Meaning',
    subtitle: 'Identity & Voice',
    description: 'This is where strategy becomes expression — the visual identity, voice, and essential idea that will carry your brand into the world.',
    items: [
      'Business category & central idea',
      'Unifying brand concept',
      'Voice, tone & key messages',
      'Visual identity direction',
    ],
  },
  {
    number: '04',
    title: 'The Big Idea',
    subtitle: 'Creative Execution',
    description: 'The culmination of everything — a single, powerful creative idea that defines who you are and guides every piece of communication you produce.',
    items: [
      'Brand identity system delivery',
      'Campaign concept & rollout',
      'All creative deliverables',
      'Brand standards guide',
    ],
  },
]

// ── SERVICE PACKAGES ──────────────────────────────────────────────────────
export const packages: ServicePackage[] = [
  {
    id: 'foundation',
    name: 'Brand Foundation',
    tagline: "Look like the company you're becoming",
    price: '$15,000',
    featured: false,
    bestFor: 'Companies establishing or refreshing their brand identity as they professionalize operations.',
    groups: [
      {
        icon: '◆',
        title: 'Brand Strategy & Positioning',
        items: ['Competitive landscape analysis', 'Core messaging framework', 'Tagline development', 'Brand voice definition'],
      },
      {
        icon: '○',
        title: 'Visual Identity System',
        items: ['Logo design + variations', 'Color palette & typography', 'Brand guidelines document'],
      },
      {
        icon: '□',
        title: 'Corporate Collateral',
        items: ['Business cards', 'Letterhead & envelopes', 'Email signature templates', 'PowerPoint / Keynote template'],
      },
    ],
  },
  {
    id: 'growth',
    name: 'Growth Engine',
    tagline: 'Capture and convert leads consistently',
    price: '$30,000',
    featured: true,
    bestFor: 'Companies ready to invest in scalable lead generation and a digital presence that converts.',
    groups: [
      { icon: '◆', title: 'Everything in Brand Foundation', items: [] },
      {
        icon: '□',
        title: 'Website Design & Development',
        items: ['Custom-built (not template)', 'Mobile-responsive design', 'SEO foundation', 'Content strategy & copywriting', 'CMS for easy self-management'],
      },
      {
        icon: '△',
        title: 'Lead Generation System',
        items: ['Landing page(s)', 'Email newsletter template', 'Drip campaign setup (3–5 emails)', 'CRM integration', 'Lead capture forms', 'Analytics & tracking setup'],
      },
    ],
  },
  {
    id: 'presence',
    name: 'Market Presence',
    tagline: 'Show up everywhere and dominate',
    price: '$50,000',
    featured: false,
    bestFor: 'Companies pursuing aggressive growth, preparing for exit, or competing at trade shows and industry events.',
    groups: [
      { icon: '◆', title: 'Everything in Growth Engine', items: [] },
      {
        icon: '△',
        title: 'Trade Show & Events',
        items: ['Booth design & production management', 'Banners, signage & displays', 'Leave-behind kits', 'Pre-show outreach campaign'],
      },
      {
        icon: '○',
        title: 'Sales Enablement',
        items: ['Capabilities brochure', 'Case study templates', 'Proposal & pitch deck template', 'Video brand story (2–3 min)', 'Sales one-pagers'],
      },
    ],
  },
]

// ── RETAINER PLANS ────────────────────────────────────────────────────────
export const retainerPlans: RetainerPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    hours: '10 hrs/mo',
    price: '$3,500/mo',
    description: 'For companies that need consistent creative support without a full-time hire.',
    items: ['10 creative hours monthly', 'Dedicated creative lead', 'Monthly strategy call', '48hr response SLA', 'All creative disciplines'],
  },
  {
    id: 'growth',
    name: 'Growth',
    hours: '20 hrs/mo',
    price: '$6,500/mo',
    description: 'For companies with ongoing campaigns, content needs, or multiple active projects.',
    items: ['20 creative hours monthly', 'Dedicated creative lead + support', 'Bi-weekly strategy calls', '24hr response SLA', 'Priority scheduling', 'Monthly performance review'],
  },
  {
    id: 'partner',
    name: 'Partner',
    hours: '40 hrs/mo',
    price: '$12,000/mo',
    description: 'Your embedded creative department — full strategic and executional support.',
    items: ['40 creative hours monthly', 'Full team access', 'Weekly strategy calls', 'Same-day response SLA', 'Quarterly brand review', 'Trade show & event planning', 'First access to new services'],
  },
]

// ── À LA CARTE ────────────────────────────────────────────────────────────
export const alacarteServices: AlacarteService[] = [
  { icon: 'lucide:palette', name: 'Logo Refresh', price: 'From $2,500', description: 'Modernize your existing mark without a full rebrand.' },
  { icon: 'lucide:layout', name: 'Landing Page', price: 'From $3,500', description: 'High-converting page for a campaign, launch, or offer.' },
  { icon: 'lucide:file-text', name: 'Pitch Deck', price: 'From $4,000', description: 'Investor or sales deck designed to close the room.' },
  { icon: 'lucide:video', name: 'Brand Video (2–3 min)', price: 'From $8,000', description: 'A brand story film, concept to delivery.' },
  { icon: 'lucide:printer', name: 'Trade Show Booth', price: 'From $6,000', description: 'Design + production management for your next event.' },
  { icon: 'lucide:bar-chart', name: 'Annual Report', price: 'From $5,000', description: 'Data-rich, designed for credibility with key stakeholders.' },
  { icon: 'lucide:mail', name: 'Email Campaign', price: 'From $1,500', description: 'Template design + 3-email drip sequence.' },
  { icon: 'lucide:search', name: 'Brand Analysis', price: 'Free', description: '8 questions, 15 min, custom presentation in 5 days.' },
]

// ── SERVICE DETAILS ───────────────────────────────────────────────────────
export const serviceDetails: ServiceDetail[] = [
  {
    id: 'branding',
    name: 'Brand Strategy & Identity',
    slug: 'brand-development-identity-design',
    tagline: 'All brilliant marketing begins with branding.',
    heroQuote: "We kept getting to the final round and losing. We knew the work was there — something else wasn't landing.",
    timeline: '6–12 weeks',
    engagementType: 'Project or Retainer',
    intro: 'At hue, we specialize in developing visual experiences from a branding perspective. Our inspiring, innovative, and strategic brand analysis process shapes the voice and visual identity that engages the target audience through unique design, creative content development, and visual excellence that pushes your brand into the world of your audience.',
    deliverables: [
      { label: 'Strategy & Positioning', items: ['Competitive landscape audit', 'Brand positioning statement', 'Audience definition', 'Messaging framework'] },
      { label: 'Visual Identity System', items: ['Logo suite (primary + variations)', 'Color palette', 'Typography system', 'Iconography & patterns'] },
      { label: 'Brand Standards Guide', items: ['Usage guidelines', "Do's and don'ts", 'Application examples', 'File library (all formats)'] },
      { label: 'Brand Voice & Copy', items: ['Tone of voice guide', 'Tagline development', 'Core messaging pillars', 'Elevator pitch'] },
      { label: 'Stationery & Collateral', items: ['Business card design', 'Letterhead & envelope', 'Email signature', 'Presentation template'] },
      { label: 'Launch Support', items: ['Rollout strategy', 'Social profile assets', 'Internal brand introduction', '30-day check-in'] },
    ],
    bestFor: [
      { tag: 'Most Common', title: "You're ready to rebrand.", description: 'Your brand was built early and fast. Now you are competing at a higher level and it is holding you back.', highlighted: true },
      { tag: 'Also Common', title: "You're launching something new.", description: 'A new company, product line, or market entry that needs to land with the right audience from day one.' },
      { tag: 'Enterprise', title: "You're scaling fast.", description: 'Your team is growing and the brand needs to be codified so it stays consistent across every touchpoint.' },
    ],
    process: [
      { num: '01', title: 'Discovery Session', duration: 'Week 1 · 2hr workshop', description: 'A structured conversation about your business, your audience, your competitors, and where you want to go.' },
      { num: '02', title: 'Strategic Brief', duration: 'Week 2', description: 'We translate discovery into a positioning document. You review and align before we touch a single design element.' },
      { num: '03', title: 'Creative Concepts', duration: 'Weeks 3–5', description: 'Two to three distinct creative directions — each grounded in strategy. Not options A, B, C but three different stories.' },
      { num: '04', title: 'Refinement', duration: 'Weeks 6–9', description: 'We develop the chosen direction to completion. Two rounds of refinement included.' },
      { num: '05', title: 'Delivery & Rollout', duration: 'Weeks 10–12', description: 'Full file handoff, brand standards guide, and a rollout plan. 30 days post-delivery support included.' },
    ],
    industries: ['Construction & Infrastructure', 'Fashion & Retail', 'Real Estate & Development', 'Professional Services', 'Food & Beverage'],
  },
  {
    id: 'digital',
    name: 'Digital & Web Design',
    slug: 'website-design-app-development',
    tagline: 'Built to convert, not just impress.',
    heroQuote: 'Our website was beautiful. It just wasn\'t bringing in business.',
    timeline: '8–14 weeks',
    engagementType: 'Project',
    intro: 'Your website is your best salesperson. We design and develop digital experiences built around the buyer journey — where they come from, what they need to see, and what makes them act. From full brand websites to app design, every project starts with strategy and ends with something that performs.',
    deliverables: [
      { label: 'Strategy & Architecture', items: ['User journey mapping', 'Sitemap & IA', 'SEO keyword foundation', 'Conversion rate strategy'] },
      { label: 'Design', items: ['Wireframes & prototypes', 'Full UI design system', 'Mobile-responsive layouts', 'Interaction design'] },
      { label: 'Development', items: ['Custom CMS (Directus)', 'Performance optimization', 'Analytics & tracking', 'Form & CRM integration'] },
      { label: 'Launch', items: ['QA & cross-browser testing', 'Staging & deployment', '30-day post-launch support', 'Training documentation'] },
    ],
    bestFor: [
      { tag: 'Most Common', title: 'Your site no longer reflects you.', description: 'You have outgrown your website. It does not match the caliber of your work or the clients you want to attract.', highlighted: true },
      { tag: 'Launch', title: 'You are starting fresh.', description: 'A new business, product, or market entry that needs a digital home built right from day one.' },
      { tag: 'Growth', title: 'Your site is not converting.', description: 'Traffic exists but leads are not coming in. The strategy and UX need a rebuild.' },
    ],
    process: [
      { num: '01', title: 'Discovery & Strategy', duration: 'Weeks 1–2', description: 'Stakeholder interviews, competitive research, and buyer journey mapping.' },
      { num: '02', title: 'Architecture & Wireframes', duration: 'Weeks 3–4', description: 'Sitemap, page structure, and wireframes. Signed off before design begins.' },
      { num: '03', title: 'UI Design', duration: 'Weeks 5–8', description: 'Full visual design system, desktop and mobile. Two rounds of revision.' },
      { num: '04', title: 'Development', duration: 'Weeks 9–12', description: 'Custom build, CMS integration, form handling, and analytics.' },
      { num: '05', title: 'Launch & Handoff', duration: 'Weeks 13–14', description: 'QA, deployment, training, and 30-day support window.' },
    ],
    industries: ['Construction & Infrastructure', 'Real Estate & Development', 'Professional Services', 'Technology', 'Arts & Nonprofit'],
  },
  {
    id: 'print',
    name: 'Print & Graphic Design',
    slug: 'print-production-graphic-design',
    tagline: 'Tangible brand moments that last.',
    heroQuote: 'The proposal package they sent us was so well designed, we almost felt bad saying no.',
    timeline: '2–6 weeks',
    engagementType: 'Project or Retainer',
    intro: 'In a digital-first world, a beautifully crafted physical piece stops people cold. We design print materials that carry the full weight of your brand — from the stationery a client receives on day one to campaign collateral that lives on a wall long after the event is over.',
    deliverables: [
      { label: 'Corporate Collateral', items: ['Business cards', 'Letterhead & envelopes', 'Folder systems', 'Branded stationery'] },
      { label: 'Marketing Materials', items: ['Brochures & sell sheets', 'Capabilities decks', 'Direct mail', 'Event programs'] },
      { label: 'Signage & Environmental', items: ['Trade show banners', 'Building & office signage', 'Vehicle wraps', 'Event environmental'] },
      { label: 'Production Management', items: ['Vendor selection', 'Print specification', 'Press proofing', 'Delivery coordination'] },
    ],
    bestFor: [
      { tag: 'Most Common', title: 'You have a major pitch coming.', description: 'A proposal package or capabilities brochure that needs to win the room before you say a word.', highlighted: true },
      { tag: 'Events', title: 'You have a trade show.', description: 'Booth materials, banners, and leave-behinds that stand out on the floor.' },
      { tag: 'Ongoing', title: 'You need a print retainer.', description: 'Regular collateral needs handled monthly.' },
    ],
    process: [
      { num: '01', title: 'Brief & Scope', duration: 'Day 1–3', description: 'Define the piece, the audience, the message, and the production requirements.' },
      { num: '02', title: 'Concept Design', duration: 'Week 1–2', description: 'Two design directions presented. You select and we refine.' },
      { num: '03', title: 'Refinement', duration: 'Week 2–3', description: 'Final design approved. Files prepped for production.' },
      { num: '04', title: 'Production', duration: 'Week 3–6', description: 'Vendor management, press proofing, and delivery coordination.' },
    ],
    industries: ['Construction & Infrastructure', 'Fashion & Retail', 'Professional Services', 'Food & Beverage', 'Arts & Nonprofit'],
  },
  {
    id: 'corporate',
    name: 'Corporate & Data Design',
    slug: 'corporate-presentation-data-reporting',
    tagline: 'Make your data do the talking.',
    heroQuote: "The numbers were there. The board just couldn't see them.",
    timeline: '2–4 weeks',
    engagementType: 'Project or Retainer',
    intro: 'Numbers tell stories — but only when they are designed to. We transform investor decks, annual reports, and data-heavy presentations into visually compelling documents that communicate clearly and command attention in the rooms that matter most.',
    deliverables: [
      { label: 'Investor Relations', items: ['Pitch decks', 'Investor updates', 'Annual reports', 'One-pagers'] },
      { label: 'Data Visualization', items: ['Infographics', 'Dashboard design', 'Chart & graph systems', 'Data storytelling'] },
      { label: 'Corporate Presentations', items: ['Board presentations', 'Keynote / PowerPoint templates', 'Conference decks', 'Internal reports'] },
      { label: 'Sales Enablement', items: ['RFP & proposal templates', 'Capabilities brochures', 'Case study documents', 'Competitive comparison sheets'] },
    ],
    bestFor: [
      { tag: 'Most Common', title: 'You have a critical presentation.', description: 'Board meeting, investor pitch, or major proposal that needs to land with precision.', highlighted: true },
      { tag: 'Ongoing', title: 'You produce regular reports.', description: 'Quarterly investor updates or annual reports done monthly on retainer.' },
      { tag: 'B2B', title: 'Your proposals are generic.', description: 'Proposal packages that look identical to every other firm in your space.' },
    ],
    process: [
      { num: '01', title: 'Content Audit', duration: 'Day 1–2', description: 'Review existing content, data sets, and objectives.' },
      { num: '02', title: 'Structure & Flow', duration: 'Week 1', description: 'Narrative arc, data hierarchy, and structure signed off.' },
      { num: '03', title: 'Design', duration: 'Week 2–3', description: 'Full visual design applied. Charts, infographics, layout completed.' },
      { num: '04', title: 'Final & Export', duration: 'Week 3–4', description: 'Final revisions, export in all required formats, editable master file delivered.' },
    ],
    industries: ['Professional Services', 'Technology', 'Real Estate & Development', 'Architecture & Engineering', 'Construction & Infrastructure'],
  },
  {
    id: 'events',
    name: 'Event Design & Production',
    slug: 'events',
    tagline: 'Experiences people remember — and talk about.',
    heroQuote: 'The event looked like us for the first time. People noticed.',
    timeline: '4–12 weeks',
    engagementType: 'Project',
    intro: 'From intimate brand activations to large-scale launch events, we handle the creative direction and production design that makes your event feel like an extension of your brand — not an afterthought. We have produced events for global fashion houses and regional nonprofits alike. The scale changes. The standard does not.',
    deliverables: [
      { label: 'Creative Direction', items: ['Event concept & theme', 'Creative brief & moodboard', 'Art direction on-site', 'Brand activation design'] },
      { label: 'Event Collateral', items: ['Invitations & save-the-dates', 'Programs & menus', 'Signage & wayfinding', 'Stage & set design'] },
      { label: 'Production Support', items: ['Vendor coordination', 'Print & fabrication management', 'Installation oversight', 'Post-event recap materials'] },
    ],
    bestFor: [
      { tag: 'Most Common', title: 'You have a product launch.', description: 'A launch event that needs to feel like your brand at its best — press, buyers, and partners all watching.', highlighted: true },
      { tag: 'Corporate', title: 'Annual conference or gala.', description: 'Full creative direction for a flagship company event with multiple branded touchpoints.' },
      { tag: 'Trade Show', title: 'You have a booth.', description: 'Trade show presence with booth design, signage, and collateral that stands out on the floor.' },
    ],
    process: [
      { num: '01', title: 'Concept & Brief', duration: 'Weeks 1–2', description: 'Event objectives, audience, creative concept, and production timeline agreed.' },
      { num: '02', title: 'Design', duration: 'Weeks 3–6', description: 'All creative assets designed — invitations, signage, environmental graphics.' },
      { num: '03', title: 'Production', duration: 'Weeks 6–10', description: 'Vendor coordination, print management, fabrication oversight.' },
      { num: '04', title: 'Event & Recap', duration: 'Event day + 1 week', description: 'On-site art direction and post-event recap materials.' },
    ],
    industries: ['Fashion & Retail', 'Professional Services', 'Arts & Nonprofit', 'Food & Beverage', 'Construction & Infrastructure'],
  },
  {
    id: 'video',
    name: 'Audio & Video Production',
    slug: 'video-audio-production',
    tagline: 'Your story, told with intention.',
    heroQuote: "Our video finally looks like the company we actually are.",
    timeline: '4–8 weeks',
    engagementType: 'Project',
    intro: 'Video is the most powerful tool in a brand\'s content arsenal — and the most often done cheaply. We produce brand films, campaign videos, and audio content that feel as considered as the rest of your identity. Every project starts with a clear creative brief and ends with content that performs.',
    deliverables: [
      { label: 'Pre-Production', items: ['Creative brief & concept', 'Script & storyboard', 'Location scouting', 'Talent & crew coordination'] },
      { label: 'Production', items: ['Professional video shoot', 'Brand film (2–3 min)', 'Testimonial capture', 'B-roll & product footage'] },
      { label: 'Post-Production', items: ['Editing & color grading', 'Motion graphics', 'Sound design & music licensing', 'Format delivery (web, social, broadcast)'] },
    ],
    bestFor: [
      { tag: 'Most Common', title: "You need a brand story film.", description: 'A 2–3 minute film that tells who you are, what you do, and why it matters. Lives on your homepage forever.', highlighted: true },
      { tag: 'Campaigns', title: 'You have a campaign launch.', description: 'Campaign video series for a product launch, event, or seasonal push.' },
      { tag: 'Social', title: 'You need consistent video content.', description: 'Monthly video production on retainer — interviews, case studies, behind the scenes.' },
    ],
    process: [
      { num: '01', title: 'Creative Brief', duration: 'Week 1', description: 'Objectives, audience, message, style reference, and production scope agreed.' },
      { num: '02', title: 'Pre-Production', duration: 'Weeks 2–3', description: 'Script, storyboard, casting, location, and crew lined up.' },
      { num: '03', title: 'Production', duration: 'Week 4', description: 'Shoot day(s) with professional crew. Directed by Hue creative lead.' },
      { num: '04', title: 'Post-Production', duration: 'Weeks 5–8', description: 'Edit, color, sound, motion graphics, and final delivery in all formats.' },
    ],
    industries: ['Fashion & Retail', 'Professional Services', 'Arts & Nonprofit', 'Construction & Infrastructure', 'Technology'],
  },
]

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((s) => s.slug === slug) ?? null
}

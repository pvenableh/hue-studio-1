export interface Industry {
  slug: string
  name: string
  shortName: string
  color: string
  headline: string
  description: string
  challenges: string[]
  solutions: string[]
  services: string[]
  clients: string[]
  quote?: { text: string; author: string }
}

export const industries: Industry[] = [
  {
    slug: 'government-community-development',
    name: 'Government & Community Development',
    shortName: 'Government',
    color: '#1B2A3D',
    headline: 'Mission-driven brands for the organizations shaping communities.',
    description: 'Government agencies, IDAs, regional boards, and community development organizations need brands that project credibility to external audiences while maintaining buy-in from complex internal governance structures. Hue has over thirteen years of continuous experience building brands and digital platforms for New York State economic development entities — from full agency rebrands to live data portals and sector-specific investment attraction campaigns.',
    challenges: [
      'Government acronym that communicates function but not mission or identity',
      'Multi-stakeholder governance that complicates brand decisions',
      'Digital platforms that don\'t match the sophistication of private-sector peers',
      'No system for sector-specific investment attraction or talent campaigns',
    ],
    solutions: [
      'Full rebrand from institutional acronym to authoritative, plain-language identity',
      'Brand and digital strategy that aligns diverse stakeholders under one voice',
      'Data-rich digital platforms with live mapping and sector visualization',
      'Campaign development across TV, radio, digital, print, and event experiences',
    ],
    services: ['Brand Strategy & Identity', 'Digital & Web Design', 'Corporate & Data Design', 'Audio & Video Production'],
    clients: ['The Agency · Broome County IDA/LDC', 'Southern Tier 8 Regional Board', 'Better Connection', 'So-Tier Regional Portal'],
    quote: { text: "We're walking into rooms we couldn't get into before.", author: 'Principal, The Agency — Broome County IDA' },
  },
  {
    slug: 'architecture-construction',
    name: 'Architecture & Construction',
    shortName: 'Architecture',
    color: '#2C3E50',
    headline: 'Design and build firms that look as good as the structures they create.',
    description: 'Architecture, engineering, and construction firms compete on reputation — yet most have brands that haven\'t evolved since the partnership was formed. We help AEC firms present the sophistication and capability that wins shortlists, attracts top talent, and commands premium fees.',
    challenges: [
      'Outdated brand that doesn\'t match the caliber of work',
      'Proposals and pitch decks that fail to differentiate',
      'Website that doesn\'t convert RFQ traffic into conversations',
      'Losing bids to less-experienced firms with better presentation',
    ],
    solutions: [
      'Brand identity that signals expertise and innovation',
      'Proposal and pitch deck templates that win shortlists',
      'Portfolio website built to convert visitors into leads',
      'Trade show booth design and conference collateral',
    ],
    services: ['Brand Strategy & Identity', 'Digital & Web Design', 'Corporate & Data Design', 'Print & Graphic Design'],
    clients: ['RKC Architecture & Design', 'Eljin Construction of New York', 'Omega Construction & Design', 'Killowen Construction, Inc.'],
    quote: { text: "We're walking into rooms we couldn't get into before.", author: 'Principal, Eljin Construction of New York' },
  },
  {
    slug: 'real-estate-development',
    name: 'Real Estate & Development',
    shortName: 'Real Estate',
    color: '#5D6D7E',
    headline: 'Sell the vision before the first shovel hits the ground.',
    description: 'Real estate developers and commercial brokerages need to market projects that don\'t yet exist. We create compelling brand experiences — from pre-development branding to lease-up campaigns — that help prospects see the opportunity and act on it.',
    challenges: [
      'Marketing properties before they\'re built',
      'Differentiating from competing developments',
      'Generating pre-lease and pre-sale commitments',
      'Maintaining brand consistency across project portfolios',
    ],
    solutions: [
      'Project branding and naming',
      'Pre-development marketing websites',
      'Brochures, fly sheets, and investor decks',
      'Signage and environmental graphics',
    ],
    services: ['Brand Strategy & Identity', 'Digital & Web Design', 'Print & Graphic Design', 'Corporate & Data Design'],
    clients: ['Water Works Realty', 'Dana Blair Designs'],
    quote: { text: 'The brand helped us close before we broke ground.', author: 'Principal, Water Works Realty' },
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    shortName: 'Professional',
    color: '#1A252F',
    headline: "Credibility is your currency. Make sure it's visible.",
    description: 'Law firms, consulting groups, financial advisors, and agencies compete on trust. Your brand needs to signal authority before the first meeting — and your materials need to perform in the room when it matters.',
    challenges: [
      'Looking identical to every other firm in your space',
      'Proposal packages that don\'t differentiate your expertise',
      'Website that doesn\'t generate qualified inbound leads',
      'No scalable system for thought leadership content',
    ],
    solutions: [
      'Distinctive identity that signals authority and credibility',
      'Proposal and pitch templates designed to win',
      'Lead-generating website with clear conversion architecture',
      'Retainer model for ongoing content and campaign support',
    ],
    services: ['Brand Strategy & Identity', 'Digital & Web Design', 'Corporate & Data Design', 'Print & Graphic Design'],
    clients: ['The Agency · Broome County IDA', 'Better Connection'],
    quote: { text: 'Hue repositioned how the market perceives us — and how we see ourselves.', author: 'Managing Partner' },
  },
  {
    slug: 'fashion-retail',
    name: 'Fashion & Retail',
    shortName: 'Fashion & Retail',
    color: '#1a1a1f',
    headline: 'Campaign design and brand identity that moves product and builds culture.',
    description: 'Fashion and retail brands live and die by their visual identity. We create campaign materials, event experiences, and brand systems that resonate with buyers, press, and consumers alike — from lookbook to launch.',
    challenges: [
      'Maintaining visual consistency across a growing brand',
      'Creating event experiences that generate press and social coverage',
      'Developing collateral that connects with retail buyers',
      'Building a brand that translates across digital and print',
    ],
    solutions: [
      'Brand identity and visual language systems',
      'Campaign design for seasonal launches',
      'Event branding and production design',
      'Press kits and retail buyer materials',
    ],
    services: ['Brand Strategy & Identity', 'Event Design & Production', 'Print & Graphic Design', 'Audio & Video Production'],
    clients: ['A|X Armani Exchange', 'Frayednot', 'Pepsi'],
    quote: { text: 'Three consecutive sellout events. The brand finally matched the product.', author: 'Director of Marketing, A|X Armani Exchange' },
  },
  {
    slug: 'technology-saas',
    name: 'Technology & SaaS',
    shortName: 'Technology',
    color: '#283747',
    headline: 'Translate technical excellence into business value.',
    description: 'Technology companies often speak only to engineers — missing the C-suite buyers who control budget decisions. We bridge that gap with messaging, design, and digital experiences that make your product\'s value undeniable to the people who matter.',
    challenges: [
      'Technical product wrapped in impenetrable jargon',
      'Long sales cycles because value isn\'t clear early',
      'Website that attracts engineers but not executives',
      'No consistent sales enablement materials',
    ],
    solutions: [
      'Messaging hierarchy: business value first, technical depth on demand',
      'Website redesign with progressive disclosure UX',
      'Sales decks and product one-pagers',
      'Demo environment UX and onboarding design',
    ],
    services: ['Brand Strategy & Identity', 'Digital & Web Design', 'Corporate & Data Design', 'Audio & Video Production'],
    clients: [],
    quote: { text: "Our sales cycle dropped 55% after we stopped leading with features.", author: 'VP Marketing, SaaS company' },
  },
  {
    slug: 'arts-nonprofit',
    name: 'Arts, Culture & Nonprofit',
    shortName: 'Nonprofit',
    color: '#2E4057',
    headline: 'Mission-driven brands that earn attention and inspire action.',
    description: 'Nonprofits and cultural organizations compete for attention, donors, and community trust. We create brands and campaigns that communicate your mission with clarity and emotion — earning the support your work deserves.',
    challenges: [
      'Communicating complex mission in compelling ways',
      'Competing for donor and grant attention',
      'Modernizing brand without losing established identity',
      'Low-budget, high-impact design needs',
    ],
    solutions: [
      'Mission-first brand identity and messaging',
      'Annual report and donor communication design',
      'Event materials and experiential design',
      'Digital presence and email campaign templates',
    ],
    services: ['Brand Strategy & Identity', 'Print & Graphic Design', 'Event Design & Production', 'Digital & Web Design'],
    clients: ['Binghamton Philharmonic Orchestra', 'Broome is Good', 'Bridge Run'],
    quote: { text: 'The rebrand helped us raise more in one gala than the previous three combined.', author: 'Executive Director' },
  },
  {
    slug: 'hospitality-events',
    name: 'Hospitality & Events',
    shortName: 'Hospitality',
    color: '#3D2C2E',
    headline: 'Brands that turn moments into memories — and guests into regulars.',
    description: 'Restaurants, hotels, venues, and event producers compete on experience. We create brand identities, environmental graphics, menus, and digital touchpoints that extend the hospitality you offer in person — so the first impression online matches the one guests get at the door.',
    challenges: [
      'Brand presence that doesn\'t match the in-person experience',
      'Event launches that fail to generate press and social momentum',
      'Menus, signage, and collateral that feel disconnected from the identity',
      'Booking and reservation flows that lose guests before they convert',
    ],
    solutions: [
      'Brand identity and visual systems built for hospitality settings',
      'End-to-end event design — from save-the-dates to on-site environment',
      'Menu, signage, and collateral systems that scale across locations',
      'Booking-first websites and digital touchpoints',
    ],
    services: ['Brand Strategy & Identity', 'Event Design & Production', 'Print & Graphic Design', 'Digital & Web Design'],
    clients: ['A|X Armani Exchange BeachDance', 'Bridge Run', 'Industry Summit', 'BPO Launch Event'],
    quote: { text: 'The experience started before anyone walked through the door — and never let up.', author: 'Director of Marketing, A|X Armani Exchange' },
  },
  {
    slug: 'marketing-communications',
    name: 'Marketing & Communications',
    shortName: 'Marketing',
    color: '#4A1E1E',
    headline: 'Campaigns and content that earn attention — and convert it.',
    description: 'Marketing teams, PR firms, and in-house communications leaders need creative partners who can move at the pace of the market. We bring brand-grade craft to campaigns, content, and collateral — so every send, post, and pitch lands with the same polish as your flagship work.',
    challenges: [
      'Producing on-brand campaign assets at the pace marketing actually moves',
      'Translating brand strategy into channel-ready creative',
      'Maintaining quality across paid, owned, and earned touchpoints',
      'Supporting in-house teams without losing brand cohesion',
    ],
    solutions: [
      'Campaign concepts and asset systems built for production scale',
      'Email, social, and ad creative that ladders up to brand',
      'Press kits, launch materials, and PR collateral',
      'Annual reports and corporate communications design',
    ],
    services: ['Brand Strategy & Identity', 'Print & Graphic Design', 'Digital & Web Design', 'Audio & Video Production'],
    clients: ['A|X Armani Exchange', 'The Agency · Broome County IDA', 'Bridge Run', 'Industry Summit'],
    quote: { text: 'Every channel landed in sync — no handoff drag, no brand drift.', author: 'Director of Communications' },
  },
]

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug) ?? null
}

export interface SlideAnimation {
  offset?: number     // px to travel (default: varies by element)
  duration?: number   // seconds (default: varies by element)
  delay?: number      // seconds delay before starting (default: staggered)
  ease?: string       // GSAP ease (default: 'power3.out')
}

export interface HeroSlide {
  id: string
  type: 'brand' | 'service' | 'video' | 'case-study' | 'promo'
  label: string
  title: string
  titleAccent: string // italic editorial font word
  description: string
  ctas: Array<{ text: string; to: string; style: 'primary' | 'secondary' }>
  background: {
    color: string
    image?: string       // Directus asset ID or URL — covers the hero
    overlay?: number     // overlay opacity 0–1 (default 0.6)
    gradient?: string    // optional CSS gradient
  }
  foreground?: {
    image?: string       // Directus asset ID or URL — positioned element
    position?: 'right' | 'center' | 'left'
    size?: 'contain' | 'large' | 'full'
  }
  /** Per-element animation speeds. Keys: label, title, sub, cta */
  animation?: {
    label?: SlideAnimation
    title?: SlideAnimation
    sub?: SlideAnimation
    cta?: SlideAnimation
  }
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'brand',
    type: 'brand',
    label: 'Brand Strategy & Creative Agency · Miami Beach & New York',
    title: 'Design with',
    titleAccent: 'Purpose.',
    description: 'Strategic brand positioning and creative execution for growth-stage companies. Built on 20 years of experience shaping brands that command attention and generate results.',
    ctas: [
      { text: 'Schedule a Discovery Call', to: '/contact', style: 'primary' },
      { text: 'View Packages & Pricing', to: '/creative-services', style: 'secondary' },
    ],
    background: {
      color: '#111111',
      image: '4a330103-c090-4dff-867f-3077f0470af9',
      overlay: 0.55,
    },
    animation: {
      label: { offset: 15, duration: 0.6 },
      title: { offset: 80, duration: 1.4, ease: 'power4.out' },
      sub: { offset: 40, duration: 0.9, delay: 0.3 },
      cta: { offset: 10, duration: 0.6, delay: 0.5 },
    },
  },
  {
    id: 'intelligence',
    type: 'service',
    label: 'Hue Intelligence',
    title: 'Your data,',
    titleAccent: 'working.',
    description: 'AI-powered intelligence and automation for growing organizations — built on your existing data, delivered by a boutique team that understands design as much as technology.',
    ctas: [
      { text: 'Explore Hue Intelligence', to: '/intelligence', style: 'primary' },
    ],
    background: {
      color: '#110F0A',
      gradient: 'radial-gradient(ellipse at 70% 40%, rgba(212, 151, 58, 0.06) 0%, transparent 60%)',
    },
    animation: {
      label: { offset: 20, duration: 0.5, ease: 'power2.out' },
      title: { offset: 90, duration: 1.4, ease: 'power4.out' },
      sub: { offset: 45, duration: 1.0, delay: 0.2 },
      cta: { offset: 15, duration: 0.7, delay: 0.4 },
    },
  },
  {
    id: 'the-agency',
    type: 'case-study',
    label: 'Case Study · Government & Community Development',
    title: 'The',
    titleAccent: 'Agency.',
    description: 'Rebranding the leading economic development organization in Broome County — from a forgotten acronym to the recognized face of regional growth.',
    ctas: [
      { text: 'View Case Study', to: '/case-studies/the-agency-case-study', style: 'primary' },
      { text: 'See All Case Studies', to: '/case-studies', style: 'secondary' },
    ],
    background: {
      color: '#1B2A3D',
      image: 'e6b13e25-0bb7-4f50-ac53-c39f934ac03f',
      overlay: 0.65,
    },
    animation: {
      label: { offset: 30, duration: 0.7 },
      title: { offset: 70, duration: 1.2, ease: 'power3.out' },
      sub: { offset: 45, duration: 0.9, delay: 0.15 },
      cta: { offset: 15, duration: 0.6, delay: 0.35 },
    },
  },
  {
    id: 'broome-is-good',
    type: 'video',
    label: 'Featured Work · Talent Attraction Campaign',
    title: 'Broome is',
    titleAccent: 'Good.',
    description: 'A lifestyle brand and talent attraction campaign that united eight municipalities under one name — launched with Super Bowl spots, documentary profiles, and a debut before Bon Jovi.',
    ctas: [
      { text: 'Watch the Work', to: '/case-studies/broome-is-good-case-study', style: 'primary' },
    ],
    background: {
      color: '#1A1A0F',
      image: '5ca81819-f9e7-4163-bb5a-eb674872618b',
      overlay: 0.6,
    },
    animation: {
      label: { offset: 20, duration: 0.5 },
      title: { offset: 90, duration: 1.5, ease: 'power4.out' },
      sub: { offset: 50, duration: 1.0, delay: 0.25 },
      cta: { offset: 12, duration: 0.6, delay: 0.5 },
    },
  },
  {
    id: 'brand-analysis',
    type: 'promo',
    label: 'Complimentary Brand Assessment',
    title: 'Is your brand',
    titleAccent: 'working?',
    description: '8 questions. 15 minutes. A clear-eyed assessment of where your brand stands and where it could go — delivered within 5 business days, at no cost.',
    ctas: [
      { text: 'Start Your Brand Analysis', to: '/brand-analysis', style: 'primary' },
    ],
    background: {
      color: '#111111',
      gradient: 'radial-gradient(ellipse at 30% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
    },
    animation: {
      label: { offset: 12, duration: 0.5 },
      title: { offset: 50, duration: 1.0 },
      sub: { offset: 30, duration: 0.7, delay: 0.2 },
      cta: { offset: 20, duration: 0.8, delay: 0.3, ease: 'power4.out' },
    },
  },
]

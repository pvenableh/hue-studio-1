import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5, viewport-fit=cover' },
        { name: 'theme-color', content: '#1d1d1f' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'hue: magazine', href: '/feed.xml' },
        { rel: 'alternate', type: 'text/plain', title: 'LLM info', href: '/llms.txt' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    directusStaticToken: process.env.DIRECTUS_STATIC_TOKEN || '',
    googleServiceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
    ga4PropertyId: process.env.GA4_PROPERTY_ID,
    analyticsPassword: process.env.ANALYTICS_PASSWORD,
    public: {
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL || 'https://admin.huestudios.company',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://huestudios.com',
    },
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/seo',
    'nuxt-gtag',
  ],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  site: {
    url: 'https://huestudios.com',
    name: 'Hue Studios — Branding, Web Design, and Creative Marketing Agency',
    description: 'Full-service creative marketing for growth-stage companies. Brand strategy, digital experience, and lead generation that drives real business outcomes.',
    defaultLocale: 'en',
  },

  // Google Analytics 4
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || '',
    initialConsent: true,
  },

  // OG Image generation
  ogImage: {
    defaults: {
      component: 'HueOg',
      width: 1200,
      height: 630,
    },
    fonts: ['Cormorant+Garamond:600', 'DM+Sans:400'],
  },

  // Sitemap — dynamic routes from Directus
  sitemap: {
    sources: ['/api/__sitemap'],
  },

  // Redirects
  routeRules: {
    '/brand-audit': { redirect: { to: '/brand-analysis', statusCode: 301 } },
    '/creative-design-portfolio/**': { redirect: { to: '/portfolio', statusCode: 301 } },
    '/new-york-city-design-construction-portfolio': { redirect: { to: '/portfolio', statusCode: 301 } },
    '/portfolio-showcase': { redirect: { to: '/portfolio', statusCode: 301 } },
    '/content/**': { redirect: { to: '/', statusCode: 301 } },
    '/domains/**': { redirect: { to: '/', statusCode: 301 } },
  },

  // Robots.txt
  robots: {
    disallow: ['/api/', '/_nuxt/'],
    groups: [
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'anthropic-ai', 'ClaudeBot', 'cohere-ai'],
        allow: ['/'],
        disallow: ['/api/', '/_nuxt/'],
      },
    ],
  },

  image: {
    domains: ['admin.huestudios.company'],
    formats: ['webp', 'jpg'],
  },

  fonts: {
    // Self-hosted fonts loaded via fonts.css — Avenir Next, Bauer Bodoni, Proxima Nova, Gaegu
    // DM Sans + Cormorant Garamond kept as Google Font fallbacks
    families: [
      { name: 'DM Sans', weights: [200, 300, 400, 500] },
      { name: 'Cormorant Garamond', weights: [400, 500], styles: ['normal', 'italic'] },
      { name: 'Syne', weights: [400, 500, 600, 700] },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    transpile: ['gsap'],
  },
})

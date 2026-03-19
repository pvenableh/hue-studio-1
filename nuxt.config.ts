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
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5, viewport-fit=cover' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
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
  ],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  site: {
    url: 'https://huestudios.com',
    name: 'Hue Creative Agency',
    description: 'Strategic brand positioning, lead generation, and creative execution for growth-stage B2B companies.',
    defaultLocale: 'en',
  },

  image: {
    domains: ['admin.huestudios.company'],
    formats: ['webp', 'jpg'],
  },

  fonts: {
    families: [
      { name: 'DM Sans', weights: [200, 300, 400, 500] },
      { name: 'Cormorant Garamond', weights: [400, 500], styles: ['normal', 'italic'] },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    transpile: ['gsap'],
  },
})

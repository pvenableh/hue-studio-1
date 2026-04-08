<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Strip the auto-appended site name — pages set their own full titles
useHead({
  titleTemplate: (title) => title || 'Hue Studios — Branding, Web Design, and Creative Marketing Agency',
})

// Global Schema.org — Organization, WebSite, LocalBusiness
useSchemaOrg([
  // --- Organization ---
  {
    '@type': 'Organization',
    '@id': 'https://huestudios.com/#organization',
    'name': 'Hue Studios',
    'url': 'https://huestudios.com',
    'logo': 'https://huestudios.com/icon-512x512.png',
    'description': 'Full-service brand strategy and digital experience firm. Woman-owned. Miami Beach and New York.',
    'email': 'contact@huestudios.com',
    'telephone': '+1-305-680-0485',
    'areaServed': ['Miami Beach, FL', 'New York, NY', 'United States'],
    'knowsAbout': [
      'Brand Strategy',
      'Web Design',
      'Digital Marketing',
      'Branding',
      'Video Production',
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '605 Lincoln Road, Suite 200',
      'addressLocality': 'Miami Beach',
      'addressRegion': 'FL',
      'postalCode': '33139',
      'addressCountry': 'US',
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-305-680-0485',
      'contactType': 'sales',
      'email': 'contact@huestudios.com',
    },
    'sameAs': [
      'https://twitter.com/hue_studios',
      'https://www.instagram.com/huestudios/',
      'https://www.facebook.com/huestudios',
      'https://www.youtube.com/@hueStudios',
    ],
  },

  // --- WebSite ---
  {
    '@type': 'WebSite',
    '@id': 'https://huestudios.com/#website',
    'name': 'Hue Studios',
    'url': 'https://huestudios.com',
  },

  // --- LocalBusiness: Miami Beach ---
  {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://huestudios.com/#localbusiness-miami',
    'name': 'Hue Studios',
    'parentOrganization': { '@id': 'https://huestudios.com/#organization' },
    'image': 'https://huestudios.com/icon-512x512.png',
    'url': 'https://huestudios.com',
    'telephone': '+1-305-680-0485',
    'email': 'contact@huestudios.com',
    'priceRange': '$$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '605 Lincoln Road, Suite 200',
      'addressLocality': 'Miami Beach',
      'addressRegion': 'FL',
      'postalCode': '33139',
      'addressCountry': 'US',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 25.7907,
      'longitude': -80.14,
    },
  },

  // --- LocalBusiness: New York ---
  {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://huestudios.com/#localbusiness-ny',
    'name': 'Hue Studios',
    'parentOrganization': { '@id': 'https://huestudios.com/#organization' },
    'url': 'https://huestudios.com',
    'telephone': '+1-305-680-0485',
    'email': 'contact@huestudios.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'New York',
      'addressRegion': 'NY',
      'addressCountry': 'US',
    },
  },
])
</script>

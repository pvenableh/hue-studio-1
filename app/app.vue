<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Global Schema.org — Organization, WebSite, LocalBusiness
useSchemaOrg([
  {
    '@type': 'Organization',
    'name': 'Hue Creative Agency',
    'url': 'https://huestudios.com',
    'logo': 'https://huestudios.com/icon-512x512.png',
    'description': 'Full-service brand strategy and digital experience firm. Woman-owned. Miami Beach and New York.',
    'email': 'contact@huestudios.com',
    'telephone': '+1-305-680-0485',
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
  {
    '@type': 'WebSite',
    'name': 'Hue Creative Agency',
    'url': 'https://huestudios.com',
  },
  {
    '@type': 'LocalBusiness',
    '@id': 'https://huestudios.com/#localbusiness',
    'name': 'Hue Creative Agency',
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
      'longitude': -80.1400,
    },
  },
])
</script>

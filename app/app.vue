<template>
  <div>
    <LayoutSiteNav />
    <main>
      <NuxtPage />
    </main>
    <LayoutSiteFooter />
  </div>
</template>

<script setup lang="ts">
// Global Schema.org — Organization
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
  },
])
</script>

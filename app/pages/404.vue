<template>
  <div class="flex min-h-[70vh] flex-col items-center justify-center px-2 md:px-6 text-center">
    <p class="hue-label mb-4">404</p>
    <h1 class="hue-display-lg mb-5">Page not found.</h1>
    <p class="hue-body mb-10 max-w-sm">The page you're looking for doesn't exist or has moved.</p>
    <div class="flex gap-4">
      <NuxtLink to="/" class="hue-btn">Back to Home <Icon name="lucide:arrow-right" class="size-3.5" /></NuxtLink>
      <NuxtLink to="/portfolio" class="hue-btn-outline">View Portfolio</NuxtLink>
    </div>
  </div>
</template>

<template>
  <div class="hue-article-body" v-html="content" />
</template>

<script setup lang="ts">
defineProps<{ content: string }>()
</script>

<style scoped>
.hue-article-body {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.85;
  color: var(--color-text-secondary);
}

.hue-article-body :deep(h2) {
  font-family: var(--font);
  font-weight: 300;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  color: var(--color-text);
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.hue-article-body :deep(h3) {
  font-family: var(--font);
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.3;
  color: var(--color-text);
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}

.hue-article-body :deep(p) {
  margin-bottom: 1.5rem;
}

.hue-article-body :deep(blockquote) {
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.5;
  color: var(--color-text);
  border-left: 2px solid var(--accent);
  padding-left: 1.5rem;
  margin: 2.5rem 0;
}

.hue-article-body :deep(ul),
.hue-article-body :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.hue-article-body :deep(li) {
  margin-bottom: 0.5rem;
}

.hue-article-body :deep(img) {
  width: 100%;
  border-radius: var(--radius);
  margin: 2rem 0;
}

.hue-article-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--duration) var(--ease);
}

.hue-article-body :deep(a:hover) {
  color: var(--accent-hover);
}

.hue-article-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--silk);
  margin: 3rem 0;
}

.hue-article-body :deep(figure) {
  margin: 2.5rem 0;
}

.hue-article-body :deep(figcaption) {
  font-size: 0.8125rem;
  color: var(--grey);
  margin-top: 0.5rem;
  text-align: center;
}
</style>

<template>
  <div
    :style="{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      backgroundColor: '#1d1d1f',
      fontFamily: 'DM Sans, sans-serif',
      color: '#ffffff',
    }"
  >
    <!-- Top: label + logo -->
    <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }">
      <div v-if="label" :style="{
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#C4973B',
      }">
        {{ label }}
      </div>
      <div v-else :style="{ height: '1px' }" />
      <div :style="{
        fontSize: '22px',
        fontWeight: 300,
        letterSpacing: '0.08em',
        color: '#C4973B',
        fontFamily: 'DM Sans, sans-serif',
      }">
        hue
      </div>
    </div>

    <!-- Middle: title + description -->
    <div :style="{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }">
      <h1 :style="{
        fontSize: title.length > 40 ? '52px' : '64px',
        fontWeight: 400,
        lineHeight: 1.15,
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        color: '#ffffff',
        margin: 0,
        maxWidth: '900px',
      }">
        {{ title }}
      </h1>
      <p v-if="description" :style="{
        fontSize: '18px',
        fontWeight: 400,
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.45)',
        marginTop: '20px',
        maxWidth: '700px',
      }">
        {{ truncatedDescription }}
      </p>
    </div>

    <!-- Bottom: accent line + site url -->
    <div>
      <div :style="{
        width: '48px',
        height: '2px',
        backgroundColor: '#C4973B',
        marginBottom: '20px',
      }" />
      <div :style="{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }">
        <span :style="{
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
        }">
          huestudios.com
        </span>
        <span :style="{
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.2)',
        }">
          Miami Beach · New York
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description?: string
  label?: string
}>(), {
  title: 'Hue — Creative Marketing Studio',
})

const truncatedDescription = computed(() => {
  if (!props.description) return ''
  return props.description.length > 120
    ? props.description.substring(0, 117) + '...'
    : props.description
})
</script>

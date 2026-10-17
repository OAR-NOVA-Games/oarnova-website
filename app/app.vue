<script setup lang="ts">
import archivo from '~/assets/fonts/archivo-display.woff2?url'
import vazirmatn from '~/assets/fonts/vazirmatn-text.woff2?url'

// Preload only the display face the first screen needs (it decides LCP); other subsets load on demand.
const { locale } = useLocale()
useHead(() => ({
  link: [{ rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: locale.value === 'fa' ? vazirmatn : archivo, key: 'font-preload' }],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

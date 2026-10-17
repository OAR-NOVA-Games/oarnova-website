<script setup lang="ts">
// Client-side navigation errors (e.g. an unknown /games/<slug>/) render the same 404 view.
defineProps<{ error: { statusCode?: number } }>()
</script>

<template>
  <NuxtLayout>
    <NotFound />
  </NuxtLayout>
</template>

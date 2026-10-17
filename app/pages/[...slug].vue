<script setup lang="ts">
// Unknown paths. Prerendered at /__not-found__/ and /fa/__not-found__/, then published as
// /404.html and /fa/404.html by scripts/postbuild.mjs for the static server's error handler.
definePageMeta({ notFound: true })
</script>

<template>
  <NotFound />
</template>

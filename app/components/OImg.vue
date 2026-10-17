<script setup lang="ts">
import type { Image } from '~/content/games'

// Thin <img> wrapper: intrinsic size always set (no layout shift), optional 2x rendition.
const props = defineProps<{ image: Image; alt: string; eager?: boolean; sizes?: string }>()
const srcset = computed(() => (props.image.src2x ? `${props.image.src} ${props.image.width}w, ${props.image.src2x} ${props.image.width * 2}w` : undefined))
</script>

<template>
  <img
    :src="image.src"
    :srcset="srcset"
    :sizes="srcset ? (sizes ?? `${image.width}px`) : undefined"
    :width="image.width"
    :height="image.height"
    :alt="alt"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
  />
</template>

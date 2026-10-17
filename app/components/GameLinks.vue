<script setup lang="ts">
import type { Game } from '~/content/games'

// Internal story link + the permanent external destination from content/games.ts.
const props = defineProps<{ game: Game; externalOnly?: boolean }>()
const { t, link, locale } = useLocale()
const discover = computed(() => `${t.value.home.discover} ${props.game.name[locale.value]}`)
</script>

<template>
  <div class="links">
    <NuxtLink v-if="!externalOnly" :to="link(`/games/${game.slug}/`)" class="cta">
      {{ discover }} <span class="arrow" aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span>
    </NuxtLink>
    <a :href="game.url" class="cta ext" target="_blank" rel="noopener" :data-game-url="game.slug">
      <span>
        <span class="sr-only">{{ t.officialSite }}: </span>
        <span dir="ltr">{{ game.host }}</span>
        <span class="sr-only"> ({{ t.opensNewTab }})</span>
      </span>
      <span class="arrow" aria-hidden="true">↗</span>
    </a>
  </div>
</template>

<style scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 40px;
}
.ext {
  text-transform: none;
  letter-spacing: 0.04em;
  font-weight: 600;
  opacity: 0.85;
}
html[dir='rtl'] .ext {
  font-family: var(--font-sans);
  font-size: 13px;
}
</style>

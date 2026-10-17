<script setup lang="ts">
import type { Game } from '~/content/games'

defineProps<{ game: Game; category: string }>()
const { t, locale, num } = useLocale()
</script>

<template>
  <div class="head">
    <p class="meta label">
      <b>{{ num(game.index) }} / {{ game.name[locale] }}</b>
      <span>{{ category }}</span>
    </p>
    <span class="status-chip">{{ t.status[game.status] }}</span>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}
.label {
  display: grid;
  gap: 4px;
  opacity: 0.85;
}
</style>

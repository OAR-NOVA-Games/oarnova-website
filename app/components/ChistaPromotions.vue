<script setup lang="ts">
// Public CHISTA gifts and offers (read from the same-origin feed after render). Visitors copy a publicly shareable
// code, open the game and redeem it in Profile › Gift code. Private one-time codes never reach this site.
import { games } from '~/content/games'
import type { PublicPromotion } from '~/content/promotions'

const { t, locale } = useLocale()
const state = usePromotions()
const copied = ref<string | null>(null)
const gameUrl = games.chista.url

const formatter = computed(
  () => new Intl.DateTimeFormat(locale.value === 'fa' ? 'fa-IR' : 'en-GB', { timeZone: 'Asia/Tehran', day: 'numeric', month: 'long', year: 'numeric' }),
)
const when = (iso: string) => formatter.value.format(new Date(iso))
/** English pages fall back to the Persian text (marked as Persian) when the campaign has no English title. */
const titleOf = (p: PublicPromotion) => (locale.value === 'en' && p.title.en ? { text: p.title.en, lang: 'en' } : { text: p.title.fa, lang: 'fa' })
const descriptionOf = (p: PublicPromotion) =>
  locale.value === 'en' && p.description.en ? { text: p.description.en, lang: 'en' } : p.description.fa ? { text: p.description.fa, lang: 'fa' } : null

async function copy(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = code
    setTimeout(() => {
      if (copied.value === code) copied.value = null
    }, 2500)
  } catch {
    // Clipboard blocked: the code stays selectable on screen.
    copied.value = null
  }
}
</script>

<template>
  <section
    v-if="(state.status === 'ready' && state.items.length) || state.status === 'unavailable'"
    class="promos wrap"
    aria-labelledby="promos-title"
    data-testid="chista-promotions"
  >
    <h2 id="promos-title" class="meta">{{ t.promotions.title }}</h2>
    <p v-if="state.status === 'unavailable'" class="note" data-testid="promotions-unavailable">
      {{ t.promotions.unavailable }}
      <a :href="gameUrl" target="_blank" rel="noopener">{{ t.promotions.open }}</a>
    </p>
    <template v-else-if="state.status === 'ready'">
      <p class="intro">{{ t.promotions.intro }}</p>
      <ul class="cards">
        <li v-for="p in state.items" :key="p.id" class="card" :data-testid="`promotion-${p.id}`">
          <p class="chips">
            <span class="chip">{{ t.promotions.types[p.type] }}</span>
            <span class="chip" :class="{ live: p.state === 'ACTIVE' && !p.soldOut }">{{
              p.soldOut ? t.promotions.soldOut : p.state === 'ACTIVE' ? t.promotions.active : t.promotions.soon
            }}</span>
          </p>
          <h3 :lang="titleOf(p).lang" :dir="titleOf(p).lang === 'fa' ? 'rtl' : 'ltr'">{{ titleOf(p).text }}</h3>
          <p v-if="descriptionOf(p)" class="desc" :lang="descriptionOf(p)!.lang" :dir="descriptionOf(p)!.lang === 'fa' ? 'rtl' : 'ltr'">
            {{ descriptionOf(p)!.text }}
          </p>
          <p class="dates">
            <template v-if="p.state === 'SCHEDULED'">{{ t.promotions.from }} {{ when(p.startsAt) }}</template>
            <template v-else-if="p.endsAt">{{ t.promotions.until }} {{ when(p.endsAt) }}</template>
            <template v-else>{{ t.promotions.noEnd }}</template>
          </p>
          <div v-if="p.code && !p.soldOut" class="code">
            <span class="meta">{{ t.promotions.codeLabel }}</span>
            <code dir="ltr" translate="no" :data-testid="`promotion-code-${p.id}`">{{ p.code }}</code>
            <button type="button" class="copy" :data-testid="`promotion-copy-${p.id}`" @click="copy(p.code)">
              {{ copied === p.code ? t.promotions.copied : t.promotions.copy }}
            </button>
            <span class="sr-only" role="status" aria-live="polite">{{ copied === p.code ? t.promotions.copied : '' }}</span>
          </div>
          <p class="hint">{{ t.promotions.redeemHint }}</p>
          <a class="open" :href="gameUrl" target="_blank" rel="noopener" :data-testid="`promotion-open-${p.id}`">{{ t.promotions.open }}</a>
        </li>
      </ul>
    </template>
  </section>
</template>

<style scoped>
.promos {
  padding-block: 56px 24px;
}
.intro,
.note {
  max-width: 62ch;
  margin-top: 12px;
  color: var(--soft);
}
.note a,
.open {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 0.25em;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 20px;
  margin-top: 28px;
  padding: 0;
  list-style: none;
}
.card {
  display: grid;
  gap: 10px;
  align-content: start;
  padding: 22px;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  border-radius: 14px;
  background: color-mix(in srgb, var(--bg) 85%, #000);
}
.card h3 {
  font-size: 1.35rem;
  line-height: 1.35;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  padding: 2px 10px;
  border: 1px solid color-mix(in srgb, var(--fg) 30%, transparent);
  border-radius: 999px;
  font-size: 0.8rem;
}
.chip.live {
  border-color: var(--accent);
  color: var(--accent);
}
.desc,
.dates,
.hint {
  color: var(--soft);
}
.dates,
.hint {
  font-size: 0.9rem;
}
.code {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.code code {
  padding: 6px 12px;
  border: 1px dashed var(--accent);
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  user-select: all;
}
.copy {
  min-height: 44px;
  padding-inline: 16px;
  border: 1px solid var(--accent);
  border-radius: 999px;
  background: transparent;
  color: var(--fg);
  font: inherit;
  cursor: pointer;
}
.copy:hover {
  background: color-mix(in srgb, var(--accent) 18%, transparent);
}
.copy:focus-visible,
.open:focus-visible,
.note a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.open {
  justify-self: start;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
</style>

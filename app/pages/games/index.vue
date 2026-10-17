<script setup lang="ts">
import { gameList } from '~/content/games'

const { t, link, locale, num } = useLocale()
const root = ref<HTMLElement | null>(null)

useSeo(() => ({ title: t.value.seo.games.title, description: t.value.seo.games.description, path: '/games/' }))

useMotion(root, ({ gsap }) => {
  gsap.fromTo('.g-line > span', { yPercent: 108 }, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.1 })
  gsap.utils.toArray<HTMLElement>('.row').forEach((row) => {
    gsap.fromTo(
      row,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: row, start: 'top 88%', once: true } },
    )
  })
})
</script>

<template>
  <div ref="root">
    <header class="intro wrap">
      <p class="eyebrow label">{{ t.games.label }}</p>
      <h1 class="display title">
        <span v-for="(l, i) in t.games.title" :key="i" class="g-line"
          ><span>{{ l }}</span></span
        >
      </h1>
      <p class="lede">{{ t.games.intro }}</p>
    </header>

    <ol class="rows">
      <li v-for="g in gameList" :key="g.slug" class="row" :class="g.slug">
        <div class="row-inner wrap">
          <span class="num display" aria-hidden="true">{{ num(g.index) }}</span>
          <div class="main">
            <h2 class="display name">
              <NuxtLink :to="link(`/games/${g.slug}/`)" class="name-link">{{ g.name[locale] }}</NuxtLink>
            </h2>
            <p class="accent line">{{ t.home.chapters[g.slug].tagline }}</p>
          </div>
          <div class="side">
            <span class="status-chip">{{ t.status[g.status] }}</span>
            <dl class="facts">
              <template v-for="f in g.facts[locale].slice(0, 3)" :key="f.label">
                <dt class="meta">{{ f.label }}</dt>
                <dd>{{ f.value }}</dd>
              </template>
            </dl>
            <GameLinks :game="g" />
          </div>
          <OImg class="logo" :image="g.logo" :alt="g.logoAlt[locale]" sizes="200px" />
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.intro {
  padding-block: clamp(72px, 9vw, 140px) clamp(56px, 6vw, 96px);
}
.label {
  color: var(--color-cyan);
  margin-bottom: 36px;
}
.title {
  font-size: clamp(64px, 9.6vw, 172px);
}
html[lang='fa'] .title {
  font-size: clamp(52px, 7vw, 124px);
}
.g-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.03em;
}
.g-line > span {
  display: block;
}
.g-line:nth-child(2) {
  color: var(--color-mute);
  padding-inline-start: 0.5em;
}
.lede {
  margin-top: 40px;
  max-width: 560px;
  color: #c8c5bb;
  font-size: 17px;
}
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
}
.row {
  position: relative;
  overflow: hidden;
}
.row.dooma {
  background: var(--color-dooma);
  color: var(--color-dooma-text);
}
.row.chista {
  background:
    linear-gradient(90deg, rgb(7 21 38 / 0.96) 35%, rgb(7 21 38 / 0.55)),
    url('/media/chista/night-960.webp') center / cover,
    var(--color-chista);
  color: var(--color-chista-text);
}
html[dir='rtl'] .row.chista {
  background:
    linear-gradient(-90deg, rgb(7 21 38 / 0.96) 35%, rgb(7 21 38 / 0.55)),
    url('/media/chista/night-960.webp') center / cover,
    var(--color-chista);
}
.row.yarizan {
  background: var(--color-yz-paper);
  color: var(--color-yz-petrol);
}
.row-inner {
  display: grid;
  grid-template-columns: 90px 1.4fr 1fr 200px;
  gap: 32px;
  align-items: center;
  padding-block: 64px;
}
.num {
  font-size: 56px;
  opacity: 0.5;
  align-self: start;
}
.name {
  font-size: clamp(80px, 10vw, 180px);
}
html[lang='fa'] .name {
  font-size: clamp(64px, 7.4vw, 132px);
}
.name-link {
  transition: opacity 0.3s;
}
.name-link::after {
  content: '';
  position: absolute;
  inset: 0;
}
.name-link:hover {
  opacity: 0.8;
}
.line {
  font-size: clamp(22px, 2vw, 32px);
  margin-top: 8px;
}
.chista .line {
  color: var(--color-chista-gold);
}
.yarizan .num {
  opacity: 0.8;
}
.yarizan .line {
  color: var(--color-yz-teal);
}
.dooma .line {
  color: #cfe9ea;
}
.side {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 20px;
  justify-items: start;
}
.facts {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 18px;
}
.facts dt {
  opacity: 0.75;
  padding-top: 4px;
}
.facts dd {
  margin: 0;
}
.logo {
  width: 100%;
  height: auto;
  max-width: 200px;
  justify-self: end;
}
@media (max-width: 1100px) {
  .row-inner {
    grid-template-columns: 60px 1fr 160px;
  }
  .side {
    grid-column: 2 / -1;
  }
  .logo {
    grid-row: 1;
    grid-column: 3;
  }
}
@media (max-width: 767px) {
  .row-inner {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-block: 48px;
  }
  .num {
    font-size: 36px;
  }
  .side,
  .logo {
    grid-column: auto;
    grid-row: auto;
  }
  .logo {
    justify-self: start;
    max-width: 150px;
  }
  .name {
    font-size: clamp(72px, 22vw, 112px);
  }
  html[lang='fa'] .name {
    font-size: clamp(60px, 18vw, 92px);
  }
}
</style>

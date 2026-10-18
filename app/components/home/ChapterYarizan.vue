<script setup lang="ts">
import { games } from '~/content/games'

const game = games.yarizan
const { t, locale } = useLocale()
const c = computed(() => t.value.home.chapters.yarizan)
const root = ref<HTMLElement | null>(null)
const grades = computed(() => (locale.value === 'fa' ? ['۱', '۲', '۳', '۴', '۵', '۶'] : ['1', '2', '3', '4', '5', '6']))

// YariZan is the warm turn of the page: sheets fan out like a book being opened,
// the grade tabs slide out one by one. Bright, quick, never jittery.
useMotion(root, ({ gsap, compact }) => {
  const tl = gsap.timeline({ scrollTrigger: { trigger: '.y-book', start: 'top 75%', once: true } })
  tl.fromTo('.y-sheet', { rotate: 0, x: 0, y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' })
    .to('.y-sheet.s1', { rotate: compact ? -4 : -7, x: compact ? -10 : -26, duration: 1, ease: 'expo.out' }, 0.5)
    .to('.y-sheet.s2', { rotate: compact ? 3 : 5, x: compact ? 8 : 18, duration: 1, ease: 'expo.out' }, 0.55)
    .fromTo('.y-tab', { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.6)' }, 0.75)
    .fromTo('.y-logo', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out' }, 0.6)

  gsap.fromTo(
    '.y-title > span',
    { yPercent: 105 },
    { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.08, scrollTrigger: { trigger: '.y-title', start: 'top 85%', once: true } },
  )
  gsap.fromTo(
    '.y-copy > *',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.y-copy', start: 'top 90%', once: true } },
  )
})
</script>

<template>
  <article id="yarizan" ref="root" class="chapter yarizan" aria-labelledby="yarizan-title">
    <div class="inner wrap">
      <ChapterHead :game="game" :category="c.category" />

      <div class="y-book" aria-hidden="true">
        <div class="y-sheet s1" />
        <div class="y-sheet s2" />
        <div class="y-sheet s3">
          <ul class="y-tabs">
            <li v-for="(g, i) in grades" :key="g" class="y-tab" :data-i="i">{{ g }}</li>
          </ul>
        </div>
      </div>
      <img
        class="y-logo"
        src="/media/yarizan/logo-primary-512.webp"
        srcset="/media/yarizan/logo-primary-512.webp 512w, /media/yarizan/logo-primary-1024.webp 1024w"
        sizes="(max-width: 767px) 46vw, 260px"
        width="512"
        height="600"
        :alt="game.logoAlt[locale]"
        loading="lazy"
        decoding="async"
      />

      <h2 id="yarizan-title" class="display y-title">
        <span>{{ game.name[locale] }}</span>
        <span class="accent tagline">{{ c.tagline }}</span>
      </h2>
      <div class="y-copy">
        <p class="body">{{ c.body }}</p>
        <GameLinks :game="game" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.yarizan {
  position: relative;
  overflow: hidden;
  background: radial-gradient(60% 60% at 80% 35%, rgb(255 196 59 / 0.16), transparent 70%), var(--color-yz-paper);
  color: var(--color-yz-petrol);
}
.yarizan :deep(.head) {
  color: #2b4a5e;
}
.inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  grid-template-rows: auto 1fr auto;
  column-gap: 6%;
  padding-block: 72px 112px;
  min-height: 900px;
}
.inner > :deep(.head) {
  grid-column: 1 / -1;
}
.y-book {
  grid-column: 2;
  grid-row: 2 / 4;
  align-self: center;
  justify-self: center;
  position: relative;
  width: min(380px, 100%);
  aspect-ratio: 0.74;
  margin-top: 40px;
}
.y-sheet {
  position: absolute;
  inset: 0;
  background: var(--color-yz-sheet);
  border: 1px solid rgb(6 63 115 / 0.12);
  box-shadow: 0 30px 60px -30px rgb(6 63 115 / 0.35);
}
.y-sheet.s1 {
  background: #f6e7c4;
  transform: rotate(-7deg) translateX(-26px);
}
.y-sheet.s2 {
  background: #e4f1ec;
  transform: rotate(5deg) translateX(18px);
}
.y-tabs {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  inset-inline-start: 100%;
  top: 12%;
  display: grid;
  gap: 6px;
}
.y-tab {
  width: 40px;
  height: 44px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 15px;
  color: #fff;
  background: var(--color-yz-teal);
}
.y-tab[data-i='1'],
.y-tab[data-i='4'] {
  background: #c9472f;
}
.y-tab[data-i='2'],
.y-tab[data-i='5'] {
  background: var(--color-yz-petrol);
}
.y-logo {
  grid-column: 2;
  grid-row: 2 / 4;
  align-self: center;
  justify-self: center;
  width: min(250px, 62%);
  height: auto;
  position: relative;
  z-index: 2;
  margin-top: 40px;
}
.y-title {
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  font-size: clamp(100px, 14vw, 250px);
  overflow: hidden;
  padding-bottom: 0.05em;
}
.y-title > span {
  display: block;
}
.tagline {
  color: var(--color-yz-teal);
  font-size: 0.22em;
  line-height: 1.1;
  margin-top: 0.15em;
}
html[lang='fa'] .y-title {
  font-size: clamp(92px, 11vw, 196px);
}
html[lang='fa'] .tagline {
  font-size: 0.22em;
  line-height: 1.6;
}
.y-copy {
  grid-column: 1;
  grid-row: 3;
  margin-top: 36px;
  max-width: 470px;
}
.body {
  color: #31485a;
  margin-bottom: 18px;
}
@media (max-width: 1023px) {
  .inner {
    min-height: 0;
  }
}
@media (max-width: 767px) {
  .inner {
    display: flex;
    flex-direction: column;
    padding-block: 40px 84px;
  }
  .y-book {
    order: 2;
    width: 62%;
    margin: 48px auto 0;
  }
  /* Centred on the book: the book is 62% wide and 62% / 0.74 tall, the logo 40% wide
     and 40% * 600 / 512 tall (percent margins resolve against the column width). */
  .y-logo {
    order: 3;
    align-self: center;
    width: 40%;
    margin-top: calc(-62% / 0.74 + (62% / 0.74 - 40% * 600 / 512) / 2);
    margin-bottom: calc(26% + 62% / 0.74 - 62% - (62% / 0.74 - 40% * 600 / 512) / 2);
  }
  .y-tab {
    width: 32px;
    height: 36px;
    font-size: 13px;
  }
  .y-title {
    align-self: auto;
    order: 4;
    font-size: clamp(76px, 23vw, 120px);
  }
  html[lang='fa'] .y-title {
    font-size: clamp(76px, 22vw, 108px);
  }
  .tagline {
    font-size: 0.27em;
  }
  .y-copy {
    order: 5;
  }
}
</style>

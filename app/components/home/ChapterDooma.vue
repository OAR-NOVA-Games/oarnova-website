<script setup lang="ts">
import { games } from '~/content/games'

const game = games.dooma
const { t, locale } = useLocale()
const c = computed(() => t.value.home.chapters.dooma)
const root = ref<HTMLElement | null>(null)

// Dooma moves like a board game: the field is cut open on a diagonal, the grid is
// drawn cell by cell, and the official logo lands on the board without rotating.
useMotion(root, ({ gsap, compact }) => {
  const tl = gsap.timeline({ scrollTrigger: { trigger: root.value, start: 'top 62%', once: true } })
  tl.fromTo(
    '.d-field',
    { clipPath: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)' },
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.3, ease: 'power3.inOut' },
  )
    .fromTo('.d-grid line', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: 'power2.out' }, 0.45)
    .fromTo('.d-node', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, 0.9)
    .fromTo('.d-logo', { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out' }, 0.95)

  gsap.fromTo(
    '.d-title > span',
    { yPercent: 105 },
    { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.08, scrollTrigger: { trigger: '.d-title', start: 'top 85%', once: true } },
  )
  gsap.fromTo(
    '.d-copy > *',
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.d-copy', start: 'top 88%', once: true } },
  )
  if (!compact) {
    gsap.fromTo(
      '.d-field img',
      { yPercent: -4 },
      { yPercent: 4, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 0.7 } },
    )
  }
})
</script>

<template>
  <article id="dooma" ref="root" class="chapter dooma" aria-labelledby="dooma-title">
    <div class="grain" />
    <div class="inner wrap">
      <ChapterHead :game="game" :category="c.category" />

      <div class="board" aria-hidden="true">
        <div class="d-field">
          <img
            src="/media/dooma/field-941.webp"
            srcset="/media/dooma/field-480.webp 480w, /media/dooma/field-941.webp 941w"
            sizes="(max-width: 767px) 90vw, 46vw"
            width="941"
            height="1672"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <svg class="d-grid" viewBox="0 0 300 300" preserveAspectRatio="none">
          <line x1="100" y1="0" x2="100" y2="300" pathLength="1" />
          <line x1="200" y1="0" x2="200" y2="300" pathLength="1" />
          <line x1="0" y1="100" x2="300" y2="100" pathLength="1" />
          <line x1="0" y1="200" x2="300" y2="200" pathLength="1" />
        </svg>
        <i class="d-node n1" /><i class="d-node n2" /><i class="d-node n3" />
      </div>
      <OImg class="d-logo" :image="game.logo" :alt="game.logoAlt[locale]" sizes="(max-width: 767px) 200px, 300px" />

      <h2 id="dooma-title" class="display d-title">
        <span>{{ game.name[locale] }}</span>
        <span class="accent tagline">{{ c.tagline }}</span>
      </h2>
      <div class="d-copy">
        <p class="body">{{ c.body }}</p>
        <GameLinks :game="game" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.dooma {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(180deg, transparent 70%, var(--color-dooma) 100%), repeating-linear-gradient(90deg, rgb(92 200 216 / 0.035) 0 1px, transparent 1px 96px),
    repeating-linear-gradient(0deg, rgb(92 200 216 / 0.035) 0 1px, transparent 1px 96px), var(--color-dooma);
  color: var(--color-dooma-text);
}
.inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  grid-template-rows: auto 1fr auto auto;
  column-gap: 6%;
  padding-block: 72px 112px;
  min-height: 920px;
}
.inner > :deep(.head) {
  grid-column: 1 / -1;
}
.board {
  grid-column: 2;
  grid-row: 2 / 5;
  position: relative;
  align-self: center;
  aspect-ratio: 1;
  width: 100%;
  max-width: 620px;
  justify-self: end;
  margin-top: 40px;
}
.d-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  border: 1px solid rgb(92 200 216 / 0.28);
  /* 45° cut: the one decorative corner allowed by the Dooma identity kit. */
  mask: linear-gradient(225deg, transparent 38px, #000 38px);
}
.d-field img {
  width: 100%;
  height: 128%;
  margin-top: -14%;
  object-fit: cover;
  object-position: 50% 30%;
}
.d-grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.d-grid line {
  stroke: rgb(92 200 216 / 0.42);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 1;
}
.d-node {
  position: absolute;
  width: 12px;
  height: 12px;
  margin: -6px;
  background: var(--color-dooma-edge);
  transform: rotate(45deg);
}
.d-node.n1 {
  left: 33.33%;
  top: 33.33%;
}
.d-node.n2 {
  left: 66.66%;
  top: 66.66%;
}
.d-node.n3 {
  left: 66.66%;
  top: 33.33%;
  background: var(--color-gold);
}
.d-logo {
  grid-column: 2;
  grid-row: 2 / 5;
  align-self: center;
  justify-self: center;
  width: min(300px, 48%);
  height: auto;
  position: relative;
  z-index: 2;
  margin-top: 40px;
  filter: drop-shadow(0 30px 40px rgb(0 0 0 / 0.45));
}
.d-title {
  grid-column: 1;
  grid-row: 2;
  align-self: end;
  font-size: clamp(110px, 15.5vw, 280px);
  position: relative;
  z-index: 3;
}
.d-title > span {
  display: block;
}
.d-title {
  overflow: hidden;
  padding-bottom: 0.06em;
}
.tagline {
  font-size: 0.205em;
  line-height: 1.12;
  margin-top: 0.18em;
  color: #cfe9ea;
  max-width: 13ch;
}
html[lang='fa'] .d-title {
  font-size: clamp(96px, 12vw, 210px);
}
html[lang='fa'] .tagline {
  font-size: 0.2em;
  line-height: 1.6;
  max-width: 24ch;
}
.d-copy {
  grid-column: 1;
  grid-row: 3;
  margin-top: 40px;
  max-width: 470px;
}
.body {
  color: #c4d6d6;
  margin-bottom: 18px;
}
@media (max-width: 1023px) {
  .inner {
    min-height: 0;
  }
  .d-title {
    font-size: clamp(84px, 14vw, 140px);
  }
}
@media (max-width: 767px) {
  .inner {
    display: flex;
    flex-direction: column;
    padding-block: 40px 84px;
  }
  .board {
    order: 2;
    width: 92%;
    margin-top: 40px;
    align-self: flex-end;
  }
  .d-logo {
    order: 3;
    width: 52%;
    margin-top: -38%;
    align-self: flex-start;
  }
  .d-title {
    align-self: auto;
    order: 4;
    margin-top: 28px;
    font-size: clamp(84px, 27vw, 128px);
  }
  html[lang='fa'] .d-title {
    font-size: clamp(76px, 22vw, 108px);
  }
  .tagline {
    font-size: 0.27em;
  }
  html[lang='fa'] .tagline {
    font-size: 0.26em;
  }
  .d-copy {
    order: 5;
    margin-top: 24px;
  }
}
</style>

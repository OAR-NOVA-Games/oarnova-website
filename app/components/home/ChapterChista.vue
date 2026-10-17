<script setup lang="ts">
import { games } from '~/content/games'

const game = games.chista
const { t, locale } = useLocale()
const c = computed(() => t.value.home.chapters.chista)
const root = ref<HTMLElement | null>(null)

// Chista opens like a window onto the night: the frame widens and the scene settles
// as you scroll in; the title rises out of a mask and a gold rule is drawn under it.
useMotion(root, ({ gsap, compact }) => {
  gsap.fromTo(
    '.c-scene',
    { clipPath: compact ? 'inset(6% 6% 6% 6%)' : 'inset(10% 14% 10% 14%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: root.value, start: 'top 95%', end: 'top 15%', scrub: 0.6 } },
  )
  gsap.fromTo(
    '.c-scene img',
    { scale: 1.16 },
    { scale: 1, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
  )
  const tl = gsap.timeline({ scrollTrigger: { trigger: '.c-text', start: 'top 85%', once: true } })
  tl.fromTo('.c-logo', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' })
    .fromTo('.c-title > span', { yPercent: 110 }, { yPercent: 0, duration: 1.15, ease: 'power4.out', stagger: 0.1 }, 0.1)
    .fromTo('.c-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.out' }, 0.55)
    .fromTo('.c-copy > *', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 0.6)
})
</script>

<template>
  <article id="chista" ref="root" class="chapter chista" aria-labelledby="chista-title">
    <div class="c-scene" aria-hidden="true">
      <picture>
        <source
          media="(max-width: 767px)"
          srcset="/media/chista/night-portrait-540.webp 540w, /media/chista/night-portrait-1080.webp 1080w"
          sizes="100vw"
          width="540"
          height="960"
        />
        <img
          src="/media/chista/night-1920.webp"
          srcset="/media/chista/night-960.webp 960w, /media/chista/night-1920.webp 1920w"
          sizes="100vw"
          width="1920"
          height="1080"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
    <div class="scrim" />
    <div class="inner wrap">
      <ChapterHead :game="game" :category="c.category" />
      <div class="c-text">
        <OImg class="c-logo" :image="game.logo" :alt="game.logoAlt[locale]" sizes="(max-width: 767px) 220px, 300px" />
        <h2 id="chista-title" class="display c-title">
          <span>{{ game.name[locale] }}</span>
          <span class="accent tagline">{{ c.tagline }}</span>
        </h2>
        <i class="c-rule" aria-hidden="true" />
        <div class="c-copy">
          <p class="body">{{ c.body }}</p>
          <GameLinks :game="game" />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.chista {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--color-chista);
  color: var(--color-chista-text);
  min-height: max(920px, 100svh);
  display: flex;
}
.c-scene {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
}
.c-scene picture,
.c-scene img {
  width: 100%;
  height: 100%;
}
.c-scene img {
  object-fit: cover;
  object-position: 50% 30%;
}
.scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgb(7 21 38 / 0.85) 0%, rgb(7 21 38 / 0) 22%),
    linear-gradient(0deg, rgb(7 21 38 / 0.97) 0%, rgb(7 21 38 / 0.86) 30%, rgb(7 21 38 / 0) 62%);
}
.inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: 72px 96px;
  gap: 56px;
}
.c-text {
  max-width: 1100px;
}
.c-logo {
  width: 230px;
  height: auto;
  margin-bottom: 8px;
  margin-inline-start: -14px;
}
.c-title {
  font-size: clamp(110px, 15vw, 270px);
  overflow: hidden;
  padding-bottom: 0.04em;
}
.c-title > span {
  display: block;
}
.tagline {
  color: var(--color-chista-gold);
  font-size: 0.2em;
  line-height: 1.1;
  margin-top: 0.15em;
}
html[lang='fa'] .c-title {
  font-size: clamp(96px, 11vw, 200px);
}
html[lang='fa'] .tagline {
  font-size: 0.22em;
  line-height: 1.6;
}
.c-rule {
  display: block;
  width: min(420px, 60%);
  height: 1px;
  margin-block: 28px;
  background: linear-gradient(90deg, var(--color-chista-gold), transparent);
  transform-origin: left;
}
html[dir='rtl'] .c-rule {
  background: linear-gradient(-90deg, var(--color-chista-gold), transparent);
  transform-origin: right;
}
.c-copy {
  display: grid;
  grid-template-columns: minmax(0, 440px) auto;
  gap: 16px 64px;
  align-items: end;
}
.body {
  color: #d9d6cc;
}
@media (max-width: 1023px) {
  .c-copy {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 767px) {
  .chista {
    min-height: 0;
  }
  .inner {
    padding-block: 40px 72px;
  }
  .c-text {
    padding-top: 52vh;
  }
  .c-logo {
    width: 180px;
  }
  .c-title {
    font-size: clamp(84px, 27vw, 128px);
  }
  html[lang='fa'] .c-title {
    font-size: clamp(76px, 22vw, 108px);
  }
  .tagline {
    font-size: 0.26em;
  }
}
</style>

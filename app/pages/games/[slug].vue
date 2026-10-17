<script setup lang="ts">
import { gameSlugs, games, type GameSlug } from '~/content/games'

definePageMeta({
  validate: (route) => gameSlugs.includes(route.params.slug as GameSlug),
})

const route = useRoute()
const { t, link, locale, num } = useLocale()
const slug = computed(() => route.params.slug as GameSlug)
const game = computed(() => games[slug.value])
const story = computed(() => t.value.game.stories[slug.value])
const next = computed(() => games[gameSlugs[(gameSlugs.indexOf(slug.value) + 1) % gameSlugs.length]!])
const root = ref<HTMLElement | null>(null)

// The hero art is the LCP element on Dooma and Chista pages: let the browser fetch the
// rendition for the current viewport before it has parsed CSS and fonts.
const heroArt: Partial<Record<GameSlug, { media: string; srcset: string; sizes: string }[]>> = {
  dooma: [{ media: 'all', srcset: '/media/dooma/field-480.webp 480w, /media/dooma/field-941.webp 941w', sizes: '(max-width: 767px) 100vw, 44vw' }],
  chista: [
    { media: '(max-width: 767px)', srcset: '/media/chista/night-portrait-540.webp 540w, /media/chista/night-portrait-720.webp 720w', sizes: '100vw' },
    { media: '(min-width: 768px)', srcset: '/media/chista/night-960.webp 960w, /media/chista/night-1920.webp 1920w', sizes: '50vw' },
  ],
}
useHead(() => ({
  link: (heroArt[slug.value] ?? []).map((a, i) => ({
    key: `hero-art-${i}`,
    rel: 'preload' as const,
    as: 'image' as const,
    fetchpriority: 'high' as const,
    media: a.media,
    imagesrcset: a.srcset,
    imagesizes: a.sizes,
  })),
}))

useSeo(() => ({
  title: t.value.seo.game[slug.value].title,
  description: t.value.seo.game[slug.value].description,
  path: `/games/${slug.value}/`,
  image: game.value.ogImage,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.value.name.en,
    alternateName: game.value.name.fa,
    url: game.value.url,
    inLanguage: 'fa',
    description: t.value.seo.game[slug.value].description,
    author: { '@type': 'Organization', name: 'OAR NOVA Games Studio', url: 'https://oarnova.games' },
  },
}))

useMotion(root, ({ gsap, compact, intro }) => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  if (intro)
    tl.fromTo('.h-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.15, stagger: 0.1 }, 0.1)
      .fromTo('.art', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power3.inOut' }, 0)
      .fromTo('[data-fade]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' }, 0.55)
  if (!compact) {
    gsap.to('.art-img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } })
  }
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } },
    )
  })
  gsap.fromTo(
    '.steps li',
    { opacity: 0, x: locale.value === 'fa' ? 24 : -24 },
    { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.steps', start: 'top 85%', once: true } },
  )
})
</script>

<template>
  <article ref="root" class="detail" :class="game.slug">
    <header class="hero">
      <div class="hero-inner wrap">
        <div class="hero-copy">
          <NuxtLink :to="link('/games/')" class="back meta" data-intro data-fade>
            <span aria-hidden="true">{{ locale === 'fa' ? '→' : '←' }}</span> {{ t.game.back }}
          </NuxtLink>
          <p class="meta idx" data-intro data-fade>
            {{ num(game.index) }} / {{ num('03') }} · <span class="status-chip">{{ t.status[game.status] }}</span>
          </p>
          <h1 class="display name">
            <span class="h-line"
              ><span data-intro>{{ game.name[locale] }}</span></span
            >
            <span class="h-line"
              ><span class="accent tagline" data-intro>{{ t.home.chapters[game.slug].tagline }}</span></span
            >
          </h1>
          <p class="lead" data-intro data-fade>{{ story.lead }}</p>
        </div>

        <div class="art" data-intro aria-hidden="true">
          <img
            v-if="game.slug === 'dooma'"
            class="art-img"
            src="/media/dooma/field-941.webp"
            srcset="/media/dooma/field-480.webp 480w, /media/dooma/field-941.webp 941w"
            sizes="(max-width: 767px) 100vw, 44vw"
            width="941"
            height="1672"
            alt=""
            fetchpriority="high"
          />
          <picture v-else-if="game.slug === 'chista'">
            <source
              media="(max-width: 767px)"
              srcset="/media/chista/night-portrait-540.webp 540w, /media/chista/night-portrait-720.webp 720w"
              sizes="100vw"
              width="540"
              height="960"
            />
            <img
              class="art-img"
              src="/media/chista/night-1920.webp"
              srcset="/media/chista/night-960.webp 960w, /media/chista/night-1920.webp 1920w"
              sizes="(max-width: 767px) 100vw, 50vw"
              width="1920"
              height="1080"
              alt=""
              fetchpriority="high"
            />
          </picture>
          <div v-else class="art-img sheets"><i /><i /><i /></div>
        </div>
        <OImg class="hero-logo" :image="game.logo" :alt="game.logoAlt[locale]" :eager="true" sizes="(max-width: 767px) 200px, 280px" data-intro data-fade />
      </div>
    </header>

    <section class="facts-band wrap" :aria-label="t.game.factsTitle">
      <h2 class="meta band-title">{{ t.game.factsTitle }}</h2>
      <dl class="facts">
        <div v-for="f in game.facts[locale]" :key="f.label" class="fact reveal">
          <dt class="meta">{{ f.label }}</dt>
          <dd>{{ f.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="story wrap">
      <div class="story-text">
        <p v-for="(p, i) in story.story" :key="i" class="reveal" :class="{ first: i === 0 }">{{ p }}</p>
      </div>
      <div class="how reveal">
        <h2 class="meta">{{ story.howLabel }}</h2>
        <ol class="steps">
          <li v-for="(s, i) in story.how" :key="i">
            <span class="display step-n" aria-hidden="true">{{ num(`0${i + 1}`) }}</span>
            <span>{{ s }}</span>
          </li>
        </ol>
      </div>
    </section>

    <section class="status wrap" aria-labelledby="status-title">
      <div class="status-inner reveal">
        <h2 id="status-title" class="meta">{{ t.game.statusTitle }}</h2>
        <p class="status-chip">{{ t.status[game.status] }}</p>
        <p class="note">{{ story.note }}</p>
        <GameLinks :game="game" external-only />
      </div>
    </section>

    <NuxtLink :to="link(`/games/${next.slug}/`)" class="next wrap" :class="next.slug">
      <span class="meta">{{ t.game.next }} · {{ num(next.index) }}</span>
      <span class="display next-name"
        >{{ next.name[locale] }} <span aria-hidden="true">{{ locale === 'fa' ? '←' : '→' }}</span></span
      >
    </NuxtLink>
  </article>
</template>

<style scoped>
.detail {
  --bg: var(--color-ink);
  --fg: var(--color-cream);
  --accent: var(--color-cyan);
  --soft: #c8c5bb;
}
.detail.dooma {
  --bg: var(--color-dooma);
  --fg: var(--color-dooma-text);
  --accent: #cfe9ea;
  --soft: #c4d6d6;
}
.detail.chista {
  --bg: var(--color-chista);
  --fg: var(--color-chista-text);
  --accent: var(--color-chista-gold);
  --soft: #d9d6cc;
}
.detail.yarizan {
  --bg: var(--color-yz-paper);
  --fg: var(--color-yz-petrol);
  --accent: var(--color-yz-teal);
  --soft: #31485a;
}
.detail {
  background: var(--bg);
  color: var(--fg);
}
.hero {
  position: relative;
  overflow: hidden;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6%;
  align-items: center;
  min-height: max(640px, calc(100svh - var(--header-h)));
  padding-block: 48px 72px;
  position: relative;
}
.back {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  min-height: 44px;
  opacity: 0.85;
}
.back:hover {
  opacity: 1;
}
.idx {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
}
.name {
  margin-top: 28px;
  font-size: clamp(96px, 13vw, 236px);
}
html[lang='fa'] .name {
  font-size: clamp(80px, 10vw, 176px);
}
.h-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.04em;
}
.h-line > span {
  display: block;
}
.tagline {
  font-size: 0.2em;
  line-height: 1.15;
  color: var(--accent);
}
html[lang='fa'] .tagline {
  font-size: 0.24em;
  line-height: 1.6;
}
.lead {
  margin-top: 32px;
  max-width: 520px;
  font-size: clamp(17px, 1.4vw, 20px);
  line-height: 1.6;
  color: var(--soft);
}
.art {
  position: relative;
  height: min(78vh, 720px);
  overflow: hidden;
}
.art-img {
  width: 100%;
  height: 112%;
  margin-top: -6%;
  object-fit: cover;
}
.art picture {
  display: block;
  height: 100%;
}
.dooma .art {
  border: 1px solid rgb(92 200 216 / 0.3);
  mask: linear-gradient(225deg, transparent 40px, #000 40px);
}
.chista .art-img {
  object-position: 62% 40%;
}
.sheets {
  position: relative;
  margin: 0;
  height: 100%;
}
.sheets i {
  position: absolute;
  inset: 12% 14%;
  background: var(--color-yz-sheet);
  border: 1px solid rgb(6 63 115 / 0.12);
  box-shadow: 0 30px 60px -30px rgb(6 63 115 / 0.35);
}
.sheets i:nth-child(1) {
  background: #f6e7c4;
  transform: rotate(-6deg);
}
.sheets i:nth-child(2) {
  background: #e4f1ec;
  transform: rotate(4deg);
}
.hero-copy {
  grid-column: 1;
  grid-row: 1;
}
.art {
  grid-column: 2;
  grid-row: 1;
}
.hero-logo {
  grid-column: 2;
  grid-row: 1;
  align-self: center;
  justify-self: center;
  position: relative;
  z-index: 2;
  width: min(280px, 60%);
  height: auto;
  filter: drop-shadow(0 24px 40px rgb(0 0 0 / 0.35));
}
.yarizan .hero-logo {
  filter: none;
}
.facts-band {
  border-top: 1px solid color-mix(in srgb, var(--fg) 22%, transparent);
  padding-block: 40px 56px;
}
.band-title {
  opacity: 0.75;
  margin-bottom: 20px;
}
.facts {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.fact dt {
  opacity: 0.75;
}
.fact dd {
  margin: 6px 0 0;
  font-size: 18px;
  line-height: 1.4;
}
.story {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 8%;
  padding-block: clamp(64px, 8vw, 120px);
}
.story-text p {
  max-width: 620px;
  color: var(--soft);
  font-size: 17px;
}
.story-text p + p {
  margin-top: 22px;
}
.story-text .first {
  color: var(--fg);
  font-size: clamp(22px, 2vw, 30px);
  line-height: 1.4;
}
html[lang='fa'] .story-text .first {
  line-height: 1.8;
}
.how h2 {
  opacity: 0.75;
  margin-bottom: 18px;
}
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
}
.steps li {
  display: flex;
  gap: 22px;
  align-items: baseline;
  padding-block: 18px;
  border-top: 1px solid color-mix(in srgb, var(--fg) 22%, transparent);
  font-size: 17px;
}
.step-n {
  font-size: 40px;
  color: var(--accent);
  min-width: 1.6em;
}
.status {
  padding-bottom: clamp(64px, 8vw, 120px);
}
.status-inner {
  border: 1px solid color-mix(in srgb, var(--fg) 30%, transparent);
  padding: clamp(28px, 4vw, 56px);
  display: grid;
  gap: 18px;
  justify-items: start;
  max-width: 860px;
}
.status-inner h2 {
  opacity: 0.75;
}
.note {
  font-size: clamp(17px, 1.5vw, 21px);
  line-height: 1.55;
  max-width: 640px;
}
.next {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-block: 64px 72px;
  background: var(--color-ink);
  color: var(--color-cream);
  border-top: 1px solid var(--color-line);
}
.next-name {
  font-size: clamp(64px, 9vw, 160px);
  transition:
    color 0.4s,
    transform 0.6s var(--ease-out-expo);
}
.next:hover .next-name {
  color: var(--color-cyan);
  transform: translateX(12px);
}
html[dir='rtl'] .next:hover .next-name {
  transform: translateX(-12px);
}
@media (max-width: 1023px) {
  .facts {
    grid-template-columns: repeat(2, 1fr);
  }
  .story {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 767px) {
  .hero-inner {
    grid-template-columns: 1fr;
    min-height: 0;
    padding-block: 24px 56px;
  }
  .art {
    grid-column: 1;
    grid-row: 1;
    height: 52vh;
    margin-inline: calc(var(--gutter) * -1);
  }
  .hero-logo {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
    justify-self: start;
    width: 170px;
    margin-bottom: -24px;
  }
  .yarizan .hero-logo {
    align-self: center;
    justify-self: center;
    margin: 0;
  }
  .hero-copy {
    grid-column: 1;
    grid-row: 2;
  }
  .name {
    font-size: clamp(76px, 24vw, 120px);
  }
  html[lang='fa'] .name {
    font-size: clamp(68px, 20vw, 100px);
  }
  .facts {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>

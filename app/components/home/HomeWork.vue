<script setup lang="ts">
import { gameList } from '~/content/games'

const { t, locale, num } = useLocale()
const root = ref<HTMLElement | null>(null)

// Hard cut from ink to paper: the headline is wiped in line by line with a clip mask.
useMotion(root, ({ gsap }) => {
  gsap.fromTo(
    '.w-line',
    { clipPath: 'inset(0 0 100% 0)', y: 40 },
    {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.value, start: 'top 72%', once: true },
    },
  )
  gsap.fromTo(
    '.w-index li',
    { opacity: 0, x: 0, y: 14 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.w-index', start: 'top 90%', once: true } },
  )
})
</script>

<template>
  <section id="work" ref="root" class="work wrap" aria-labelledby="work-title">
    <p class="eyebrow label">{{ t.home.workLabel }}</p>
    <div>
      <h2 id="work-title" class="display title">
        <span class="w-line">{{ t.home.work[0] }}</span>
        <span class="w-line">
          <span class="outline">{{ t.home.work[1] }}</span
          ><span v-if="t.home.work[2]" class="after">{{ t.home.work[2] }}</span>
        </span>
        <span class="w-line"
          ><em class="accent">{{ t.home.work[3] }}</em></span
        >
      </h2>
      <p class="body">{{ t.home.workBody }}</p>
      <ol class="w-index">
        <li v-for="g in gameList" :key="g.slug">
          <a :href="`#${g.slug}`">
            <span class="meta">{{ num(g.index) }}</span>
            <b>{{ g.name[locale] }}</b>
          </a>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.work {
  background: var(--color-paper);
  color: #171914;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 8%;
  padding-block: clamp(96px, 11vw, 168px);
}
.label {
  color: #4a5049;
  margin-top: 18px;
}
.title {
  font-size: clamp(64px, 8.4vw, 150px);
}
.w-line {
  display: block;
  padding-bottom: 0.04em;
}
.outline {
  color: transparent;
  -webkit-text-stroke: 1.5px #23271f;
}
html[lang='fa'] .outline {
  -webkit-text-stroke: 0;
  color: var(--color-moss);
}
.after {
  margin-inline-start: 0.22em;
}
.title em {
  font-size: 0.86em;
  line-height: 1;
}
html[lang='fa'] .title {
  font-size: clamp(54px, 6.4vw, 116px);
}
html[lang='fa'] .title em {
  font-size: 1em;
  font-weight: 900;
}
.body {
  margin-top: 36px;
  max-width: 440px;
  font-size: 17px;
}
.w-index {
  list-style: none;
  padding: 0;
  margin: 56px 0 0;
  max-width: 460px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgb(0 0 0 / 0.3);
}
.w-index a {
  display: flex;
  gap: 10px;
  align-items: baseline;
  min-height: 48px;
  padding-top: 14px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
html[lang='fa'] .w-index a {
  font-size: 15px;
  letter-spacing: 0;
}
.w-index a:hover b {
  text-decoration: underline;
  text-underline-offset: 5px;
}
@media (max-width: 767px) {
  .work {
    display: block;
  }
  .label {
    margin: 0 0 32px;
  }
  .title {
    font-size: clamp(56px, 17vw, 88px);
  }
  html[lang='fa'] .title {
    font-size: clamp(44px, 12.5vw, 68px);
  }
  .body {
    font-size: 15px;
  }
}
</style>

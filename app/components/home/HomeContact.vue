<script setup lang="ts">
import { contact } from '~/content/games'

const { t, link } = useLocale()
const root = ref<HTMLElement | null>(null)

useMotion(root, ({ gsap }) => {
  gsap.fromTo(
    '.k-line > span',
    { yPercent: 108 },
    { yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out', scrollTrigger: { trigger: root.value, start: 'top 70%', once: true } },
  )
})
</script>

<template>
  <section ref="root" class="contact wrap" aria-labelledby="contact-title">
    <p class="eyebrow label">{{ t.home.contactLabel }}</p>
    <h2 id="contact-title" class="display title">
      <span v-for="(l, i) in t.home.contactTitle" :key="i" class="k-line"
        ><span>{{ l }}</span></span
      >
    </h2>
    <div class="bottom">
      <p class="body">{{ t.home.contactBody }}</p>
      <ul class="mails">
        <li>
          <a :href="`mailto:${contact.info}`" dir="ltr">{{ contact.info }}</a>
        </li>
        <li>
          <a :href="`mailto:${contact.support}`" dir="ltr">{{ contact.support }}</a>
        </li>
      </ul>
      <NuxtLink :to="link('/contact/')" class="cta">{{ t.home.contactCta }} <span class="arrow" aria-hidden="true">↗</span></NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--color-ink);
  padding-block: clamp(96px, 10vw, 150px) 96px;
}
.label {
  color: #bdb1a0;
}
.title {
  margin-block: 48px 48px;
  font-size: clamp(78px, 13vw, 228px);
}
html[lang='fa'] .title {
  font-size: clamp(60px, 9.4vw, 168px);
}
.k-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.03em;
}
.k-line > span {
  display: block;
}
.bottom {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: end;
  gap: 24px 56px;
  border-top: 1px solid var(--color-line);
  padding-top: 36px;
}
.body {
  max-width: 380px;
  color: var(--color-mute);
}
.mails {
  list-style: none;
  margin: 0;
  padding: 0;
}
.mails a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: clamp(17px, 1.5vw, 22px);
  font-family: var(--font-sans);
  border-bottom: 1px solid transparent;
  transition:
    color 0.3s,
    border-color 0.3s;
}
.mails a:hover {
  color: var(--color-cyan);
  border-color: currentColor;
}
@media (max-width: 1023px) {
  .bottom {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 767px) {
  .title {
    font-size: clamp(60px, 18.5vw, 104px);
  }
  html[lang='fa'] .title {
    font-size: clamp(48px, 14vw, 80px);
  }
}
</style>

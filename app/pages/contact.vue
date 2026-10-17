<script setup lang="ts">
import { contact } from '~/content/games'

const { t, num } = useLocale()
const root = ref<HTMLElement | null>(null)

useSeo(() => ({ title: t.value.seo.contact.title, description: t.value.seo.contact.description, path: '/contact/' }))

useMotion(root, ({ gsap }) => {
  gsap.fromTo('.channel', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, stagger: 0.15, ease: 'power3.inOut', delay: 0.4 })
})

const channels = computed(() => [
  { key: 'info', title: t.value.contact.general, body: t.value.contact.generalBody, email: contact.info },
  { key: 'support', title: t.value.contact.support, body: t.value.contact.supportBody, email: contact.support },
])
</script>

<template>
  <div ref="root">
    <PageIntro :label="t.contact.label" :lines="t.contact.title" :lede="t.contact.intro" />
    <section class="channels wrap">
      <div v-for="(c, i) in channels" :key="c.key" class="channel" data-intro>
        <h2 class="meta">{{ num(`0${i + 1}`) }} · {{ c.title }}</h2>
        <a :href="`mailto:${c.email}`" class="mail" dir="ltr">{{ c.email }}<span aria-hidden="true">↗</span></a>
        <p class="desc">{{ c.body }}</p>
      </div>
      <p class="privacy meta">{{ t.contact.privacy }}</p>
    </section>
  </div>
</template>

<style scoped>
.channels {
  padding-bottom: clamp(80px, 9vw, 140px);
}
.channel {
  border-top: 1px solid var(--color-line);
  padding-block: 40px 48px;
  display: grid;
  gap: 14px;
}
.channel .meta {
  color: var(--color-mute);
}
.mail {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3em;
  justify-self: start;
  font-family: var(--font-sans);
  font-stretch: 70%;
  font-weight: 750;
  font-size: clamp(36px, 6.6vw, 118px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
  transition: color 0.35s;
}
.mail span {
  font-size: 0.4em;
  transition: transform 0.5s var(--ease-out-expo);
}
.mail:hover {
  color: var(--color-cyan);
}
.mail:hover span {
  transform: translate(6px, -6px);
}
.desc {
  color: #c8c5bb;
  max-width: 480px;
}
.privacy {
  color: var(--color-mute);
  border-top: 1px solid var(--color-line);
  padding-top: 24px;
}
@media (max-width: 767px) {
  .mail {
    font-size: clamp(28px, 9vw, 48px);
  }
}
</style>

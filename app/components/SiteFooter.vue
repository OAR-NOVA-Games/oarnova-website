<script setup lang="ts">
import { contact, gameList } from '~/content/games'

const { t, link, locale, num } = useLocale()
const year = 2026
</script>

<template>
  <footer class="footer wrap">
    <div class="top">
      <div class="sign">
        <img src="/media/studio/oar-nova-logo-512.webp" width="512" height="512" alt="OAR NOVA Games" loading="lazy" class="logo" />
        <p>{{ t.footer.line }}</p>
      </div>
      <nav class="col" :aria-label="t.footer.games">
        <h2 class="meta">{{ t.footer.games }}</h2>
        <NuxtLink v-for="g in gameList" :key="g.slug" :to="link(`/games/${g.slug}/`)">{{ g.name[locale] }}</NuxtLink>
      </nav>
      <nav class="col" :aria-label="t.footer.studio">
        <h2 class="meta">{{ t.footer.studio }}</h2>
        <NuxtLink :to="link('/about/')">{{ t.nav.about }}</NuxtLink>
        <NuxtLink :to="link('/contact/')">{{ t.nav.contact }}</NuxtLink>
      </nav>
      <div class="col">
        <h2 class="meta">{{ t.footer.write }}</h2>
        <a :href="`mailto:${contact.info}`" dir="ltr">{{ contact.info }}</a>
        <a :href="`mailto:${contact.support}`" dir="ltr">{{ contact.support }}</a>
      </div>
    </div>
    <div class="bottom meta">
      <span>© {{ num(year) }} {{ t.footer.rights }}</span>
      <a href="#main">{{ t.footer.top }} ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-ink);
  border-top: 1px solid var(--color-line);
  padding-top: 64px;
  padding-bottom: 32px;
}
.top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  gap: 40px;
}
.sign p {
  margin-top: 18px;
  color: var(--color-mute);
  max-width: 260px;
}
.logo {
  width: 92px;
  height: 92px;
}
.col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.col h2 {
  color: var(--color-mute);
  margin-bottom: 10px;
}
.col a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s;
}
.col a:hover {
  color: var(--color-cyan);
}
.bottom {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--color-line);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--color-mute);
}
.bottom a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
@media (max-width: 900px) {
  .top {
    grid-template-columns: 1fr 1fr;
  }
  .sign {
    grid-column: 1 / -1;
  }
}
@media (max-width: 480px) {
  .top {
    grid-template-columns: 1fr;
  }
  .bottom {
    flex-direction: column;
  }
}
</style>

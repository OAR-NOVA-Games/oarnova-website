<script setup lang="ts">
import { contact, siteUrl } from '~/content/games'

const { t } = useLocale()

useSeo(() => ({
  title: t.value.seo.home.title,
  description: t.value.seo.home.description,
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'OAR NOVA Games Studio',
        alternateName: 'استودیو بازی‌سازی اوآر نوا',
        url: siteUrl,
        logo: `${siteUrl}/media/studio/oar-nova-logo-1024.webp`,
        email: contact.info,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'OAR NOVA Games Studio',
        url: `${siteUrl}/`,
        inLanguage: ['en', 'fa'],
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  },
}))
</script>

<template>
  <div>
    <HomeHero />
    <HomeWork />
    <section :aria-label="t.nav.games">
      <HomeChapterDooma />
      <HomeChapterChista />
      <HomeChapterYarizan />
    </section>
    <HomeBelief />
    <HomeContact />
  </div>
</template>

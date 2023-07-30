<template>
  <Html v-bind="i18nHead.htmlAttrs">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <Meta property="og:title" :content="title" />
      <Meta property="og:type" content="website" />
      <Meta
        property="og:image"
        content="https://render.worldofwarcraft.com/eu/guild/crest/182/emblem-182-376700-fc6891.jpg"
      />
      <Meta property="og:description" :content="t('description')" />
      <Meta name="theme-color" content="#0284C7" />
      <Meta v-for="(meta, index) in i18nHead.meta" :key="index" v-bind="meta" />
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup lang="ts">
const { t } = useI18n();
const title = ref("Longtemps");
const i18nHead = useLocaleHead({
  addSeoAttributes: true,
});
</script>

<i18n lang="json">
{
  "fr_FR": {
    "description": "Vous n'en ressortirez pas indemne..."
  },
  "en_US": {
    "description": "You won't come away unscathed..."
  },
  "de_DE": {
    "description": "Sie werden nicht ungeschoren davonkommen..."
  }
}
</i18n>

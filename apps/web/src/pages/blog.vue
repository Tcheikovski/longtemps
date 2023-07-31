<template>
  <div class="container mx-auto p-16">
    <h2 class="text-8xl text-center">
      {{ t("title") }}
    </h2>
    <ul class="py-8 flex flex-col gap-y-4">
      <li v-for="article in collection" :key="article.id">
        <BlogArticle :article="article" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr_FR: '/actualités',
    en_US: '/news',
    de_DE: '/nachrichten'
  }
})

const { t } = useI18n()
const store = useArticlesStore()
const { collection, isCollectionReady } = storeToRefs(store)

await until(isCollectionReady).toBe(true)
</script>

<i18n lang="json">
{
  "fr_FR": {
    "title": "Actualités"
  },
  "en_US": {
    "title": "News"
  }
}
</i18n>

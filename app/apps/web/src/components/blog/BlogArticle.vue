<template>
  <article class="bg-neutral-900 border text-left border-neutral-700 p-4 rounded-md flex flex-col">
    <div class="text-neutral-300 flex">
      <i18n-t tag="div" keypath="publishedBy" class="flex-1">
        <template #author>
          <span class="font-bold">{{ username.name }}</span>
          <span v-if="username.tag" class="text-sm ml-1">#{{ username.tag }}</span>
        </template>
      </i18n-t>
      <i18n-t tag="div" keypath="publishedAt" class="flex-1 text-right">
        <template #date>
          {{ formatDate(article.createdAt) }}
        </template>
      </i18n-t>
    </div>
    <h3 class="text-6xl">
      {{ article.title }}
    </h3>
    <p>{{ article.content }}</p>
  </article>
</template>

<script setup lang="ts">
import { type Article } from '@/api'

const props = defineProps<{ article: Article }>()
const { localeProperties } = useI18n()

const username = useUsername(() => props.article.createdBy.username)

const formatDate = (date: Date) => {
  const dateTimeFormat = new Intl.DateTimeFormat(localeProperties.value.iso, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })

  return dateTimeFormat.format(date)
}
</script>

<i18n lang="json">
{
  "fr_FR": {
    "publishedBy": "Auteur: {author}",
    "publishedAt": "Publié le {date}"
  },
  "en_US": {
    "publishedBy": "Author: {author}",
    "publishedAt": "Published on {date}"
  }
}
</i18n>

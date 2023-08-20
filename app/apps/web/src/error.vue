<template>
  <NuxtLayout name="default">
    <div class="h-full w-full flex flex-col items-center gap-y-4 p-32">
      <I18nT tag="p" keypath="error" class="text-6xl">
        <template #code>
          <strong>{{ statusCode }}</strong>
        </template>
      </I18nT>
      <I18nT tag="p" :keypath="`message.${statusCode}`" class="text-2xl">
        <template #page>
          <code>{{ $route.path }}</code>
        </template>
      </I18nT>
      <button @click="handleError">
        Clear errors
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { NuxtError } from '#app'
import { I18nT } from '#i18n'

const props = defineProps<{
  error: NuxtError;
}>()
useI18n()
const localePath = useLocalePath()

const statusCode = computed(() => props.error.statusCode)
const handleError = () => clearError({ redirect: localePath({ name: 'index' }) })
</script>

<i18n lang="json">
{
  "fr_FR": {
    "error": "Erreur {code}",
    "message": {
      "404": "La page {page} n'extiste pas"
    }
  },
  "en_US": {
    "error": "Error {code}",
    "message": {
      "404": "Page {page} does not exist"
    }
  },
  "de_DE": {
    "error": "Error {code}",
    "message": {
      "404": "Page {page} not found"
    }
  }
}
</i18n>

<template>
  <header class="flex gap-x-2 h-12 px-2 sm:px-4 sm:h-20 bg-neutral-900 text-white">
    <div class="self-center">
      <NuxtLink v-slot="{ href, navigate }" :to="localePath({ name: 'index' })" custom>
        <a :href="href" class="sm:text-2xl font-semibold mr-2" translate="no" lang="fr-FR" @click="navigate">
          Longtemps
        </a>
      </NuxtLink>
    </div>
    <div>
      <LayoutNavbar>
        <LayoutLink v-for="{ to, label } in navigationLinks" :key="to" :to="to">
          {{ label }}
        </LayoutLink>
      </LayoutNavbar>
    </div>

    <div class="ml-auto self-center flex gap-x-2">
      <LayoutLocale />
      <LayoutAuth />
    </div>
  </header>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const { t } = useI18n()

const navigationLinks = useArrayMap(['blog', 'guild'], name => ({
  to: localePath({ name }),
  label: t(name)
}))
</script>

<i18n lang="json">
{
  "fr_FR": {
    "guild": "Guilde",
    "blog": "Actualités"
  },
  "en_US": {
    "guild": "Guild",
    "blog": "News"
  },
  "de_DE": {
    "guild": "Gilde",
    "blog": "Nachrichten"
  }
}
</i18n>

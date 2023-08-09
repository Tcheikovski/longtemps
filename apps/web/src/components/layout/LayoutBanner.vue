<template>
  <div v-if="guild" role="banner" class="p-4 text-center">
    <h1 class="text-4xl whitespace-nowrap" translate="no">
      <span>{{ guild.name }}</span>
      <span> - </span>
      <TranslatableWord translate="yes" :value="guild.realm.name" />
    </h1>
    <div class="text-neutral-400">
      {{ t("slogan", { date: formatDate(guild.created_timestamp) }) }}
    </div>
    <div>{{ t("member_count", guild.member_count) }}</div>
  </div>
</template>

<script lang="ts" setup>
const { state: guild } = await useGuildAsync()
const { t, localeProperties } = useI18n()

const formatDate = (date: Date | number) => {
  const dateTimeFormat = new Intl.DateTimeFormat(localeProperties.value.iso, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return dateTimeFormat.format(date)
}
</script>

<i18n lang="json">
{
  "fr_FR": {
    "slogan": "Pourfendeurs de bourbe depuis le {date}",
    "member_count": "Effectif: Une âme aberrante | Effectif: {n} âmes aberrantes"
  },
  "en_US": {
    "slogan": "Sludge slayers since {date}",
    "member_count": "Staff: One aberrant soul | Staff: {n} aberrant souls"
  },
  "de_DE": {
    "slogan": "Mud Slayers seit {date}",
    "member_count": "Anzahl: Eine abweichende Seele | Belegschaft: {n} abweichende Seelen"
  }
}
</i18n>

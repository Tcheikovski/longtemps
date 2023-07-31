<template>
  <div class="mx-auto container">
    <RosterList />
  </div>
</template>

<script lang="ts" setup>
defineI18nRoute({
  paths: {
    fr_FR: '/guilde',
    en_US: '/guild',
    de_DE: '/gilde'
  }
})
</script>

<i18n lang="json">
{
  "fr_FR": {
    "slogan": "Pourfendeurs de bourbe depuis le {date}",
    "member_count": "Âme aberrante\u00A0:\u00A0{n} | Âmes aberrantes\u00A0:\u00A0{n}"
  },
  "en_US": {
    "slogan": "Sludge slayers since {date}",
    "member_count": "Aberrant soul\u00A0:\u00A0{n} | Aberrant souls\u00A0:\u00A0{n}"
  },
  "de_DE": {
    "slogan": "Bourbec-Spalter seit dem {date}",
    "member_count": "Aberrante Seele\u00A0:\u00A0{n} | Aberrante Seelen\u00A0:\u00A0{n}"
  }
}
</i18n>

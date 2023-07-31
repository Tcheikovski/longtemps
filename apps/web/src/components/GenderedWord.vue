<template>
  <span>{{ translated }}</span>
</template>

<script setup lang="ts">
import { GenderTranslatable, GenderType } from '@blizzard'

const props = defineProps<{
  value: GenderTranslatable;
  gender: GenderType;
}>()

const locale = useLocale()
const genderKey = computed(() => props.gender.toLowerCase())
const translated = computed(() => getTranslatedValue(props.value[genderKey.value], locale.value))
</script>

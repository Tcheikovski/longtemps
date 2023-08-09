<template>
  <span>{{ translated }}</span>
</template>

<script setup lang="ts">
import { Translatable, Gender } from '@longtemps/blizzard'

const props = defineProps<{
  value: Translatable.Gendered;
  gender: Gender.Type;
}>()

const locale = useLocale()
const genderKey = computed(() => props.gender.toLowerCase() as Gender.TypeKey)
const translated = computed(() => getTranslatedValue(props.value[genderKey.value], locale.value))
</script>

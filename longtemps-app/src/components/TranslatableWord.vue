<template>
  <span>{{ translated }}</span>
</template>

<script setup lang="ts">
import { Locale, Translatable } from "@blizzard";

const props = defineProps<{
  value: Translatable;
}>();

const { locale } = useI18n<undefined, Locale>();
const translated = computed(() => getTranslatedValue(props.value, locale.value));
</script>

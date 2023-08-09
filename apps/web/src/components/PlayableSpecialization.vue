<template>
  <span v-if="playableSpecialization" class="inline-flex text-sm">
    <TranslatableWord :value="playableSpecialization.name" />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: number;
}>()

const { state: playableSpecialization } = await usePlayableSpecializationAsync(undefined, () => props.id)
</script>

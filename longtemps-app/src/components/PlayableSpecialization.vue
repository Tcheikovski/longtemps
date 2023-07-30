<template>
  <span v-if="playableSpecialization" class="inline-flex text-sm">
    <TranslatableWord :value="playableSpecialization.name" />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: number;
}>();

const store = usePlayableSpecializationStore();
const { state: playableSpecialization, isReady } = store.usePlayableSpecialization(props.id.toString());

await until(isReady).toBe(true);
</script>

<template>
  <span v-if="playableClass" class="inline-flex text-sm">
    <GenderedWord v-if="gender" :value="playableClass.gender_name" :gender="gender" />
    <TranslatableWord v-else :value="playableClass.name" />
  </span>
</template>

<script lang="ts" setup>
import { GenderType } from "@blizzard";
const props = defineProps<{
  id: number;
  gender?: GenderType | null;
}>();

const store = usePlayableClassStore();
const { state: playableClass, isReady } = store.usePlayableClass(props.id.toString());

await until(isReady).toBe(true);
</script>

<template>
  <span v-if="playableRace" class="inline-flex text-sm">
    <GenderedWord v-if="gender" :value="playableRace.gender_name" :gender="gender" />
    <TranslatableWord v-else :value="playableRace.name" />
  </span>
</template>

<script lang="ts" setup>
import { GenderType } from "@blizzard";
const props = defineProps<{
  id: number;
  gender?: GenderType | null;
}>();

const store = usePlayableRaceStore();
const { state: playableRace, isReady } = store.usePlayableRace(props.id.toString());

await until(isReady).toBe(true);
</script>

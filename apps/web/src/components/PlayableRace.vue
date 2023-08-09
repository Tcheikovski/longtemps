<template>
  <span v-if="playableRace" class="inline-flex text-sm">
    <GenderedWord v-if="gender" :value="playableRace.gender_name" :gender="gender" />
    <TranslatableWord v-else :value="playableRace.name" />
  </span>
</template>

<script lang="ts" setup>
import { Gender } from '@longtemps/blizzard'
const props = defineProps<{
  id: number;
  gender?: Gender.Type | null;
}>()

const { state: playableRace } = await usePlayableRaceAsync(undefined, () => props.id)
</script>

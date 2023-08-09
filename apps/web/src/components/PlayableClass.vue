<template>
  <span v-if="playableClass" class="inline-flex text-sm">
    <GenderedWord v-if="gender" :value="playableClass.gender_name" :gender="gender" />
    <TranslatableWord v-else :value="playableClass.name" />
  </span>
</template>

<script lang="ts" setup>
import { Gender } from '@longtemps/blizzard'
const props = defineProps<{
  id: number;
  gender?: Gender.Type | null;
}>()

const { state: playableClass } = await usePlayableClassAsync(undefined, () => props.id)
</script>

<template>
  <figure class="h-16 w-16 bg-black">
    <img v-if="src" :src="src" class="h-full w-full object-cover">
  </figure>
</template>

<script lang="ts" setup>
import { Gender } from '@longtemps/blizzard'

const props = withDefaults(defineProps<{
  character: string
  realm: string
  race: number
  gender?: Gender.Type
}>(), {
  gender: 'MALE'
})

const { state } = await useCharacterMediaAsync(
  undefined,
  () => encodeURIComponent(props.character.toLowerCase()),
  () => encodeURIComponent(props.realm)
)

const genderId = computed(() => typeof props.gender === 'string' ? ['MALE', 'FEMALE'].indexOf(props.gender) : 0)
const alt = computed(() => `/shadow/avatar/${props.race}-${genderId.value}.jpg`)
const src = computed(() => {
  const asset = state.value?.assets.find(({ key }) => key === 'avatar')
  if (asset) { return asset.value + `?alt=${alt.value}` }
  return null
})
</script>

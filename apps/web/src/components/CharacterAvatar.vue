<template>
  <MediaAsset v-if="mediaData" :media="mediaData" class="h-16 w-16 object-cover" tag="inset" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  realm: string;
  name: string;
}>()

const store = useCharacterStore()
const { state: mediaData } = await store.useMediaAsync(props.realm, props.name.toLowerCase())
</script>

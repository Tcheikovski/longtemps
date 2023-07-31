<template>
  <img v-bind="$attrs" :src="src" @error="onError">
</template>

<script lang="ts" setup>
import { Media, MediaAssetKey } from '@blizzard'

const props = defineProps<{
  media: Media;
  tag?: MediaAssetKey;
}>()

const src = ref<string>()

onMounted(() => {
  if (props.tag) {
    const asset = props.media.assets.find(a => a.key === props.tag)
    if (asset) { src.value = asset.value }
  } else { src.value = props.media.assets[0].value }
})

const onError = () => {
  src.value = 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg'
}
</script>

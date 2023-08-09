<template>
  <figure>
    <img v-bind="$attrs" :src="src" @error="onError">
  </figure>
</template>

<script lang="ts" setup>
import { Api } from '@longtemps/blizzard'

const props = defineProps<{
  media: Api.Media;
  tag?: Api.Media.AssetKey;
  alt?: string;
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

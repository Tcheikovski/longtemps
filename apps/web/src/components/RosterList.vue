<template>
  <div class="flex flex-col gap-y-4">
    <template v-for="member in data" :key="member.character.id">
      <CharacterCard :character="member.character" :rank="member.rank" />
    </template>
  </div>
</template>

<script lang="ts" setup>
const store = useGuildStore()
const { roster, isRosterReady } = storeToRefs(store)
await until(isRosterReady).toBe(true)

const displayedMembers = ref(10)
const members = computed(() => roster.value?.members.slice().sort((a, b) => a.rank - b.rank) ?? [])
const data = computed(() => useSlice(members.value, 0, displayedMembers.value))

if (process.client) {
  onMounted(() => {
    useInfiniteScroll(
      () => document.getElementById('page'),
      () => {
        displayedMembers.value = Math.min(displayedMembers.value + 5, members.value.length)
      },
      { distance: 10, throttle: 100, direction: 'bottom' }
    )
  })
}
</script>

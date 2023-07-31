export const usePlayableRaceStore = defineStore('playableRace', () => {
  const { collection, useItem: usePlayableRace } = useAsyncCollection(id => $fetch(`/api/playable-race/${id}`))
  return { collection, usePlayableRace }
})

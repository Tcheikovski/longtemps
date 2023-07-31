export const usePlayableSpecializationStore = defineStore('playableSpecialization', () => {
  const { collection, useItem: usePlayableSpecialization } = useAsyncCollection(id =>
    $fetch(`/api/playable-specialization/${id}`)
  )
  return { collection, usePlayableSpecialization }
})

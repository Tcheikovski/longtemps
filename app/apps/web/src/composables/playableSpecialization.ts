import { PlayableSpecialization } from '@longtemps/blizzard'

export const usePlayableSpecializationStore = defineResourceCollectionStore('playableSpecialization', (id: number) => $fetch<PlayableSpecialization>(`/api/playable-specialization/${id}`))

export const [usePlayableSpecialization, usePlayableSpecializationAsync] = resourceCollectionStoreToComposables(usePlayableSpecializationStore)

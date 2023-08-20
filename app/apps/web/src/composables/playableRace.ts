import { PlayableRace } from '@longtemps/blizzard'

export const usePlayableRaceStore = defineResourceCollectionStore('playableRace', (id: number) => $fetch<PlayableRace>(`/api/playable-race/${id}`))

export const [usePlayableRace, usePlayableRaceAsync] = resourceCollectionStoreToComposables(usePlayableRaceStore)

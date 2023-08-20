import { PlayableClass } from '@longtemps/blizzard'

export const usePlayableClassStore = defineResourceCollectionStore('playableClass', (id: number) => $fetch<PlayableClass>(`/api/playable-class/${id}`))

export const [usePlayableClass, usePlayableClassAsync] = resourceCollectionStoreToComposables(usePlayableClassStore)

import { Character } from '@longtemps/blizzard'

export const useCharacterStore = defineResourceCollectionStore('character', (character: string, realm: string) => $fetch<Character>(`/api/character/${realm}/${character}`))
export const useCharacterMediaStore = defineResourceCollectionStore('characterMedia', (character: string, realm: string) => $fetch<Character.Media>(`/api/character/${realm}/${character}/character-media`))

export const [useCharacter, useCharacterAsync] = resourceCollectionStoreToComposables(useCharacterStore)
export const [useCharacterMedia, useCharacterMediaAsync] = resourceCollectionStoreToComposables(useCharacterMediaStore)

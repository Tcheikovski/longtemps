import { CharacterMedia } from '@blizzard'
import { H3Event } from 'h3'

const getCharacterMedia = async (event: H3Event) => {
  const realmSlug = getRouterParam(event, 'realmSlug')!
  const characterName = getRouterParam(event, 'characterName')!
  const blizzardFetch = await useBlizzardFetch(event)
  const characterMedia = await blizzardFetch.profile<CharacterMedia>(
    `/profile/wow/character/${realmSlug}/${characterName}/character-media`
  )

  return characterMedia
}

const getCachedCharacterMedia = cachedFunction(getCharacterMedia, {
  name: 'character-media',
  getKey: (event) => {
    const realmSlug = getRouterParam(event, 'realmSlug')!
    const characterName = getRouterParam(event, 'characterName')!
    return `${characterName}-${realmSlug}`
  },
  maxAge: 60 * 60 * 24
})

export default defineEventHandler(event => getCachedCharacterMedia(event))

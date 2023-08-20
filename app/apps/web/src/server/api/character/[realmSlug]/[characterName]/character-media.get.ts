import { Character } from '@longtemps/blizzard'

export default defineCachedEventHandler(async (event) => {
  const { realmSlug, characterName } = getRouterParams(event)
  return await $blizzardFetch.profile<Character.Media>(`/profile/wow/character/${realmSlug}/${characterName}/character-media`)
}, {
  name: 'character-media',
  getKey: (event) => {
    const { realmSlug, characterName } = getRouterParams(event)
    return `${characterName}-${realmSlug}`
  },
  maxAge: 86400 // 1 day
})

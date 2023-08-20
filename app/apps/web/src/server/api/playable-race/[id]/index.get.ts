import type { PlayableRace } from '@longtemps/blizzard'

export default defineCachedEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return await $blizzardFetch.static<PlayableRace>(`/data/wow/playable-race/${id}`)
}, {
  name: 'playable-race',
  getKey: event => getRouterParams(event).id,
  maxAge: 86400 // 1day
})

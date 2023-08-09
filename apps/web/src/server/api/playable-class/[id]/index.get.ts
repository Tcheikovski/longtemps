import type { PlayableClass } from '@longtemps/blizzard'

export default defineCachedEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return await $blizzardFetch.static<PlayableClass>(`/data/wow/playable-class/${id}`)
}, {
  name: 'playable-class',
  getKey: event => getRouterParams(event).id,
  maxAge: 86400 // 1day
})

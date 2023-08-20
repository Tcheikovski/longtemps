import type { PlayableClass } from '@longtemps/blizzard'

export default defineCachedEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return await $blizzardFetch.static<PlayableClass.Media>(`/data/wow/media/playable-class/${id}`)
}, {
  name: 'playable-class-media',
  getKey: event => getRouterParams(event).id,
  maxAge: 86400 // 1day
})

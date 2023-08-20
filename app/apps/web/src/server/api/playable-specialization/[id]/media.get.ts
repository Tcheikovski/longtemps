import type { PlayableSpecialization } from '@longtemps/blizzard'

export default defineCachedEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return await $blizzardFetch.static<PlayableSpecialization.Media>(`/data/wow/media/playable-specialization/${id}`)
}, {
  name: 'playable-specialization-media',
  getKey: event => getRouterParams(event).id,
  maxAge: 86400 // 1day
})

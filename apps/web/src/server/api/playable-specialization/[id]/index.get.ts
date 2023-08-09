import type { PlayableSpecialization } from '@longtemps/blizzard'

export default defineCachedEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return await $blizzardFetch.static<PlayableSpecialization>(`/data/wow/playable-specialization/${id}`)
}, {
  name: 'playable-specialization',
  getKey: event => getRouterParams(event).id,
  maxAge: 86400 // 1day
})

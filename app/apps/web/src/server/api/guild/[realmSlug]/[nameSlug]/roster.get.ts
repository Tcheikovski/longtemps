import { Guild } from '@longtemps/blizzard'

export default defineCachedEventHandler(async (event) => {
  const { realmSlug, nameSlug } = getRouterParams(event)
  return await $blizzardFetch.profile<Guild.Roster>(`/data/wow/guild/${realmSlug}/${nameSlug}/roster`)
}, {
  name: 'guild-roster',
  getKey: (event) => {
    const { realmSlug, nameSlug } = getRouterParams(event)
    return `${nameSlug}-${realmSlug}`
  },
  maxAge: 86400 // 1 day
})

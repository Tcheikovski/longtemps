import { Guild } from '@longtemps/blizzard'

export const useGuildStore = defineResourceStore('guild', () => {
  const { realmSlug, nameSlug } = useRuntimeConfig().public.guild
  return $fetch<Guild>(`/api/guild/${realmSlug}/${nameSlug}`)
})

export const useGuildRosterStore = defineResourceStore('guildRoster', () => {
  const { realmSlug, nameSlug } = useRuntimeConfig().public.guild
  return $fetch<Guild.Roster>(`/api/guild/${realmSlug}/${nameSlug}/roster`)
})

export const [useGuild, useGuildAsync] = resourceStoreToComposables(useGuildStore)
export const [useGuildRoster, useGuildRosterAsync] = resourceStoreToComposables(useGuildRosterStore)

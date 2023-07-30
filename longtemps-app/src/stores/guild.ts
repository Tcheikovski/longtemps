import { Guild, GuildRoster } from "@blizzard";

export const useGuildStore = defineStore("guild", () => {
  const {
    state: guild,
    error: guildError,
    isLoading: isGuildLoading,
    isReady: isGuildReady,
  } = useAsyncState(() => {
    const config = useRuntimeConfig();
    const { realmSlug, nameSlug } = config.public.guild;
    return $fetch<Guild>(`/api/guild/${realmSlug}/${nameSlug}`);
  }, null);

  const {
    state: roster,
    error: rosterError,
    isLoading: isRosterLoading,
    isReady: isRosterReady,
  } = useAsyncState(() => {
    const config = useRuntimeConfig();
    const { realmSlug, nameSlug } = config.public.guild;
    return $fetch<GuildRoster>(`/api/guild/${realmSlug}/${nameSlug}/roster`);
  }, null);

  return {
    guild,
    guildError,
    isGuildLoading,
    isGuildReady,
    roster,
    rosterError,
    isRosterLoading,
    isRosterReady,
  };
});

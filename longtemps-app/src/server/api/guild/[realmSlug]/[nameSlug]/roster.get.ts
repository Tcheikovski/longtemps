import { H3Event } from "h3";
import { GuildRoster } from "@blizzard";

const getGuildRoster = async (event: H3Event) => {
  const realmSlug = getRouterParam(event, "realmSlug");
  const nameSlug = getRouterParam(event, "nameSlug");
  const blizzardFetch = await useBlizzardFetch(event);
  const guildRoster = await blizzardFetch.profile<GuildRoster>(`/data/wow/guild/${realmSlug}/${nameSlug}/roster`);

  return guildRoster;
};

const getCachedGuildRoster = cachedFunction(getGuildRoster, {
  name: "guild-roster",
  getKey: (event) => {
    const realmSlug = getRouterParam(event, "realmSlug");
    const nameSlug = getRouterParam(event, "nameSlug");
    return `${realmSlug}/${nameSlug}`;
  },
  maxAge: 60,
});

export default defineEventHandler((event) => getCachedGuildRoster(event));

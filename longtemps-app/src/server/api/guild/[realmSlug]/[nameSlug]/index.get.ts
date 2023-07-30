import { H3Event } from "h3";
import { Guild } from "@blizzard";

const getGuild = async (event: H3Event) => {
  const realmSlug = getRouterParam(event, "realmSlug");
  const nameSlug = getRouterParam(event, "nameSlug");
  const blizzardFetch = await useBlizzardFetch(event);
  const guildRoster = await blizzardFetch.profile<Guild>(`/data/wow/guild/${realmSlug}/${nameSlug}`);

  return guildRoster;
};

const getCachedGuild = cachedFunction(getGuild, {
  name: "guild",
  getKey: (event) => {
    const realmSlug = getRouterParam(event, "realmSlug");
    const nameSlug = getRouterParam(event, "nameSlug");
    return `${realmSlug}/${nameSlug}`;
  },
  maxAge: 60,
});

export default defineEventHandler((event) => getCachedGuild(event));

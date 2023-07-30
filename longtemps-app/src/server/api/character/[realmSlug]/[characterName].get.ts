import { Character } from "@blizzard";
import { H3Event } from "h3";

const getCharacter = async (event: H3Event) => {
  const { realmSlug, characterName } = getRouterParams(event);
  const blizzardFetch = await useBlizzardFetch(event);
  const character = await blizzardFetch.profile<Character>(`/profile/wow/character/${realmSlug}/${characterName}`);

  return character;
};

const getCachedCharacter = cachedFunction(getCharacter, {
  name: "character",
  getKey: (event) => {
    const realmSlug = getRouterParam(event, "realmSlug")!;
    const characterName = getRouterParam(event, "characterName")!;
    return `${characterName}-${realmSlug}`;
  },
  maxAge: 60 * 60,
});

export default defineEventHandler((event) => getCachedCharacter(event));

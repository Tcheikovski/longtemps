import { PlayableClass } from "@blizzard";
import { H3Event } from "h3";

const getPlayableClass = async (event: H3Event) => {
  const id = getRouterParam(event, "id");
  const blizzardFetch = await useBlizzardFetch(event);
  const playableClass = await blizzardFetch.static<PlayableClass>(`/data/wow/playable-class/${id}`);
  return playableClass;
};

const getCachedPlayableClass = cachedFunction(getPlayableClass, {
  name: "playable-class",
  getKey: (event) => getRouterParam(event, "id")!,
  maxAge: 60 * 60 * 24 * 7,
});

export default defineEventHandler((event) => getCachedPlayableClass(event));

import { PlayableSpecialization } from "@blizzard";
import { H3Event } from "h3";

const getPlayableSpecialization = async (event: H3Event) => {
  const id = getRouterParam(event, "id");
  const blizzardFetch = await useBlizzardFetch(event);
  const playableSpecialization = await blizzardFetch.static<PlayableSpecialization>(
    `/data/wow/playable-specialization/${id}`
  );

  return playableSpecialization;
};

const getCachedPlayableSpecialization = cachedFunction(getPlayableSpecialization, {
  name: "playable-specialization",
  getKey: (event) => getRouterParam(event, "id") ?? "",
  maxAge: 60 * 60 * 24,
});

export default defineEventHandler((event) => getCachedPlayableSpecialization(event));

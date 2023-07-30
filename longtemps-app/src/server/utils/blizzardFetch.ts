import { H3Event } from "h3";
import { $Fetch } from "ofetch";
import { regionApiEndpoints } from "@blizzard";

type BlizzardFetch = <T>(path: string) => Promise<T>;

interface $BlizzardFetch extends $Fetch {
  static: BlizzardFetch;
  dynamic: BlizzardFetch;
  profile: BlizzardFetch;
}

export const useBlizzardFetch = async (event: H3Event): Promise<$BlizzardFetch> => {
  const config = useRuntimeConfig(event);
  const region = config.battlenet.region;
  const baseURL: string = regionApiEndpoints[region];
  const token = await useBnetClientToken(event);

  const fetch = $fetch.create({
    baseURL,
    query: { access_token: token },
  }) as $BlizzardFetch;

  fetch.static = (path) => fetch(path, { query: { namespace: `static-${region}` } });
  fetch.dynamic = (path) => fetch(path, { query: { namespace: `dynamic-${region}` } });
  fetch.profile = (path) => fetch(path, { query: { namespace: `profile-${region}` } });

  return fetch;
};

import type { H3Event } from "h3";
import {
  type PlayableClass,
  type PlayableRace,
  type Gender,
  type Faction,
  type Realm,
  type ResourceKey,
  type ResourceReference,
  regionApiEndpoints,
  regionOAuth2Endpoints,
} from "@blizzard";
import { getToken } from "#auth";

interface ClientTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface UserTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  id_token: string;
  "not-before-policy": number;
  scope: string;
  sub: string;
  accessTokenExpiration: number;
}

interface UserProfileResponse {
  id: number;
  wow_accounts: {
    id: number;
    characters: {
      character: ResourceKey;
      protected_character: ResourceKey;
      name: string;
      id: number;
      realm: ResourceReference<Realm, "id" | "slug" | "name">;
      playable_class: ResourceReference<PlayableClass, "id" | "name">;
      playable_race: ResourceReference<PlayableRace, "id" | "name">;
      gender: Gender;
      faction: Faction;
      level: number;
    }[];
  }[];
}

export const useBnetClientToken = async (event: H3Event): Promise<string> => {
  const now = Date.now();
  const store = useStorage("blizzard");

  let token = await store.getItem<{
    value: string;
    exp: number;
  }>("access_token");

  if (!token || token.exp < now) {
    const { region, clientId, clientSecret } = useRuntimeConfig(event).battlenet;

    const baseURL = regionOAuth2Endpoints[region];
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const headers = new Headers();
    const body = new FormData();

    headers.set("Authorization", `Basic ${credentials}`);
    body.set("grant_type", "client_credentials");
    const response = await $fetch<ClientTokenResponse>("/token", { method: "POST", baseURL, headers, body });
    token = { value: response.access_token, exp: response.expires_in + now };

    store.setItem("access_token", token);
  }

  return token.value;
};

export const useBnetUserToken = async (event: H3Event): Promise<string | undefined> => {
  const token = await getToken({ event });
  return token?.bnet_token;
};

export const fetchBnetUserToken = async (token: string): Promise<string> => {
  const { keycloak } = useRuntimeConfig();

  const baseURL = keycloak.host;
  const headers = new Headers({ Authorization: `Bearer ${token}` });

  const response = await $fetch<UserTokenResponse>(`/realms/${keycloak.realm}/broker/battlenet/token`, {
    baseURL,
    headers,
  });

  return response.access_token;
};

export const fetchBnetUserProfile = async (token: string) => {
  const config = useRuntimeConfig();
  const region = config.battlenet.region;
  const response = await $fetch<UserProfileResponse>("/profile/user/wow", {
    baseURL: regionApiEndpoints[region],
    query: { access_token: token, namespace: `profile-${region}` },
  });

  return {
    id: response.id,
    characters: response.wow_accounts.flatMap((account) => account.characters),
  };
};

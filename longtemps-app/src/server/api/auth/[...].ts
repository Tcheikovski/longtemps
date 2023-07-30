import KeycloakProviderImport from "next-auth/providers/keycloak";
import { DefaultSession } from "next-auth";
import { Faction, Gender, PlayableClass, PlayableRace, Realm, ResourceKey, ResourceReference } from "@blizzard";
import { NuxtAuthHandler } from "#auth";

const { auth, keycloak } = useRuntimeConfig();
const issuerURL = new URL(`/realms/${keycloak.realm}`, keycloak.host);

const KeycloakProvider: { default: typeof KeycloakProviderImport } = KeycloakProviderImport as any;
const keycloakProvider = KeycloakProvider.default({
  clientId: keycloak.clientId,
  clientSecret: keycloak.clientSecret,
  issuer: issuerURL.href,
});

export default NuxtAuthHandler({
  secret: auth.secret,
  session: { maxAge: 86400 },
  providers: [keycloakProvider],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.bnet_token) {
        session.user.profile ??= await fetchBnetUserProfile(token.bnet_token);
      }

      return session;
    },

    async jwt({ token, account }) {
      if (account) {
        if (account.provider) token.provider = account.provider;
        if (account.access_token) token.access_token = account.access_token;
        if (account.id_token) token.id_token = account.id_token;
        if (account.access_token) token.bnet_token = await fetchBnetUserToken(account.access_token);

        console.log(account.access_token);
      }

      return token;
    },
  },
  events: {
    async signOut({ token }) {
      if (token.provider === keycloakProvider.id && token.id_token) {
        await $fetch("/protocol/openid-connect/logout", {
          baseURL: issuerURL.href,
          query: { id_token_hint: token.id_token },
        });
      }
    },
  },
});

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      profile: {
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
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    bnet_token?: string;
    access_token?: string;
    id_token?: string;
    provider?: string;
  }
}

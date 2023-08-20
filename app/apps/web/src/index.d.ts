import { Region } from "@longtemps/blizzard";

interface AuthRuntimeConfig {
  origin: string
  basePath: string
  secret: string
}

interface KeycloakRuntimeConfig {
  origin: string
  realm: string
  clientId: string
  clientSecret: string
}

interface BattlenetRuntimeConfig {
  region: Region.TagKey
  clientId: string
  clientSecret: string
}

interface GuildPublicRuntimeConfig {
  connectedRealmId: string
  realmSlug: string
  nameSlug: string
}

declare module 'nuxt/schema' {
  export interface RuntimeConfig {
    auth: AuthRuntimeConfig
    keycloak: KeycloakRuntimeConfig
    battlenet: BattlenetRuntimeConfig
  }

  export interface PublicRuntimeConfig {
    guild: GuildPublicRuntimeConfig
  }
}

declare module 'nitropack' {
  export interface NitroRuntimeConfig {
    auth: AuthRuntimeConfig
    keycloak: KeycloakRuntimeConfig
    battlenet: BattlenetRuntimeConfig
  }

  export interface NitroRuntimeHooks {}
}

export { };

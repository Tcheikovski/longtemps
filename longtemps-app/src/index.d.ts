import { BattlenetRuntimeConfig, Locale as BlizzardLocale } from "./blizzard";

declare module "nuxt/schema" {
  interface RuntimeConfig {
    battlenet: BattlenetRuntimeConfig;
  }

  interface PublicRuntimeConfig {
    battlenet: BattlenetPublicRuntimeConfig;
  }
}

declare module "nitropack" {
  interface NitroRuntimeConfig {
    battlenet: BattlenetRuntimeConfig;
  }
}

declare module "vue-i18n" {
  export declare type Locale = BlizzardLocale;
}

declare module "@intlify/core-base" {
  export declare type Locale = BlizzardLocale;
}

declare global {
  interface String {
    toLowerCase<T extends this>(this: T): Lowercase<T>
  }
}

export {};

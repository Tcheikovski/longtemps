import { createResolver } from "@nuxt/kit";

const resolver = createResolver(import.meta.url);

export default defineNuxtConfig({
  srcDir: "./src",
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-lodash",
  ],
  runtimeConfig: {
    auth: {
      secret: "",
    },
    keycloak: {
      host: "",
      realm: "",
      clientId: "",
      clientSecret: "",
    },
    battlenet: {
      region: "",
      clientId: "",
      clientSecret: "",
    },
    public: {
      guild: {
        connectedRealmId: "",
        realmSlug: "",
        nameSlug: "",
      },
    },
  },
  alias: {
    "@blizzard": resolver.resolve("./src/blizzard"),
  },
  imports: {
    dirs: [resolver.resolve("./src/stores")],
  },
  auth: {
    origin: "https://longtemps.org",
    defaultProvider: "keycloak",
  },
  devServer: {
    port: 7000,
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  tailwindcss: {
    configPath: resolver.resolve("./src/tailwind.config.ts"),
    cssPath: resolver.resolve("./src/assets/tailwind.scss"),
  },
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  i18n: {
    defaultLocale: "fr_FR",
    vueI18n: "./src/i18n.config.ts",
    locales: [
      { code: "fr_FR", iso: "fr-FR" },
      { code: "de_DE", iso: "de-DE" },
      { code: "en_GB", iso: "en-GB" },
      { code: "pt_PT", iso: "pt-PT" },
      { code: "es_ES", iso: "es-ES" },
      { code: "it_IT", iso: "it-IT" },
      { code: "ru_RU", iso: "ru-RU" },
      { code: "en_US", iso: "en-US" },
      { code: "es_MX", iso: "es-MX" },
      { code: "pt_BR", iso: "pt-BR" },
      { code: "ko_KR", iso: "ko-KR" },
      { code: "zh_TW", iso: "zh-TW" },
      { code: "zh_CN", iso: "zh-CN" },
    ],
  },
  vite: {
    server: {
      hmr: {
        protocol: "wss",
        clientPort: 443,
        port: 24678,
        path: "hmr/",
      },
    },
  },
  nitro: {
    storage: {
      blizzard: {
        driver: "fs",
        base: "./data/blizzard",
      },
      keycloak: {
        driver: "fs",
        base: "./data/keycloak",
      },
    },
  },
});

module.exports = {
  apps: [
    {
      name: "longtemps",
      script: "./.output/server/index.mjs",
      env: {
        NEXTAUTH_URL: "https://longtemps.org",
        NUXT_AUTH_SECRET: "M25XHTQthHJRa4koYNTAuKZp8MEFAkCw",
        NUXT_KEYCLOAK_HOST: "https://auth.zigoulero.net",
        NUXT_KEYCLOAK_REALM: "longtemps",
        NUXT_KEYCLOAK_CLIENT_ID: "longtemps-app",
        NUXT_KEYCLOAK_CLIENT_SECRET: "77cMwGrrYzktHoqXCzKZvUQ68Anvopak",
        NUXT_BATTLENET_REGION: "eu",
        NUXT_BATTLENET_CLIENT_ID: "072ebb48ed6f45a3a153b983a5ec2da6",
        NUXT_BATTLENET_CLIENT_SECRET: "MqvujJ5N2sMCeEks4gdGEk2Wy5cIe2dd",
        NUXT_PUBLIC_GUILD_CONNECTEC_REALM_ID: "1621",
        NUXT_PUBLIC_GUILD_REALM_SLUG: "dalaran",
        NUXT_PUBLIC_GUILD_NAME_SLUG: "longtemps",
      },
    },
  ],
};

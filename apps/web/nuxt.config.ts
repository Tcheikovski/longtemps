import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)
export default defineNuxtConfig({
  srcDir: './src',

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-lodash'
  ],

  runtimeConfig: {
    auth: {
      origin: '',
      basePath: '',
      secret: ''
    },
    keycloak: {
      origin: '',
      realm: '',
      clientId: '',
      clientSecret: ''
    },
    battlenet: {
      region: '',
      clientId: '',
      clientSecret: ''
    },
    public: {
      guild: {
        connectedRealmId: '',
        realmSlug: '',
        nameSlug: ''
      }
    }
  },

  auth: {
    origin: process.env.NUXT_AUTH_ORIGIN,
    basePath: process.env.NUXT_AUTH_BASE_PATH,
    defaultProvider: 'keycloak',
    enableSessionRefreshOnWindowFocus: false,
    enableSessionRefreshPeriodically: false
  },

  tailwindcss: {
    configPath: resolver.resolve('./src/tailwind.config.ts'),
    cssPath: resolver.resolve('./src/assets/tailwind.scss')
  },

  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },

  i18n: {
    defaultLocale: 'fr_FR',
    vueI18n: './src/i18n.config.ts',
    locales: [
      { code: 'fr_FR', iso: 'fr-FR' },
      { code: 'de_DE', iso: 'de-DE' },
      { code: 'en_GB', iso: 'en-GB' },
      { code: 'pt_PT', iso: 'pt-PT' },
      { code: 'es_ES', iso: 'es-ES' },
      { code: 'it_IT', iso: 'it-IT' },
      { code: 'ru_RU', iso: 'ru-RU' },
      { code: 'en_US', iso: 'en-US' },
      { code: 'es_MX', iso: 'es-MX' },
      { code: 'pt_BR', iso: 'pt-BR' },
      { code: 'ko_KR', iso: 'ko-KR' },
      { code: 'zh_TW', iso: 'zh-TW' },
      { code: 'zh_CN', iso: 'zh-CN' }
    ]
  },

  devServer: {
    port: Number(process.env.PORT)
  },

  vite: {
    server: {
      hmr: {
        protocol: 'wss',
        clientPort: 443,
        port: Number(process.env.PORT_WS),
        path: 'hmr/',
        timeout: 5
      }
    }
  },

  imports: {
    dirs: [resolver.resolve('./src/stores')]
  },

  nitro: {
    storage: {
      auth: { driver: 'lruCache' }
    },

    externals: {
      external: ['@longtemps/core', '@longtemps/blizzard']
    },

    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
            target: 'ES2016'
          }
        }
      }
    },

    typescript: {
      tsConfig: {
        extends: resolver.resolve('../../tsconfig.json'),
        compilerOptions: {
          experimentalDecorators: true,
          target: 'ES2016'
        }
      }
    }

  },

  typescript: {
    strict: true,
    typeCheck: false,
    tsConfig: {
      extends: resolver.resolve('../../tsconfig.json'),
      compilerOptions: {
        experimentalDecorators: true
      }
    }
  }
})

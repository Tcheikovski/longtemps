import KeycloakProvider, { type KeycloakProfile } from 'next-auth/providers/keycloak'
import { Auth } from '@longtemps/blizzard'
import { defu } from 'defu'
import { useBattlenetService } from '../../utils/blizzard'
import { NuxtAuthHandler } from '#auth'

const KeycloakProviderModule: { default: typeof KeycloakProvider } = KeycloakProvider as any

interface LongtempsProfile extends KeycloakProfile {
  sub: string
  preferred_username: string
  email: string
}

const { auth, keycloak } = useRuntimeConfig()
const keycloakProvider = KeycloakProviderModule.default<LongtempsProfile>({
  clientId: keycloak.clientId,
  clientSecret: keycloak.clientSecret,
  issuer: `${keycloak.origin}/realms/${keycloak.realm}`,
  profile: profile => ({
    id: profile.sub,
    name: profile.preferred_username,
    email: profile.email
  })
})

export default NuxtAuthHandler({
  secret: auth.secret,
  providers: [keycloakProvider],
  callbacks: {
    jwt: async ({ token, account, user, trigger }) => {
      if (trigger === 'signIn') {
        token.name = user.name
        token.email = user.email
        token.provider = account?.provider

        if (account?.access_token) {
          token.accessToken = account.access_token
          if (account.provider === keycloakProvider.id) {
            const keycloak = useKeycloakService()
            token.blizzardToken = await keycloak.fetchBattlenetToken(account.access_token)
          }
        }
      }

      return token
    },

    session: async ({ session, token }) => {
      const { name, email, blizzardToken } = token
      session.user = defu({ name, email }, session.user)

      if (blizzardToken) {
        const battlenet = useBattlenetService()
        session.user.profile ??= await battlenet.fetch<Auth.Profile>('/profile/user/wow', 'profile', blizzardToken).then(profile => ({
          id: profile.id,
          wow_accounts: profile.wow_accounts
        }))
      }

      return session
    }

  },

  events: {
    async signOut ({ token }) {
      if (token?.provider === keycloakProvider.id && token.accessToken) {
        const service = useKeycloakService()
        await service.revokeToken(token.accessToken)
      }
    }
  }
})

declare module 'next-auth' {
  export interface User {
    name: string;
    email: string;
  }

  export interface Session {
    user: {
      name: string;
      email: string;
      profile: Omit<Auth.Profile, 'collections'>
    };
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    sub: string
    name: string;
    email: string;
    provider?: string;
    accessToken?: string;
    blizzardToken?: string;
  }
}

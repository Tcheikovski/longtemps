import KeycloakProviderImport from 'next-auth/providers/keycloak'
import { DefaultSession, User } from 'next-auth'
import { WowAccount } from '../../../blizzard'
import { NuxtAuthHandler } from '#auth'

const KeycloakProvider: { default: typeof KeycloakProviderImport } = KeycloakProviderImport as any

const { auth, keycloak } = useRuntimeConfig()
const issuerURL = new URL(`/realms/${keycloak.realm}`, keycloak.host)

const provider = KeycloakProvider.default({
  clientId: keycloak.clientId,
  clientSecret: keycloak.clientSecret,
  issuer: issuerURL.href,
  profile: async (profile, tokens) => {
    const user: User = {
      id: profile.sub,
      name: profile.preferred_username,
      email: profile.email,
      image: profile.picture,
      wowAccounts: [] as WowAccount[]
    }

    if (tokens.access_token) {
      const token = await fetchBnetUserToken(tokens.access_token)
      const profile = await fetchBnetUserProfile(token)
      user.wowAccounts = profile.wow_accounts
    }

    return user as User
  }
})

export default NuxtAuthHandler({
  secret: auth.secret,
  providers: [provider],
  /*   adapter,
  session: {
    strategy: "database",
  }, */
  callbacks: {
    session ({ session, token }) {
      if (token.user) { session.user = token.user }
      return session
    },

    jwt ({ token, account, user }) {
      if (user) { token.user = user }

      if (account) {
        if (account.provider) { token.provider = account.provider }
        if (account.id_token) { token.id_token = account.id_token }
      }

      return token
    }
  },
  events: {
    async signOut ({ token }) {
      if (token?.provider === provider.id && token?.id_token) {
        await $fetch('/protocol/openid-connect/logout', {
          baseURL: issuerURL.href,
          query: { id_token_hint: token.id_token }
        })
      }
    }
  }
})

declare module 'next-auth' {
  interface User {
    wowAccounts: WowAccount[];
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
    provider?: string;
    id_token?: string;
  }
}

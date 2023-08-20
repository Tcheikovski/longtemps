import { Issuer, Client, TokenSet } from 'openid-client'
import { Inject, Service, Token } from '@longtemps/di'
import { AuthEndpoint } from './constants'

export type AuthIssuer = Issuer<AuthClient>
export const AuthIssuer = new Token<AuthIssuer>()

export type AuthClient = Client
export const AuthClient = new Token<AuthClient>()

export const AuthService = new Token<AuthService>()
export interface AuthService {
  getIssuer(): AuthIssuer
  getClient(): AuthClient
  getEndpoint(): AuthEndpoint
  getToken(): Promise<TokenSet>
}

@Service({ id: AuthService })
export class BaseAuthService implements AuthService {
  private readonly issuer: Issuer
  private readonly client: Client
  private readonly authEndpoint: AuthEndpoint

  private tokenSet: TokenSet | null

  constructor (@Inject(AuthIssuer) issuer: Issuer, @Inject(AuthClient) client: Client, @Inject(AuthEndpoint) authEndpoint:AuthEndpoint) {
    this.issuer = issuer
    this.client = client
    this.authEndpoint = authEndpoint
    this.tokenSet = null
  }

  getIssuer (): Issuer {
    return this.issuer
  }

  getClient (): Client {
    return this.client
  }

  getEndpoint (): AuthEndpoint {
    return this.authEndpoint
  }

  async getToken (): Promise<TokenSet> {
    if (this.tokenSet && !this.tokenSet.expired()) {
      return this.tokenSet
    }

    this.tokenSet = await this.client.grant({
      grant_type: 'client_credentials'
    })

    return this.tokenSet
  }
}

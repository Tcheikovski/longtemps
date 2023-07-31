import { Provider } from '@nestjs/common'
import { Client } from 'openid-client'
import { AuthConfig } from '../auth.config'
import { OidcIssuer } from './oidc-issuer.provider'

export type OidcClient = Client;
export const OidcClient = Symbol('OidcClient')
export const OidcClientProvider: Provider<OidcClient> = {
  provide: OidcClient,
  inject: [OidcIssuer, AuthConfig.KEY],
  useFactory: (issuer: OidcIssuer, config: AuthConfig) => {
    return new issuer.Client({
      client_id: config.clientId,
      client_secret: config.clientSecret
    })
  }
}

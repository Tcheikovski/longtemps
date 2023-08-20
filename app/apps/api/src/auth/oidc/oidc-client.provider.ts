import { Provider } from '@nestjs/common'
import { Issuer, Client } from 'openid-client'
import { AuthConfig } from '../auth.config'
import { OIDC_ISSUER, OIDC_CLIENT } from '../auth.constants'

export const OidcClientProvider: Provider<Client> = {
  provide: OIDC_CLIENT,
  inject: [OIDC_ISSUER, AuthConfig.KEY],
  useFactory: (issuer: Issuer, config: AuthConfig) => {
    return new issuer.Client({
      client_id: config.clientId,
      client_secret: config.clientSecret
    })
  }
}

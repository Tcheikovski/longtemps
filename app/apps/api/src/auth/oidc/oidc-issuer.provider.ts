import { Provider } from '@nestjs/common'
import { Issuer } from 'openid-client'
import { AuthConfig } from '../auth.config'
import { OIDC_ISSUER } from '../auth.constants'

export const OidcIssuerProvider: Provider<Issuer> = {
  provide: OIDC_ISSUER,
  inject: [AuthConfig.KEY],
  useFactory: async (config: AuthConfig) => {
    return await Issuer.discover(config.issuer)
  }
}

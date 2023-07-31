import { Provider } from '@nestjs/common'
import { Issuer } from 'openid-client'
import { AuthConfig } from '../auth.config'

export type OidcIssuer = Issuer;
export const OidcIssuer = Symbol('OidcIssuer')
export const OidcIssuerProvider: Provider<OidcIssuer> = {
  provide: OidcIssuer,
  inject: [AuthConfig.KEY],
  useFactory: async (config: AuthConfig) => {
    return await Issuer.discover(config.issuer)
  }
}

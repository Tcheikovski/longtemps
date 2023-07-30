import { Provider } from '@nestjs/common';
import { Client } from 'openid-client';
import { OidcIssuer } from './oidc-issuer.provider';
import { AuthConfig } from '../auth.config';

export type OidcClient = Client;
export const OidcClient = Symbol('OidcClient');
export const OidcClientProvider: Provider<OidcClient> = {
  provide: OidcClient,
  inject: [OidcIssuer, AuthConfig.KEY],
  useFactory: (issuer: OidcIssuer, config: AuthConfig) => {
    return new issuer.Client({
      client_id: config.clientId,
      client_secret: config.clientSecret,
    });
  },
};

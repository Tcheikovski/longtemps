import { Inject, Injectable } from '@nestjs/common'
import { Client } from 'openid-client'
import { Introspection } from '../auth.types'
import { OIDC_CLIENT } from '../auth.constants'

@Injectable()
export class OidcService {
  @Inject(OIDC_CLIENT)
  private declare readonly client: Client

  async introspectToken (token: string): Promise<Introspection> {
    return await this.client.introspect(token, 'Bearer') as Introspection
  }
}

import { Service, Inject } from '@longtemps/di'
import { H3Event } from 'h3'
import { TokenSet } from 'openid-client'
import { KeycloakOpenidService, OpenidService } from './Openid'
import { getToken } from '#auth'

@Service({ global: true })
export class KeycloakService {
  @Inject(() => KeycloakOpenidService)
  declare private readonly openid: OpenidService

  public async getClientToken (): Promise<string> {
    return await this.openid.getClientToken()
  }

  public async getUserToken (event: H3Event): Promise<string | null> {
    const token = await getToken({ event })
    return token?.blizzardToken ?? null
  }

  public async revokeToken (token: string): Promise<void> {
    return await this.openid.revoke(token)
  }

  async fetchMembers () {
    const token = await this.openid.getClientToken()
    const baseURL = this.openid.getIssuerURL().replace('realms/', 'admin/realms/') + '/'
    const url = new URL('users', baseURL)
    url.searchParams.set('briefRepresentation', 'true')

    return await this.openid.fetch(url, token)
  }

  async fetchBattlenetToken (token: string): Promise<string> {
    const baseURL = this.openid.getIssuerURL() + '/'
    const url = new URL('broker/battlenet/token', baseURL)
    const tokenSet = await this.openid.fetch<TokenSet>(url, token)
    return tokenSet.access_token as string
  }
}

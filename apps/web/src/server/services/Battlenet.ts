import { Service, Inject } from '@longtemps/di'
import { API_ENDPOINT, Api, Region } from '@longtemps/blizzard'
import { H3Event } from 'h3'
import { BattlenetOpenidService, OpenidService } from './Openid'
import { getToken } from '#auth'

@Service({ global: true })
export class BattlenetService {
  @Inject('battlenet.region')
  declare private readonly region: Region.TagKey

  @Inject(() => BattlenetOpenidService)
  declare private readonly openid: OpenidService

  public getApiURL () {
    return API_ENDPOINT[this.region]
  }

  public async getAccessToken (event: H3Event) {
    const token = await getToken({ event })
    return token?.blizzardToken
  }

  public async fetch<T> (path: string | URL, namespace: Api.Namespace, token?: string): Promise<T> {
    if (!token) { token = await this.openid.getClientToken() }

    const url = new URL(path, this.getApiURL())
    const headers = new Headers({ 'Battlenet-Namespace': `${namespace}-${this.region}` })
    return await this.openid.fetch<T>(url, token, { headers })
  }
}

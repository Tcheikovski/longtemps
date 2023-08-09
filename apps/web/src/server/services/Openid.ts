import { Inject, Service } from '@longtemps/di'
import { Issuer, Client } from 'openid-client'
import { Storage } from 'unstorage'

export interface OpenidFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE' | 'OPTIONS' | 'TRACE' | 'PATCH'
  headers?: HeadersInit;
}

export interface OpenidService {
  getIssuerURL(): string
  getClientId(): string
  getClientSecret(): string
  getClientToken(): Promise<string>
  fetch<T>(path: string | URL, token: string, options?: OpenidFetchOptions): Promise<T>
  revoke(token: string): Promise<void>
}

@Service({ global: true })
export class OpenidServiceFactory {
  @Inject('keycloak.openid-client')
  private declare keycloakClient: Client

  @Inject('battlenet.openid-client')
  private declare battlenetClient: Client

  @Inject('auth.storage')
  private declare storage: Storage

  public createForKeycloak (): OpenidService {
    return new KeycloakOpenidService(this.keycloakClient, this.storage)
  }

  public createForBattlenet (): OpenidService {
    return new BattlenetOpenidService(this.battlenetClient, this.storage)
  }

  public static async createClient (issuerURL: string, clientId: string, clientSecret: string): Promise<Client> {
    const issuer = await Issuer.discover(issuerURL)
    return new issuer.Client({ client_id: clientId, client_secret: clientSecret })
  }
}

abstract class BaseOpenidService implements OpenidService {
  protected readonly client: Client
  protected readonly storage: Storage
  protected abstract readonly storageKey: string

  constructor (client: Client, storage: Storage) {
    this.client = client
    this.storage = storage
  }

  getIssuerURL (): string {
    return this.client.issuer.metadata.issuer
  }

  getClientId (): string {
    return this.client.metadata.client_id
  }

  getClientSecret (): string {
    return this.client.metadata.client_secret as string
  }

  async getClientToken (): Promise<string> {
    let accessToken = await this.storage.getItem<string>(this.storageKey)

    if (!accessToken) {
      const tokenSet = await this.client.grant({ grant_type: 'client_credentials' })
      const ttl = tokenSet.expires_in! * 1000

      accessToken = tokenSet.access_token!
      await this.storage.setItem(this.storageKey, accessToken, { ttl })
    }

    return accessToken
  }

  async fetch<T> (path: string | URL, token: string, options?: OpenidFetchOptions): Promise<T> {
    const headers = new Headers(options?.headers ?? {})
    const response = await this.client.requestResource(path, token, {
      method: options?.method ?? 'GET',
      headers: Object.fromEntries(headers)
    })

    if (!response.body) { throw createError(response) }

    const data = response.body.toString()
    return JSON.parse(data)
  }

  async revoke (token: string): Promise<void> {
    await this.client.revoke(token)
  }
}

@Service({ global: true, factory: [OpenidServiceFactory, 'createForKeycloak'] })
export class KeycloakOpenidService extends BaseOpenidService {
  protected readonly storageKey = 'keycloak_client_access_token'
}

@Service({ global: true, factory: [OpenidServiceFactory, 'createForBattlenet'] })
export class BattlenetOpenidService extends BaseOpenidService {
  protected readonly storageKey = 'battlenet_client_access_token'
}

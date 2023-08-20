import { Inject, Service, Token } from '@longtemps/di'
import { AnyObject } from '@longtemps/core'
import { defu } from 'defu'
import { TokenSet } from 'openid-client'
import { Api } from '../types'
import { AuthService } from './AuthService'
import { ApiEndpoint } from './constants'
import { ApiError, ApiErrorData } from './ApiError'

export interface ApiService {
  getEndpoint(): ApiEndpoint
  fetch<T extends AnyObject>(path: string, namespace: Api.Namespace, token?: string | TokenSet): Promise<T>
}
export const ApiSerice = new Token<ApiService>()

@Service()
export class BaseApiService implements ApiService {
  private readonly auth: AuthService
  private readonly apiEndpoint: ApiEndpoint

  constructor (@Inject(AuthService) auth: AuthService, @Inject(ApiEndpoint) apiEndpoint: ApiEndpoint) {
    this.auth = auth
    this.apiEndpoint = apiEndpoint
  }

  getEndpoint (): ApiEndpoint {
    return this.apiEndpoint
  }

  async fetch<T> (path: string, namespace: Api.Namespace, token?: string | TokenSet): Promise<T> {
    token ??= await this.auth.getToken()
    const client = this.auth.getClient()
    const url = new URL(path, this.apiEndpoint)
    const headers = new Headers()
    headers.set('Battlenet-Namespace', namespace)

    const response = await client.requestResource(url, token, {
      method: 'GET',
      headers: Object.fromEntries(headers)
    })

    const body = response.body?.toString('utf-8')
    const data = body ? JSON.parse(body) : {}

    if (response.statusCode && response.statusCode >= 400) {
      const errorData = defu<ApiErrorData, [ApiErrorData]>(data, {
        code: response.statusCode,
        detail: response.statusMessage,
        type: response.statusMessage
      })

      throw new ApiError(errorData)
    }

    return data
  }
}

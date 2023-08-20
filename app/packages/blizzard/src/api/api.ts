import { Container, ContainerInstance } from '@longtemps/di'
import { defu } from 'defu'
import { Issuer } from 'openid-client'
import { Region } from '../types'
import { OAUTH2_ENDPOINTS } from '../constants'
import { AuthIssuer, AuthClient } from './AuthService'
import { API_ENDPOINTS, ApiEndpoint, AuthEndpoint } from './constants'

export type ApiOptions = {
  container?: typeof Container | ContainerInstance
  region?: Region.TagKey
  clientId: string
  clientSecret: string
}

export const createApi = async (options: ApiOptions) => {
  const { container: c, region, clientId, clientSecret } = defu(options, {
    container: Container,
    region: 'eu'
  } as const)

  const apiEndpoint = API_ENDPOINTS[region]
  const oauth2Endpoint = OAUTH2_ENDPOINTS[region]

  const issuer = await Issuer.discover(oauth2Endpoint)
  const client = new issuer.Client({ client_id: clientId, client_secret: clientSecret })
  const container = c as ContainerInstance

  container.set(ApiEndpoint, apiEndpoint)
  container.set(AuthEndpoint, oauth2Endpoint)
  container.set(AuthIssuer, issuer)
  container.set(AuthClient, client)
}

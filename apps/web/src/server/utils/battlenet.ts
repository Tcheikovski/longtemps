import type { H3Event } from 'h3'
import { regionApiEndpoints, regionOAuth2Endpoints, BlizzardProfile, BlizzardToken } from '@blizzard'
import { getToken } from '#auth'

export const useBnetClientToken = async (event: H3Event): Promise<string> => {
  const now = Date.now()
  const store = useStorage('blizzard')

  let token = await store.getItem<{
    value: string;
    exp: number;
  }>('access_token')

  if (!token || token.exp < now) {
    const { region, clientId, clientSecret } = useRuntimeConfig(event).battlenet

    const baseURL = regionOAuth2Endpoints[region]
    const credentials = btoa(`${clientId}:${clientSecret}`)

    const headers = new Headers()
    const body = new FormData()

    headers.set('Authorization', `Basic ${credentials}`)
    body.set('grant_type', 'client_credentials')
    const response = await $fetch<BlizzardToken>('/token', { method: 'POST', baseURL, headers, body })
    token = { value: response.access_token, exp: response.expires_in + now }

    store.setItem('access_token', token)
  }

  return token.value
}

export const useBnetUserToken = async (event: H3Event): Promise<string | undefined> => {
  const token = await getToken({ event })
  return token?.bnet_token
}

export const fetchBnetUserToken = async (token: string): Promise<string> => {
  const { keycloak } = useRuntimeConfig()

  const baseURL = keycloak.host
  const headers = new Headers({ Authorization: `Bearer ${token}` })

  const response = await $fetch<BlizzardToken>(`/realms/${keycloak.realm}/broker/battlenet/token`, {
    baseURL,
    headers
  })

  return response.access_token
}

export const fetchBnetUserProfile = async (token: string) => {
  const config = useRuntimeConfig()
  const region = config.battlenet.region
  return await $fetch<BlizzardProfile>('/profile/user/wow', {
    baseURL: regionApiEndpoints[region],
    query: { access_token: token, namespace: `profile-${region}` }
  })
}

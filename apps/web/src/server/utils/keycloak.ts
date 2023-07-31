// 77cMwGrrYzktHoqXCzKZvUQ68Anvopak

interface KeycloakClientTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export const useKeycloakClientToken = async () => {
  const now = Date.now()
  const store = useStorage('keycloak')

  let token = await store.getItem<{
    value: string;
    exp: number;
  }>('access_token')

  if (!token || token.exp < now) {
    const { keycloak } = useRuntimeConfig()
    const { clientId, clientSecret, host, realm } = keycloak

    const baseURL = host
    const credentials = btoa(`${clientId}:${clientSecret}`)

    const headers = new Headers()
    const body = new URLSearchParams()
    headers.set('Authorization', `Basic ${credentials}`)
    body.set('grant_type', 'client_credentials')

    const response = await $fetch<KeycloakClientTokenResponse>(`/realms/${realm}/protocol/openid-connect/token`, {
      method: 'POST',
      baseURL,
      headers,
      body
    })

    token = { value: response.access_token, exp: response.expires_in + now }
    await store.setItem('access_token', token)
  }

  return token.value
}

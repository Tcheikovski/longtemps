import { OAUTH2_ENDPOINTS } from '@longtemps/blizzard'
import { OpenidServiceFactory } from '~/server/services'

export default defineNitroPlugin(async () => {
  const { keycloak, battlenet } = useRuntimeConfig()
  const container = useContainer()

  const keycloakClient = await OpenidServiceFactory.createClient(`${keycloak.origin}/realms/${keycloak.realm}`, keycloak.clientId, keycloak.clientSecret)
  const battlenetClient = await OpenidServiceFactory.createClient(OAUTH2_ENDPOINTS[battlenet.region], battlenet.clientId, battlenet.clientSecret)

  container.set([
    { id: 'keycloak.openid-client', value: keycloakClient },
    { id: 'battlenet.openid-client', value: battlenetClient },
    { id: 'battlenet.region', value: battlenet.region },
    { id: 'auth.storage', value: useStorage('auth') }
  ])
})

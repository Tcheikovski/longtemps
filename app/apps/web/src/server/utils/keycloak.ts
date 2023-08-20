import { KeycloakService } from '~/server/services'

export const useKeycloakService = () => useContainer().get(KeycloakService)

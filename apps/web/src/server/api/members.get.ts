export default defineEventHandler(async () => {
  const keycloak = useKeycloakService()
  return await keycloak.fetchMembers()
})

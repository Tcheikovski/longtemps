export default defineEventHandler(async () => {
  const { keycloak } = useRuntimeConfig();
  const token = await useKeycloakClientToken();
  const baseURL = keycloak.host;
  const headers = new Headers([["Authorization", `Bearer ${token}`]]);
  const response = await $fetch(`admin/realms/${keycloak.realm}/users`, {
    baseURL,
    headers,
    query: { briefRepresentation: true },
  });

  return response;
});

export const useAuthUser = () => {
  const { data } = useAuth()
  return computed(() => data.value?.user ?? null)
}

export const useAuthUsername = () => {
  const user = useAuthUser()
  return useUsername(() => user.value?.name)
}

export const useSignIn = () => {
  const { signIn } = useAuth()
  return () => signIn('keycloak', { redirect: true })
}

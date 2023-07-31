import { H3Event } from 'h3'
import { getToken } from '#auth'

export const useApiToken = async (event: H3Event): Promise<string | undefined> => {
  const token = await getToken({ event })
  return token?.access_token
}

export const useApiFetch = async (event: H3Event) => {
  const baseURL = 'http://localhost:6900'
  const headers = new Headers()
  const token = await useApiToken(event)
  if (token) { headers.set('Authorization', `Bearer ${token}`) }

  return $fetch.create({
    baseURL,
    headers
  })
}

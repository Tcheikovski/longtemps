import { H3Event } from 'h3'

const getProfile = async (event: H3Event) => {
  const token = await useBnetUserToken(event)
  if (!token) { throw createError({ statusCode: 401 }) }

  const blizzardFetch = await useBlizzardFetch(event)
  const character = await blizzardFetch.profile<Record<string, unknown>>('/profile/user/wow')

  return character
}

export default defineEventHandler(event => getProfile(event))

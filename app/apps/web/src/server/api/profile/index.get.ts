import { Auth } from '@longtemps/blizzard'
import { H3Event } from 'h3'

const getProfile = async (event: H3Event) => {
  const service = useBattlenetService()
  const token = await service.getAccessToken(event)

  return await service.fetch<Auth.Profile>('/profile/user/wow', 'profile', token)
}

export default defineEventHandler(event => getProfile(event))

import { PlayableSpecializationMedia } from '@blizzard'
import { H3Event } from 'h3'

const getPlayableSpecializationMedia = async (event: H3Event) => {
  const id = getRouterParam(event, 'id')
  const blizzardFetch = await useBlizzardFetch(event)
  const playableSpecializationMedia = await blizzardFetch.static<PlayableSpecializationMedia>(
    `/data/wow/media/playable-specialization/${id}`
  )
  return playableSpecializationMedia
}

const getCachedPlayableSpecializationMedia = cachedFunction(getPlayableSpecializationMedia, {
  name: 'playable-specialization-media',
  getKey: event => getRouterParam(event, 'id') ?? '',
  maxAge: 60 * 60 * 24
})

export default defineEventHandler(event => getCachedPlayableSpecializationMedia(event))

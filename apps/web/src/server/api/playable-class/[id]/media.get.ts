import { PlayableClassMedia } from '@blizzard'
import { H3Event } from 'h3'

const getPlayableClassMedia = async (event: H3Event) => {
  const id = getRouterParam(event, 'id')
  const blizzardFetch = await useBlizzardFetch(event)
  const playableClassMedia = await blizzardFetch.static<PlayableClassMedia>(`/data/wow/media/playable-class/${id}`)
  return playableClassMedia
}

const getCachedPlayableClassMedia = cachedFunction(getPlayableClassMedia, {
  name: 'playable-class-media',
  getKey: event => getRouterParam(event, 'id') ?? '',
  maxAge: 60 * 60 * 24
})

export default defineEventHandler(event => getCachedPlayableClassMedia(event))

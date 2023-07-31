import { PlayableRace } from '@blizzard'
import { H3Event } from 'h3'

const getPlayableRace = async (event: H3Event) => {
  const id = getRouterParam(event, 'id')
  const blizzardFetch = await useBlizzardFetch(event)
  const playableRace = await blizzardFetch.static<PlayableRace>(`/data/wow/playable-race/${id}`)

  return playableRace
}

const getCachedPlayableRace = cachedFunction(getPlayableRace, {
  name: 'playable-race',
  getKey: event => getRouterParam(event, 'id') ?? '',
  maxAge: 60 * 60 * 24
})

export default defineEventHandler(event => getCachedPlayableRace(event))

import { Region } from '#blizzard/types'

type ApiEndpoints = Record<Region.Key, `https://${string}`>
type AuthEndpoints = Record<Region.Key, `https://oauth.${string}`>

export const API_ENDPOINT = {
  us: 'https://us.api.blizzard.com',
  eu: 'https://eu.api.blizzard.com',
  kr: 'https://kr.api.blizzard.com',
  tw: 'https://tw.api.blizzard.com',
  cn: 'https://gateway.battlenet.com.cn'
} as const satisfies ApiEndpoints

export const OAUTH2_ENDPOINTS = {
  us: 'https://oauth.battle.net' as const,
  eu: 'https://oauth.battle.net' as const,
  kr: 'https://oauth.battle.net' as const,
  tw: 'https://oauth.battle.net' as const,
  cn: 'https://oauth.battlenet.com.cn' as const
} as const satisfies AuthEndpoints

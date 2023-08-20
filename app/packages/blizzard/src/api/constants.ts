import { Token } from '@longtemps/di'
import { Region } from '../types'

export const ApiEndpoint = new Token<ApiEndpoint>()
export type ApiEndpoint = `https://${string}`

export const AuthEndpoint = new Token<AuthEndpoint>()
export type AuthEndpoint = `https://oauth.${string}`

export const API_ENDPOINTS = {
  us: 'https://us.api.blizzard.com',
  eu: 'https://eu.api.blizzard.com',
  kr: 'https://kr.api.blizzard.com',
  tw: 'https://tw.api.blizzard.com',
  cn: 'https://gateway.battlenet.com.cn'
} as const satisfies Record<Region.TagKey, ApiEndpoint>

export const AUTH_ENDPOINTS = {
  us: 'https://oauth.battle.net' as const,
  eu: 'https://oauth.battle.net' as const,
  kr: 'https://oauth.battle.net' as const,
  tw: 'https://oauth.battle.net' as const,
  cn: 'https://oauth.battlenet.com.cn' as const
} as const satisfies Record<Region.TagKey, AuthEndpoint>

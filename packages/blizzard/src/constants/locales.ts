import { Locale, Region } from '#blizzard/types'

export const LOCALES: Locale.Code[] = Object.values(Locale.Code)
export const REGION_LOCALES: Record<Region.Key, Locale.Code[]> = {
  us: ['en_US', 'es_MX', 'pt_BR'],
  eu: ['en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'pt_PT', 'it_IT'],
  kr: ['ko_KR'],
  tw: ['zh_TW'],
  cn: ['zh_CN']
}

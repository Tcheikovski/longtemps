import { Locale, Region } from '../types'

export const LOCALES = ['enUS', 'esMX', 'ptBR', 'ptPT', 'deDE', 'enGB', 'esES', 'frFR', 'itIT', 'ruRU', 'koKR', 'zhTW', 'zhCN'] as const satisfies readonly Locale.Code[]
export const REGION_LOCALES: Record<Region.TagKey, Locale[]> = {
  us: ['en_US', 'es_MX', 'pt_BR'],
  eu: ['en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'pt_PT', 'it_IT'],
  kr: ['ko_KR'],
  tw: ['zh_TW'],
  cn: ['zh_CN']
}

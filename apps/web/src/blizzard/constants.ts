export enum Locale {
  en_US = 'en_US',
  es_MX = 'es_MX',
  pt_BR = 'pt_BR',
  pt_PT = 'pt_PT',
  de_DE = 'de_DE',
  en_GB = 'en_GB',
  es_ES = 'es_ES',
  fr_FR = 'fr_FR',
  it_IT = 'it_IT',
  ru_RU = 'ru_RU',
  ko_KR = 'ko_KR',
  zh_TW = 'zh_TW',
  zh_CN = 'zh_CN',
}

export enum Region {
  NorthAmerica = 'us',
  Europe = 'eu',
  Korea = 'kr',
  Taiwan = 'tw',
  China = 'cn',
}

export const regionApiEndpoints = {
  us: 'https://us.api.blizzard.com' as const,
  eu: 'https://eu.api.blizzard.com' as const,
  kr: 'https://kr.api.blizzard.com' as const,
  tw: 'https://tw.api.blizzard.com' as const,
  cn: 'https://gateway.battlenet.com.cn' as const
} satisfies Record<Region, string>

export const regionOAuth2Endpoints = {
  us: 'https://oauth.battle.net' as const,
  eu: 'https://oauth.battle.net' as const,
  kr: 'https://oauth.battle.net' as const,
  tw: 'https://oauth.battle.net' as const,
  cn: 'https://oauth.battlenet.com.cn' as const
} satisfies Record<Region, string>

export const regionLocales: Record<Region, Locale[]> = {
  us: [Locale.en_US, Locale.es_MX, Locale.pt_BR],
  eu: [Locale.en_GB, Locale.es_ES, Locale.fr_FR, Locale.ru_RU, Locale.de_DE, Locale.pt_PT, Locale.it_IT],
  kr: [Locale.ko_KR],
  tw: [Locale.zh_TW],
  cn: [Locale.zh_CN]
}

export interface BattlenetRuntimeConfig {
  clientId: string;
  clientSecret: string;
  region: Region;
}

export interface BattlenetPublicRuntimeConfig {}

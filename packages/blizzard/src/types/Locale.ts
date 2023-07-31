export type Locale = 'en_US' | 'es_MX' | 'pt_BR' | 'pt_PT' | 'de_DE' | 'en_GB' | 'es_ES' | 'fr_FR' | 'it_IT' | 'ru_RU' | 'ko_KR' | 'zh_TW' | 'zh_CN'
export namespace Locale {
  export type Language = LanguageOf<Locale>
  export type Region = RegionOf<Locale>
  export type Iso = IsoOf<Locale>
  export type Code = CodeOf<Locale>

  export type LanguageOf<T extends Locale> = T extends `${infer Language}_${string}` ? Lowercase<Language> : never
  export type RegionOf<T extends Locale> = T extends `${string}_${infer Region}` ? Lowercase<Region> : never
  export type IsoOf<T extends Locale> = T extends `${infer Language}_${infer Region}` ? `${Lowercase<Language>}-${Uppercase<Region>}` : never
  export type CodeOf<T extends Locale> = T extends `${infer Language}_${infer Region}` ? `${Lowercase<Language>}${Uppercase<Region>}` : never
}

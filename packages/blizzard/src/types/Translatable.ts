import { Gender, Locale } from '#blizzard/types'

export type Translatable = Record<Locale, string>

export namespace Translatable {
  export type Gendered = Record<Gender.TypeKey, Translatable>;
}

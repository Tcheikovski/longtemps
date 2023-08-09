import { Gender } from './Gender'
import { Locale } from './Locale'

export type Translatable = Record<Locale, string>

export namespace Translatable {
  export type Gendered = Record<Gender.TypeKey, Translatable>;
}

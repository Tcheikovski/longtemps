import { Api } from '../Api'
import { Locale } from '../Locale'
import { Translatable } from '../Translatable'
import { Region } from './Region'

export interface Realm extends Api.Resource {
  region: Api.Ref<Region, 'name'>
  connected_realm: Api.Link
  name: Translatable
  category: Translatable
  locale: Locale.Code
  timezone: string
  type: {
    type: Realm.Type
    name: Translatable
  }
  is_tournament: boolean
  slug: string
}

export namespace Realm {
  export type Type = 'NORMAL' | 'RP'
}

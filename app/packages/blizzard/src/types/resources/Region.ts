import { Api } from '../Api'
import { Translatable } from '../Translatable'

export interface Region extends Api.Resource {
  tag: Region
  name: Translatable
}

export namespace Region {
  export type Tag = 'US' | 'EU' | 'KR' | 'TW' | 'CN'
  export type TagKey = Lowercase<Tag>
}

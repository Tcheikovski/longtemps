import { Translatable } from '#blizzard/types'

export namespace Gender {
  export interface Gender {
    type: Gender.Type
    name: Translatable
  }

  export type Type = 'MALE' | 'FEMALE'
  export type TypeKey = Lowercase<Type>
}

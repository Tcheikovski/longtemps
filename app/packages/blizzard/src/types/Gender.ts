import { Translatable } from './Translatable'
export interface Gender {
  type: Gender.Type
  name: Translatable
}

export namespace Gender {

  export type Type = 'MALE' | 'FEMALE'
  export type TypeKey = Lowercase<Type>
}

import { Translatable } from './Translatable'

export interface Role {
  type: Role.Type
  name: Translatable
}

export namespace Role {

  export type Type = 'DAMAGE' | 'HEALER' | 'TANK'
  export type TypeKey = Lowercase<Type>
}

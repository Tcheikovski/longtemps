import { Translatable } from '#blizzard/types'

export namespace Role {
  export interface Role {
    type: Role.Type
    name: Translatable
  }

  export type Type = 'DAMAGE' | 'HEALER' | 'TANK'
  export type TypeKey = Lowercase<Type>
}

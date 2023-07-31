import { Translatable } from '#blizzard/types'

export namespace Faction {
  export interface Faction {
    type: Type
    name: Translatable
  }

  export type Type = 'HORDE' | 'ALLIANCE'
  export type TypeKey = Lowercase<Type>
}

import { Translatable } from './Translatable'
export interface Faction {
  type: Faction.Type
  name: Translatable
}

export namespace Faction {
  export type Type = 'HORDE' | 'ALLIANCE' | 'NEUTRAL'
  export type TypeKey = Lowercase<Type>
}

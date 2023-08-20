import { Translatable } from './util'

export enum FactionType {
  Horde = 'HORDE',
  Alliance = 'ALLIANCE',
}

export interface Faction {
  type: FactionType;
  name: Translatable;
}

import { Translatable } from './util'

export enum GenderType {
  Male = 'MALE',
  Female = 'FEMALE',
}

export interface Gender {
  type: GenderType;
  name: Translatable;
}

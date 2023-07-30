import { Translatable } from "./util";

export enum RoleType {
  Horde = "HORDE",
  Alliance = "ALLIANCE",
}

export interface Role {
  type: RoleType;
  name: Translatable;
}

import { Translatable } from "./util";

export interface JournalEncounter {
  id: number;
  name: Translatable;
}

export enum JournalEncounterModeType {
  Normal = "NORMAL",
  Heroic = "HEROIC",
  Mythic = "MYTHIC",
}

export interface JournalEncounterMode {
  type: JournalEncounterModeType;
  name: Translatable;
}

import { PlayableClass } from "./playableClass";
import { PlayableSpecialization } from "./playableSpecialization";
import { Spell } from "./spell";
import { ResourceReference, Translatable } from "./util";

export interface Talent {
  id: number;
  spell: ResourceReference<Spell, "id" | "name">;
  playable_class: ResourceReference<PlayableClass, "id" | "name">;
  playable_specialization: ResourceReference<PlayableSpecialization, "id" | "name">;
  rank_descriptions: {
    rank: number;
    description: Translatable;
  }[];
}

export interface PvpTalent {
  id: number;
  spell: ResourceReference<Spell, "id" | "name">;
  playable_specialization: ResourceReference<PlayableSpecialization, "id" | "name">;
  description: Translatable;
  unlock_player_level: number;
  compatible_slots: number[];
}

export enum TalentNodeType {
  Active = "ACTIVE",
  Passive = "PASSIVE",
  Choice = "CHOICE",
}

interface TalentTooltip {
  talent: ResourceReference<Talent, "id"> & { name: string };
  spell_tooltip: {
    spell: ResourceReference<Spell, "id" | "name">;
    description: Translatable;
    cast_time?: Translatable;
    range?: Translatable;
    cooldown?: Translatable;
    power_cost?: Translatable;
  };
}

export interface TalentNode<T extends TalentNodeType = TalentNodeType> {
  id: number;
  node_type: {
    id: number;
    type: T;
  };
  ranks: {
    rank: number;
    tooltip: T extends TalentNodeType.Active | TalentNodeType.Passive ? TalentTooltip : never;
    choice_of_tooltips: T extends TalentNodeType.Choice ? TalentTooltip[] : never;
    default_points?: number;
  }[];
  unlocks: number[];
  display_row: number;
  display_col: number;
  raw_position_x: number;
  raw_position_y: number;
}

export interface TalentTree {
  id: number;
  spec_talent_trees: ResourceReference<SpecTalentTree>[];
  talent_nodes: TalentNode[];
}

export interface SpecTalentTree {
  id: number;
  name: Translatable;
  playable_class: ResourceReference<PlayableClass, "id" | "name">;
  playable_specialization: ResourceReference<PlayableSpecialization, "id" | "name">;
  restriction_lines: {
    required_points: number;
    restricted_row: number;
    is_for_class: boolean;
  }[];
  class_talent_nodes: TalentNode[];
  spec_talent_nodes: TalentNode[];
}

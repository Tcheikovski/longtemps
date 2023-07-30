import { Media, MediaAsset } from "./media";
import { PlayableClass } from "./playableClass";
import { ReputationFactionReward } from "./reputation-faction";
import { Spell } from "./spell";
import { TechTalentTree } from "./tech-talent";
import { ResourceReference, Translatable } from "./util";

export interface Covenant {
  id: number;
  name: Translatable;
  description: Translatable;
  signature_ability: SignatureAbility;
  class_abilities: ClassAbility[];
  soulbinds: ResourceReference<CovenantSoulbind, "id" | "name">[];
  renown_rewards: RenownReward[];
  media: ResourceReference<CovenantMedia, "id">;
}

interface SignatureAbility {
  id: number;
  spell_tooltip: {
    spell: ResourceReference<Spell, "id" | "name">;
    description: Translatable;
    cast_time?: Translatable;
    range?: Translatable;
    cooldown?: Translatable;
    power_cost?: Translatable;
  };
}

interface ClassAbility {
  id: number;
  playable_class: ResourceReference<PlayableClass, "id" | "name">;
  spell_tooltip: {
    spell: ResourceReference<Spell, "id" | "name">;
    description: Translatable;
    cast_time?: Translatable;
    range?: Translatable;
    cooldown?: Translatable;
    power_cost?: Translatable;
  };
}

interface RenownReward {
  level: number;
  reward: ResourceReference<ReputationFactionReward, "id" | "name">;
}

export interface CovenantSoulbind {
  id: number;
  name: Translatable;
  covenant: ResourceReference<Covenant, "id" | "name">;
  // creature: ResourceReference<Creature, "id" | "name">;
  follower: {
    id: number;
    name: Translatable;
  };
  talent_tree: ResourceReference<TechTalentTree, "id"> & { name: Translatable };
}

export interface CovenantMedia extends Media {
  assets: [MediaAsset<"icon">];
}

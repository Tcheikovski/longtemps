import { PowerType } from "./powerType";
import { PlayableRace } from "./playableRace";
import { GenderTranslatable, ResourceKey, ResourceReference, Translatable } from "./util";
import { Media, MediaAsset } from "./media";

export interface PlayableClass {
  id: number;
  name: Translatable;
  gender_name: GenderTranslatable;
  media: ResourceReference<PlayableClassMedia, "id">;
  power_type: ResourceReference<PowerType, "id" | "name">;
  specializations: {
    id: number;
    name: Translatable;
    key: ResourceKey;
  }[];
  playable_races: ResourceReference<PlayableRace, "id" | "name">[];
  pvp_talent_slots: ResourceKey;
}

export interface PlayableClassMedia extends Media {
  assets: [MediaAsset<"icon">];
}

export interface PvpTalentSlots {
  talent_slots: {
    slot_number: number;
    unlock_player_level: number;
  }[];
}

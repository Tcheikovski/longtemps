import { Role } from "./role";
import { PlayableClass } from "./playableClass";
import { GenderTranslatable, ResourceReference, Translatable } from "./util";
import { PvpTalent, SpecTalentTree } from "./talent";
import { Media, MediaAsset } from "./media";

export interface PlayableSpecialization {
  id: number;
  playable_class: ResourceReference<PlayableClass, "id" | "name">;
  name: Translatable;
  gender_description: GenderTranslatable;
  media: ResourceReference<PlayableSpecializationMedia, "id">;
  role: Role;
  pvp_talents: {
    talent: ResourceReference<PvpTalent, "id"> & { name: string };
    spell_tooltip: {
      description: Translatable;
      cast_time: Translatable;
      range?: Translatable;
      cooldown?: Translatable;
      power_cost?: Translatable;
    };
  }[];
  spec_talent_tree: ResourceReference<SpecTalentTree, "name">;
}

export interface PlayableSpecializationMedia extends Media {
  assets: [MediaAsset<"icon">];
}

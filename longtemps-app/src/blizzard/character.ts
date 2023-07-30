import { Faction } from "./faction";
import { Gender } from "./gender";
import { Realm } from "./realm";
import { PlayableClass } from "./playableClass";
import { PlayableRace } from "./playableRace";
import { PlayableSpecialization } from "./playableSpecialization";
import { ResourceKey, ResourceReference, Translatable } from "./util";
import { Guild } from "./guild";
import { Covenant } from "./covenant";
import { Media, MediaAsset } from "./media";

export interface Character {
  id: number;
  name: string;
  gender: Gender;
  faction: Faction;
  race: ResourceReference<PlayableRace, "id" | "name">;
  character_class: ResourceReference<PlayableClass, "id" | "name">;
  active_spec: ResourceReference<PlayableSpecialization, "id" | "name">;
  active_title: ResourceReference<Title, "id" | "name" | "display_string">;
  realm: ResourceReference<Realm, "id" | "name" | "slug">;
  guild: ResourceReference<Guild, "id" | "name" | "realm" | "faction">;
  level: number;
  experience: number;
  achievement_points: number;
  achievements: ResourceKey;
  titles: ResourceKey;
  pvp_summary: ResourceKey;
  encounters: ResourceKey;
  media: ResourceKey;
  last_login_timestamp: number;
  average_item_level: number;
  equipped_item_level: number;
  specializations: ResourceKey;
  statistics: ResourceKey;
  mythic_keystone_profile: ResourceKey;
  equipment: ResourceKey;
  appearance: ResourceKey;
  collections: ResourceKey;
  reputations: ResourceKey;
  quests: ResourceKey;
  achievements_statistics: ResourceKey;
  professions: ResourceKey;
  covenant_progress: {
    chosen_covenant: ResourceReference<Covenant, "id" | "name">;
    renown_level: number;
    soulbinds: ResourceKey;
  };
}

export interface CharacterMedia extends Media {
  assets: MediaAsset<"avatar" | "inset" | "main-raw">[];
}

export interface Title {
  id: number;
  name: Translatable;
  display_string: Translatable;
}

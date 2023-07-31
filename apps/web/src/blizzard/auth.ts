import { Faction } from './faction'
import { Gender } from './gender'
import { PlayableClass } from './playableClass'
import { PlayableRace } from './playableRace'
import { Realm } from './realm'
import { ResourceKey, ResourceReference } from './util'

export interface BlizzardToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface BlizzardProfile {
  id: number;
  wow_accounts: WowAccount[];
}

export interface WowAccount {
  id: number;
  characters: {
    character: ResourceKey;
    protected_character: ResourceKey;
    name: string;
    id: number;
    realm: ResourceReference<Realm, 'id' | 'slug' | 'name'>;
    playable_class: ResourceReference<PlayableClass, 'id' | 'name'>;
    playable_race: ResourceReference<PlayableRace, 'id' | 'name'>;
    gender: Gender;
    faction: Faction;
    level: number;
  }[];
}

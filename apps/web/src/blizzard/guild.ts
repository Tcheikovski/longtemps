import { Faction } from './faction'
import { Realm } from './realm'
import { GuildCrestBackground, GuildCrestBorder, GuildCrestEmblem } from './guild-crest'
import { ResourceKey, ResourceReference } from './util'
import { Character } from './character'
import { Achievement } from './achievement'
import { JournalEncounter, JournalEncounterMode } from './journal-encounter'
import { PlayableClass } from './playableClass'
import { PlayableRace } from './playableRace'
import { Rank } from './rank'

export interface Guild {
  id: number;
  name: string;
  faction: Faction;
  achievement_points: number;
  member_count: number;
  realm: ResourceReference<Realm, 'id' | 'name' | 'slug'>;
  crest: {
    emblem: GuildCrestEmblem;
    border: GuildCrestBorder;
    background: GuildCrestBackground;
  };
  roster: ResourceKey;
  achievements: ResourceKey;
  created_timestamp: number;
  activity: ResourceKey;
}

export interface GuildRoster {
  guild: ResourceReference<Guild, 'id' | 'name' | 'realm' | 'faction'>;
  members: {
    rank: Rank;
    character: ResourceReference<Character, 'id' | 'name' | 'realm' | 'level'> & {
      playable_class: ResourceReference<PlayableClass, 'id'>;
      playable_race: ResourceReference<PlayableRace, 'id'>;
    };
  }[];
}

export interface GuildAchievments {}

export interface GuildActivity {
  guild: ResourceReference<Guild, 'id' | 'name' | 'realm' | 'faction'>;
  activities: Activity[];
}

enum ActivityType {
  Encounter = 'ENCOUNTER',
  CharacterAchievement = 'CHARACTER_ACHIEVEMENT',
}

interface Activity<T extends ActivityType = ActivityType> {
  encounter_completed: T extends ActivityType.Encounter ? EncounterCompleted : never;
  character_achievement: T extends ActivityType.CharacterAchievement ? CharacterAchievement : never;
  activity: {
    type: T;
  };
  timestamp: number;
}

interface EncounterCompleted {
  encounter: ResourceReference<JournalEncounter, 'id' | 'name'>;
  mode: JournalEncounterMode;
}

interface CharacterAchievement {
  character: ResourceReference<Character, 'id' | 'name' | 'realm'>;
  achievement: ResourceReference<Achievement, 'id' | 'name'>;
}

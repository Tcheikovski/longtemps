import { Api } from '../Api'
import { Faction } from '../Faction'
import { Achievement } from './Achievement'
import { Character } from './Character'
import { PlayableClass } from './PlayableClass'
import { PlayableRace } from './PlayableRace'
import { Realm } from './Realm'
import { Journal } from './Journal'

export interface Guild extends Api.Resource {
  name: string;
  faction: Faction;
  achievement_points: number;
  member_count: number;
  realm: Api.Ref<Realm, 'name' | 'slug'>;
  crest: Guild.Crest;
  roster: Api.Link;
  achievements: Api.Link;
  created_timestamp: number;
  activity: Api.Link;
}

export namespace Guild {
  export interface Crest {
    emblem: Crest.Emblem;
    border: Crest.Border;
    background: Crest.Background;
  }

  export namespace Crest {
    export interface Color extends Api.Resource {
      id: number
      rgba: {
        r: number;
        g: number;
        b: number;
        a: number;
      }
    }

    export interface Emblem extends Api.Resource {
      media: Api.Media<'image'>
      color: Color
    }

    export interface Border extends Api.Resource {
      media: Api.Media<'image'>
      color: Color
    }

    export interface Background {
      color: Color
    }
  }

  export interface Achievements {
    guild: Api.Ref<Guild, 'name' | 'realm' | 'faction'>;
    total_quantity: number;
    total_points: number;
    achievements: Achievement[];
    category_progress: Achievements.CategoryProgress[];
    recent_events: Achievements.RecentEvent[];
  }

  export namespace Achievements {
    export interface CategoryProgress {
      category: Api.Ref<Achievement.Category, 'name'>;
      quantity: number;
      points: number;
    }

    export interface RecentEvent {
      achievement: Api.Ref<Achievement, 'name'>;
      timestamp: number;
    }
  }

  export interface Activity {
    guild: Api.Ref<Guild, 'name' | 'realm' | 'faction'>
    activities: Activity.Element[];
  }

  export namespace Activity {
    export type Type = 'ENCOUNTER' | 'CHARACTER_ACHIEVEMENT';
    export interface TypeObject<T extends Type = Type> {
      type: T
    }

    interface Base {
      activity: TypeObject
      timestamp: number
    }

    export interface CharacterAchievement extends Base {
      activity: TypeObject<'CHARACTER_ACHIEVEMENT'>
      character_achievement: {
        character: Api.Ref<Character, 'name' | 'realm'>
        achievement: Api.Ref<Achievement, 'name'>
      }
    }

    export interface MythicKeystone extends Base {
      activity: TypeObject<'ENCOUNTER'>
      encounter_completed: {
        encounter: Journal.Encounter
      }
    }

    export type Element = CharacterAchievement
  }

  export interface Roster {
    guild: Api.Ref<Guild, 'name' | 'realm' | 'faction'>
    members: Roster.Member[]
  }

  export namespace Roster {
    export interface Member {
      character: Api.Ref<Character, 'name' | 'realm' | 'level', {
        playable_class: Api.Ref<PlayableClass>
        playable_race: Api.Ref<PlayableRace>
      }>
      rank: number
    }
  }
}

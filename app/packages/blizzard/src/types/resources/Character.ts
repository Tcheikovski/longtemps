import { Api } from '../Api'
import { Faction } from '../Faction'
import { Gender } from '../Gender'
import { Translatable } from '../Translatable'
import { Covenant } from './Covenant'
import { Guild } from './Guild'
import { PlayableClass } from './PlayableClass'
import { PlayableRace } from './PlayableRace'
import { PlayableSpecialization } from './PlayableSpecialization'
import { Realm } from './Realm'
import { Title } from './Title'

export interface Character extends Api.Resource {
  readonly id: number
  name: string
  gender: Gender
  faction: Faction
  race: Api.Ref<PlayableRace, 'name'>
  character_class: Api.Ref<PlayableClass, 'name'>
  active_spec: Api.Ref<PlayableSpecialization, 'name'>
  active_title: Api.Ref<Title, 'name', { display_string: Translatable }>
  realm: Api.Ref<Realm, 'name' | 'slug'>
  guild: Api.Ref<Guild, 'name' | 'realm' | 'faction'>
  level: number
  experience: number
  achievement_points: number
  achievements: Api.Link
  titles: Api.Link
  pvp_summary: Api.Link
  encounters: Api.Link
  media: Api.Link
  last_login_timestamp: number
  average_item_level: number
  equipped_item_level: number
  specializations: Api.Link
  statistics: Api.Link
  mythic_keystone_profile: Api.Link
  equipment: Api.Link
  appearance: Api.Link
  collections: Api.Link
  reputations: Api.Link
  quests: Api.Link
  achievements_statistics: Api.Link
  professions: Api.Link
  covenant_progress: Character.CovenantProgress
}

export namespace Character {
  export type Media = Api.Media<'avatar' | 'image' | 'inset' | 'main' | 'main-raw'>
  export interface CovenantProgress {
    chosen_covenant: Api.Ref<Covenant, 'name'>
    renown_level: number
    soulbinds: Api.Link
  }
}

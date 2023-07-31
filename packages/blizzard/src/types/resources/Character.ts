import { Api, Covenant, Faction, Gender, Guild, PlayableClass, PlayableRace, PlayableSpecialization, Realm, Title } from '#blizzard/types'

export interface Character extends Api.Resource {
  readonly id: number
  name: string
  gender: Gender.Gender
  faction: Faction.Faction
  race: Api.Ref<PlayableRace, 'name'>
  character_class: Api.Ref<PlayableClass, 'name'>
  active_spec: Api.Ref<PlayableSpecialization, 'name'>
  active_title: Api.Ref<Title, 'name' | 'display_string'>
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
  export interface CovenantProgress {
    chosen_covenant: Api.Ref<Covenant, 'name'>
    renown_level: number
    soulbinds: Api.Link
  }
}

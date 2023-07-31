import { Api, Faction, PlayableClass, Translatable } from '#blizzard/types'

export interface PlayableRace extends Api.Resource {
  name: Translatable
  gender_name: Translatable.Gendered
  faction: Faction.Faction
  is_selectable: boolean
  is_allied_race: boolean
  playable_classes: Api.Ref<PlayableClass, 'name'>[]
}

import { Api } from '../Api'
import { Faction } from '../Faction'
import { Translatable } from '../Translatable'
import { PlayableClass } from './PlayableClass'

export interface PlayableRace extends Api.Resource {
  name: Translatable
  gender_name: Translatable.Gendered
  faction: Faction
  is_selectable: boolean
  is_allied_race: boolean
  playable_classes: Api.Ref<PlayableClass, 'name'>[]
}

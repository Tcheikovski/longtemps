import { Api } from '../Api'
import { Translatable } from '../Translatable'
import { PlayableRace } from './PlayableRace'
import { PlayableSpecialization } from './PlayableSpecialization'
import { PowerType } from './PowerType'

export interface PlayableClass extends Api.Resource {
  name: Translatable
  gender_name: Translatable.Gendered
  media: Api.Ref<PlayableClass.Media>
  power_type: Api.Ref<PowerType, 'name'>
  specializations: Api.Ref<PlayableSpecialization, 'name'>
  playable_races: Api.Ref<PlayableRace, 'name'>[]
  pvp_talent_slots: Api.Link
}

export namespace PlayableClass {
  export type Media = Api.Media<'icon'>
}

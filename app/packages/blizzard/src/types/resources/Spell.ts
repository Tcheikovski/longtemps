import { Api } from '../Api'
import { Translatable } from '../Translatable'

export interface Spell extends Api.Resource {
  name: Translatable
  description: Translatable
  media: Api.Ref<Spell.Media>
}

export namespace Spell {
  export interface Tooltip {
    spell: Api.Ref<Spell, 'name'>
    description: Translatable
    cast_time?: Translatable
    range?: Translatable
    cooldown?: Translatable
    power_cost?: Translatable
  }

  export type Media = Api.Media<'icon'>
}

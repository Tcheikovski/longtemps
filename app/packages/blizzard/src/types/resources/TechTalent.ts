import { Api } from '../Api'
import { Translatable } from '../Translatable'
import { Spell } from './Spell'

export interface TechTalent extends Api.Resource {
  talent_tree: Api.Ref<TechTalent.Tree, { name: Translatable }>
  name: Translatable
  description: Translatable
  spell_tooltip: Spell.Tooltip
  tier: number
  display_order: number
  prerequisite_talent: Api.Ref<TechTalent, 'name'>
  media: Api.Ref<TechTalent.Media>
}

export namespace TechTalent {
  export type Media = Api.Media<'icon'>

  export interface Tree extends Api.Resource {
    max_tiers: number
    talents: Api.Ref<TechTalent, 'name'>
  }
}

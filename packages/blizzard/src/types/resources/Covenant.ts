import { Api, Creature, PlayableClass, Spell, TechTalent, Translatable } from '#blizzard/types'

export interface Covenant extends Api.Resource {
  name: Translatable
  description: Translatable
  signature_ability: Covenant.SignatureAbility
  class_abilities: Covenant.ClassAbility[]
  soulbinds: Api.Ref<Covenant.Soulbind, 'name'>[]
  renown_rewards: Covenant.RenownReward[]
  media: Api.Ref<Covenant.Media>
}

export namespace Covenant {
  export type Media = Api.Media<'icon'>

  export interface SignatureAbility {
    id: number;
    spell_tooltip: Spell.Tooltip
  }

  export interface ClassAbility {
    id: number;
    playable_class: Api.Ref<PlayableClass, 'name'>;
    spell_tooltip: Spell.Tooltip;
  }

  export interface RenownReward {
    level: number;
    reward: Soulbind;
  }

  export interface Soulbind extends Api.Resource {
    name: Translatable
    covenant: Api.Ref<Covenant, 'name'>
    creature: Api.Ref<Creature, 'name'>
    follower: Soulbind.Follower
    talent_tree: Api.Ref<TechTalent.Tree, { name: Translatable }>
  }

  export namespace Soulbind {
    export interface Follower extends Api.Resource {
      name: Translatable
    }
  }

}

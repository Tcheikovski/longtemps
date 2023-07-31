import { Api, PlayableClass, PlayableSpecialization, Spell, Translatable } from '#blizzard/types'

export interface Talent extends Api.Resource {
  spell: Api.Ref<Spell, 'name'>
  playable_class: Api.Ref<PlayableClass, 'name'>
  playable_specialization?: Api.Ref<PlayableSpecialization, 'name'>
  rank_descriptions: Talent.RankDescription[]
}

export namespace Talent {
  export interface RankDescription {
    rank: number
    description: Translatable
  }

  export interface Tree extends Api.Resource {
    name: Translatable
    playable_class: Api.Ref<PlayableClass, 'name'>
    playable_specialization: Api.Ref<PlayableSpecialization, 'name'>
    restriction_lines: Tree.RestrictionLine[]
    class_talent_nodes: Node[]
    spec_talent_nodes: Node[]
  }

  export namespace Tree {
    export interface RestrictionLine {
      required_points: number
      restricted_row: number
      is_for_class: boolean
    }
  }

  export type Node = Node.Active | Node.Passive | Node.Choice

  export namespace Node {
    export type Type = 'ACTIVE' | 'PASSIVE' | 'CHOICE';
    export interface TypeObject<T extends Type = Type> {
      id: number
      type: T
    }

    interface Base extends Api.Resource {
      unlocks: number[]
      display_row: number
      display_col: number
      raw_position_x: number
      raw_position_y: number
    }

    export interface Active extends Base {
      node_type: TypeObject<'ACTIVE'>
      ranks: Rank.Single[]
    }

    export interface Passive extends Base {
      node_type: TypeObject<'PASSIVE'>
      ranks: Rank.Single[]
    }

    export interface Choice extends Base {
      node_type: TypeObject<'CHOICE'>
      ranks: Rank.Choice[]
    }

    export type Rank = Rank.Single | Rank.Choice;
    export namespace Rank {
      interface Base {
        rank: number
        default_points?: number
      }

      export interface Single extends Base {
        tooltip: Tooltip<Talent>
      }

      export interface Choice extends Base {
        choice_of_tooltips: Tooltip<Talent>[]
      }
    }

  }

  export interface PvpTalent extends Api.Resource {
    spell: Api.Ref<Spell, 'name'>
    playable_specialization: Api.Ref<PlayableSpecialization, 'name'>
    description: Translatable
    unlock_player_level: number
    compatible_slots: number[]
  }

  export interface Tooltip<T extends Talent | PvpTalent> {
    talent: Api.Ref<T, { name: Translatable }>
    spell_tooltip: Spell.Tooltip
  }
}

import { Api, Faction, Translatable } from '#blizzard/types'

export interface Achievement extends Api.Resource {
  category: Api.Ref<Achievement.Category, 'name'>
  name: Translatable
  description: Translatable
  points: number
  is_account_wide: boolean
  criteria: Achievement.Criteria
  prerequisite_achievement: Api.Ref<Achievement, 'name'>
  next_achievement: Api.Ref<Achievement, 'name'>
  media: Api.Ref<Achievement.Media>
  display_order: number
}

export namespace Achievement {
  export type Media = Api.Media<'icon'>
  export type CriteriaOperatorType = 'COMPLETE_AT_LEAST' | 'AND'

  export interface CriteriaOperator {
    type: CriteriaOperatorType
    name: Translatable
  }

  interface CriteriaBase extends Api.Resource {
    description: Translatable
    amount: number
  }

  export interface SingleCriteria extends CriteriaBase { }

  export interface MultipleCriteria extends CriteriaBase {
    operator: CriteriaOperator
    child_criteria: SingleCriteria[]
  }

  export type Criteria = SingleCriteria | MultipleCriteria

  export interface Category extends Api.Resource {
    name: Translatable
    achievements: Api.Ref<Achievement, 'name'>[]
    is_guild_category: boolean
    aggregates_by_faction: Record<Faction.TypeKey, Category.Stats>
    display_order: number
  }

  export namespace Category {
    export interface Stats {
      quantity: number
      points: number
    }
  }
}

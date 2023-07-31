import { Api, PlayableClass, Role, Talent, Translatable } from '#blizzard/types'

export interface PlayableSpecialization extends Api.Resource {
  playable_class: Api.Ref<PlayableClass, 'name'>
  name: Translatable
  gender_description: Translatable.Gendered
  media: Api.Ref<PlayableSpecialization.Media>
  role: Role.Role
  pvp_talents: Talent.Tooltip<Talent.PvpTalent>[]
  spec_talent_tree: Api.Ref<Talent.Tree, 'name'>
}

export namespace PlayableSpecialization {
  export type Media = Api.Media<'icon'>
}

import { Api, PlayableSpecialization, Translatable } from '#blizzard/types'

export interface Creature extends Api.Resource {
  name: Translatable;
  type: Api.Ref<Creature.Type>;
  family: Api.Ref<Creature.Family>;
  creature_displays: Api.Ref<Creature.Media>[];
  is_tameable: boolean;
}

export namespace Creature {
  export type Media = Api.Media<'zoom'>

  export interface Type extends Api.Resource {
    name: Translatable
  }

  export interface Family extends Api.Resource {
    name: Translatable;
    specialization: Api.Ref<PlayableSpecialization, 'name'>;
    media: Family.Media;
  }

  export namespace Family {
    export type Media = Api.Media<'icon'>
  }
}

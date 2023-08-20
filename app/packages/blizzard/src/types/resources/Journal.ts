import { Api } from '../Api'
import { Translatable } from '../Translatable'
import { Creature } from './Creature'

export namespace Journal {
  export interface Encounter extends Api.Resource {
    name: Translatable;
    description: Translatable;
    creatures: Api.Ref<Creature, 'name', { creature_display: Api.Ref<Creature.Media> }>[];
    // items: Api.Ref<Item, 'name'>[];
    // sections: Section[];
    // instance: Instance;
    // category: Category;
    // modes: Mode[];
  }

  export namespace Encounter {

  }
}

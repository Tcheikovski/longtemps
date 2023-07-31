import { Faction } from './faction'
import { PlayableClass } from './playableClass'
import { GenderTranslatable, ResourceReference, Translatable } from './util'

export interface PlayableRace {
  id: number;
  name: Translatable;
  gender_name: GenderTranslatable;
  faction: Faction;
  is_selectable: boolean;
  is_allied_race: boolean;
  playable_classes: ResourceReference<PlayableClass, 'id' | 'name'>[];
}

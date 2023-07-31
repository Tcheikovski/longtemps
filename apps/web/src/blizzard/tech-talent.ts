import { Media, MediaAsset } from './media'
import { Spell } from './spell'
import { ResourceReference, Translatable } from './util'

export interface TechTalentTree {
  id: number;
  max_tiers: number;
  talents: ResourceReference<TechTalent, 'id' | 'name'>;
}

export interface TechTalent {
  id: number;
  talent_tree: ResourceReference<TechTalentTree, 'id'> & { name: Translatable };
  name: Translatable;
  description: Translatable;
  spell_tooltip: {
    spell: ResourceReference<Spell, 'id' | 'name'>;
    description: Translatable;
    cast_time?: Translatable;
    range?: Translatable;
    cooldown?: Translatable;
    power_cost?: Translatable;
  };
  tier: number;
  display_order: number;
  prerequisite_talent: ResourceReference<TechTalent, 'id' | 'name'>;
  media: ResourceReference<TechTalentMedia, 'id'>;
}

export interface TechTalentMedia extends Media {
  assets: [MediaAsset<'icon'>];
}

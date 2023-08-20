import { Media, MediaAsset } from './media'
import { ResourceReference, Translatable } from './util'

export interface Spell {
  id: number;
  name: Translatable;
  description: Translatable;
  media: ResourceReference<SpellMedia, 'id'>;
}

export interface SpellMedia extends Media {
  assets: [MediaAsset<'icon'>];
}

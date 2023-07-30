import { Translatable } from "./util";

export interface Realm {
  id: number;
  name: Translatable;
  slug: string;
}

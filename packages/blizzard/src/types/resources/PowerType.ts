import { Api } from '../Api'
import { Translatable } from '../Translatable'

export interface PowerType extends Api.Resource {
  name: Translatable
}

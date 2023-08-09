import { Api, Translatable } from '../../types'

export interface Title extends Api.Resource {
  name: Translatable
  gender_name: Translatable.Gendered
}

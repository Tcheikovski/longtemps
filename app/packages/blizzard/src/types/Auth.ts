import { Api } from './Api'
import { Character, PlayableClass, PlayableRace } from './resources'

export namespace Auth {
  export interface TokenResponse {
    access_token: string
    token_type: string
    expires_in: number
    scope?: string
    sub?: string,
    id_token?: string
  }

  export interface IdToken {
    sub: string
    aud: string
    azp: string
    iss: string
    exp: number
    iat: number
    jti: string
    at_hash?: string
    battle_tag?: Battletag
  }

  export interface Userinfo {
    sub: '120823788',
    id: 120823788,
    battletag: Battletag
  }

  export type Battletag = `${string}#${number}`

  export interface Account extends Api.Resource {
    characters: Api.Ref<Character, 'name' | 'realm' | 'level' | 'gender' | 'faction', {
      playable_class: Api.Ref<PlayableClass, 'name'>;
      playable_race: Api.Ref<PlayableRace, 'name'>;
    }>[]
  }

  export interface Profile extends Api.Resource {
    wow_accounts: Account[]
    collections: Api.Link
  }
}

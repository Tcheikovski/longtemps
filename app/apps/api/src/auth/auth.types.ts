import { IntrospectionResponse } from 'openid-client'

export type Userinfo = {
  sub: string;
  username: string;
}

export type Introspection = IntrospectionResponse & Userinfo

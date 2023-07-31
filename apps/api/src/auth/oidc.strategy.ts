import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-http-bearer'
import { AuthService } from './auth.service'

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  @Inject() private auth: AuthService

  async validate (token: string) {
    const user = await this.auth.validateToken(token)
    if (!user) { throw new UnauthorizedException() }

    return user
  }
}

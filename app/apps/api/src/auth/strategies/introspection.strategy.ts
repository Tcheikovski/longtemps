import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { Strategy, IStrategyOptions, IVerifyOptions } from 'passport-http-bearer'
import { Issuer } from 'openid-client'
import { User } from '../../users'
import { AuthService } from '../auth.service'
import { OIDC_ISSUER } from '../auth.constants'
import { AuthError, AuthException } from '../auth.exception'

@Injectable()
export class IntrospectionStrategy extends PassportStrategy(Strategy, 'introspection') {
  @Inject(AuthService)
  private authService: AuthService

  // @ts-expect-error
  constructor (@Inject(OIDC_ISSUER) oidcIssuer: Issuer) {
    super({
      realm: oidcIssuer.metadata.issuer,
      scope: 'longtemps_apia'
    } satisfies IStrategyOptions)
  }

  async validate (token: string): Promise<[User, IVerifyOptions]> {
    const { user, scope } = await this.authService.validateToken(token) ?? {}
    if (!user) { throw AuthException.for(AuthError.UNAUTHORIZED) }
    if (!scope) { throw AuthException.for(AuthError.MISSING_SCOPE) }

    return [user, { scope }]
  }
}

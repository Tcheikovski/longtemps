import {
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { IVerifyOptions } from 'passport-http-bearer'
import { Reflector } from '@nestjs/core'
import { User } from '../../users'
import { AuthError, AuthException } from '../auth.exception'

@Injectable()
export class IntrospectionAuthGuard extends AuthGuard('introspection') {
  @Inject(Reflector)
  declare private readonly reflector: Reflector

  handleRequest <TUser extends User> (err: Error, user: TUser, info: IVerifyOptions, context: ExecutionContext): TUser {
    if (err) { throw err }
    if (!user) { throw AuthException.for(AuthError.UNAUTHORIZED) }

    const requestedScopes = this.reflector.get<string[] | undefined>('scopes', context.getHandler())

    if (requestedScopes?.length) {
      const authorizedScopes = Array.isArray(info.scope) ? info.scope : info.scope?.split(' ') ?? []
      if (!authorizedScopes) { throw AuthException.for(AuthError.MISSING_SCOPE) }

      const missingScopes = requestedScopes.filter(scope => !authorizedScopes.includes(scope))
      if (missingScopes.length) { throw AuthException.for(AuthError.INVALID_SCOPE) }
    }

    return user
  }
}

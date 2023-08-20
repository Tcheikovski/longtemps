import { Inject, Injectable } from '@nestjs/common'
import { User, UsersService } from '../users'
import { OidcService } from './oidc'

@Injectable()
export class AuthService {
  @Inject(OidcService)
  declare private oidcService: OidcService

  @Inject(UsersService)
  declare private usersService: UsersService

  async validateToken (token: string): Promise<{ user: User, scope: string } | null> {
    const { active, sub, username, scope } = await this.oidcService.introspectToken(token)
    if (active) {
      const user = await this.usersService.find(sub).then(user => user
        ? this.usersService.update(user, { username })
        : this.usersService.create({ id: sub, username })
      )

      return { user, scope }
    }

    return null
  }
}

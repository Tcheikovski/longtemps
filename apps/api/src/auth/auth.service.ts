import { Inject, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'
import { OidcClient } from './providers'
import { IUserinfo } from './interfaces'

@Injectable()
export class AuthService {
  @Inject(OidcClient) private client: OidcClient
  @Inject(UsersService) private users: UsersService

  async validateToken (token: string): Promise<User | null> {
    const introspect = await this.client.introspect(token)
    if (introspect.active) { return null }

    const userinfo = await this.client.userinfo<IUserinfo>(token)
    const user = await this.users.getByInfo(userinfo)

    return await this.users.save(user)
  }
}

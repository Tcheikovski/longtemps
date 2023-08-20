import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from '../users'
import { IntrospectionStrategy } from './strategies'
import { AuthService } from './auth.service'
import { AuthConfig } from './auth.config'
import { OidcClientProvider, OidcIssuerProvider, OidcService } from './oidc'

@Module({
  imports: [ConfigModule.forFeature(AuthConfig), PassportModule, UsersModule],
  providers: [OidcIssuerProvider, OidcClientProvider, OidcService, AuthService, IntrospectionStrategy],
  exports: [AuthService]
})
export class AuthModule {}

declare global {

  namespace Express {
    type AppUser = import('../users/entities/user.entity').User
    export interface User extends AppUser {}
  }
}

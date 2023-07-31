import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { OidcStrategy } from './oidc.strategy'
import { OidcIssuerProvider, OidcClientProvider } from './providers'
import { AuthConfig } from './auth.config'

@Module({
  imports: [ConfigModule.forFeature(AuthConfig), PassportModule, UsersModule],
  providers: [
    AuthService,
    OidcStrategy,
    OidcIssuerProvider,
    OidcClientProvider
  ]
})
export class AuthModule {}

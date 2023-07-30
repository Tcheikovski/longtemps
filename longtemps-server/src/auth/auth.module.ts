import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { OidcStrategy } from './oidc.strategy';
import { OidcIssuerProvider, OidcClientProvider } from './providers';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthConfig } from './auth.config';

@Module({
  imports: [ConfigModule.forFeature(AuthConfig), PassportModule, UsersModule],
  providers: [
    AuthService,
    OidcStrategy,
    OidcIssuerProvider,
    OidcClientProvider,
  ],
})
export class AuthModule {}

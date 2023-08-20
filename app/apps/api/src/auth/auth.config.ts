import { registerAs } from '@nestjs/config'

export interface AuthConfig {
  issuer: string;
  clientId: string;
  clientSecret: string;
}

export const AuthConfig = registerAs<AuthConfig>('auth', () => {
  return {
    issuer: process.env.AUTH_ISSUER,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET
  }
})

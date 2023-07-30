import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
}

export const AppConfig = registerAs<AppConfig>('app', () => {
  return {
    port: parseInt(process.env.PORT),
  };
});

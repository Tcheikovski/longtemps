import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(AppConfig.KEY);

  await app.listen(config.port, () => {
    Logger.log(`Server listening on port ${config.port}`, 'main');
  });
}

bootstrap();

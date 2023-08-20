import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { validate } from './env.config'
import { AppConfig } from './app.config'
import { AuthModule } from './auth'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ArticlesModule } from './articles/articles.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    ConfigModule.forFeature(AppConfig),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

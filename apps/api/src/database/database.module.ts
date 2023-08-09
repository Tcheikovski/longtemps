import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { User } from '../users/user.entity'
import { Article } from '../articles/entities/article.entity'
import { DatabaseConfig } from './database.config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [DatabaseConfig.KEY],
      useFactory: (config: DatabaseConfig) => {
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: [User, Article],
          synchronize: true
        }
      }
    })
  ]
})
export class DatabaseModule {}

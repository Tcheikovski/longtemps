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
        return Promise.resolve({
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: [User, Article],
          synchronize: true
        } as any).then((c) => {
          console.log(c)
          return c
        })
      }
    })
  ]
})
export class DatabaseModule {}

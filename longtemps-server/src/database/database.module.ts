import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from '../users/user.entity';
import { DatabaseConfig } from './database.config';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [DatabaseConfig.KEY],
      useFactory: (config: DatabaseConfig) => {
        return Promise.resolve({
          type: 'postgres',
          host: config.host,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: [User, Article],
          synchronize: true,
        });
      },
    }),
  ],
})
export class DatabaseModule {}

import { plainToClass } from 'class-transformer'
import {
  IsEnum,
  IsNumberString,
  IsString,
  IsUrl,
  validateSync
} from 'class-validator'
import { DatabaseType } from 'typeorm'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

const DatabaseType = [
  'mysql',
  'postgres',
  'cockroachdb',
  'sap',
  'mariadb',
  'sqlite',
  'cordova',
  'react-native',
  'nativescript',
  'sqljs',
  'oracle',
  'mssql',
  'mongodb',
  'aurora-mysql',
  'aurora-postgres',
  'expo',
  'better-sqlite3',
  'capacitor',
  'spanner'
] as const satisfies readonly DatabaseType[]

class EnvironmentVariables {
  @IsEnum(Environment)
  declare readonly NODE_ENV: Environment

  @IsNumberString()
  declare readonly PORT: string

  @IsString()
  declare readonly DB_HOST: string

  @IsNumberString()
  declare readonly DB_PORT: string

  @IsString()
  declare readonly DB_USER: string

  @IsString()
  declare readonly DB_PASSWORD: string

  @IsString()
  declare readonly DB_DATABASE: string

  @IsUrl()
  declare readonly AUTH_ISSUER: string

  @IsString()
  declare readonly AUTH_CLIENT_ID: string

  @IsString()
  declare readonly AUTH_CLIENT_SECRET: string
}

export function validate (config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}

declare global {

  namespace NodeJS {

    export interface ProcessEnv extends EnvironmentVariables { }
  }
}

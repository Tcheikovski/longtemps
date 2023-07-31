import { plainToInstance } from 'class-transformer'
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
    NODE_ENV: Environment

  @IsNumberString()
    PORT: string

  @IsString()
    DB_HOST: string

  @IsNumberString()
    DB_PORT: string

  @IsString()
    DB_USER: string

  @IsString()
    DB_PASSWORD: string

  @IsString()
    DB_DATABASE: string

  @IsUrl()
    AUTH_ISSUER: string

  @IsString()
    AUTH_CLIENT_ID: string

  @IsString()
    AUTH_CLIENT_SECRET: string
}

export function validate (config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
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

    export interface ProcessEnv extends EnvironmentVariables {}
  }
}

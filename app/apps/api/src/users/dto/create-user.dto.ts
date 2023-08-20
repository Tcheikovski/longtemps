import { IsUUID, IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsUUID()
  declare readonly id: string

  @IsString()
  @IsNotEmpty()
  declare readonly username: string
}

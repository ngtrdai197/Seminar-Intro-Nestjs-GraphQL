import { IsString, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsString()
  username: string

  @IsString()
  fullName: string

  @IsOptional()
  @IsString()
  address?: string
}

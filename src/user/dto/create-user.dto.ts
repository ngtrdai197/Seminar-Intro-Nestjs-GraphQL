import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  username: string

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  password: string

  @IsString()
  fullName: string

  @IsOptional()
  @IsString()
  address?: string
}

import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  password: string
}

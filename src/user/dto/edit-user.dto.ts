import {
  IsString,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator'

export class EditUserDto {
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(16)
  username?: string

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(25)
  fullName?: string

  @IsString()
  @IsOptional()
  @MinLength(5)
  address?: string

  @IsArray()
  @IsOptional()
  roles?: string[]
}

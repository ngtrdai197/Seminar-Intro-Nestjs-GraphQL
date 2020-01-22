import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator'

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsArray()
  @IsNotEmpty()
  genres: string[]

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  price?: number
}

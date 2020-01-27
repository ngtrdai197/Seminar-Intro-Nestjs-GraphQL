import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator'

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  author: string

  @IsArray()
  @IsNotEmpty()
  genres: string[]

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  createdById: string

  @IsNumber()
  price?: number
}

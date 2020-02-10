import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator'

import { IBook } from '../interface/book.interface'

export class EditBookDto implements Partial<IBook> {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsArray()
  genres?: string[]

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsNumber()
  price?: number

  @IsOptional()
  @IsString()
  author?: string
}

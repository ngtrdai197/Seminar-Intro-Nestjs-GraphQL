import { Controller, Get, Put, Param, Body, Post } from '@nestjs/common'
import { BookService } from './book.service'
import { IBook } from './interface/book.interface'
import { EditBookDto } from './dto/edit-book.dto'
import { CreateBookDto } from './dto/create-book.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('')
  async fetchBooks(): Promise<IBook[]> {
    return await this.bookService.getBooks({})
  }

  @Put('update/:bookId')
  async update(
    @Param('bookId') bookId: string,
    @Body() editBookDto: EditBookDto,
  ): Promise<IBook> {
    return await this.bookService.update(bookId, editBookDto)
  }

  @Post('')
  async createBook(@Body() newBookDto: CreateBookDto): Promise<IBook> {
    return await this.bookService.create(newBookDto)
  }
}

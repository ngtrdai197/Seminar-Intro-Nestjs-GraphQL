import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { BookService } from './book.service'
import { IBook } from './interface/book.interface'
import { EditBookDto } from './dto/edit-book.dto'
import { CreateBookDto } from './dto/create-book.dto'
import { CurrentUser } from '@/common/decorators'
import { IUser } from '@/user/interface/user.interface'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('')
  async fetchBooks(): Promise<IBook[]> {
    return await this.bookService.find()
  }

  @Put('update/:bookId')
  async update(
    @Param('bookId') bookId: string,
    @Body() editBookDto: EditBookDto,
  ): Promise<IBook> {
    return await this.bookService.findByIdAndUpdate(bookId, editBookDto, {
      new: true,
    })
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  async createBook(
    @CurrentUser() user: IUser,
    @Body() newBookDto: CreateBookDto,
  ): Promise<IBook> {
    newBookDto.createdById = user.id
    return await this.bookService.create(newBookDto)
  }
}

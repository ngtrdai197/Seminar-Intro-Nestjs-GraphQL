import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IBook } from './interface/book.interface'
import { BOOK_MODEL } from '@/common/constants'
import { CreateBookDto } from './dto/create-book.dto'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(BOOK_MODEL) private readonly bookModel: Model<IBook, {}>,
  ) {}

  async getBooks(conditions: { [key: string]: any }): Promise<IBook[]> {
    conditions = conditions ?? {}
    return await this.bookModel.find(conditions)
  }

  async update(bookId: string, doc: { [key: string]: any }): Promise<IBook> {
    return await this.bookModel.findByIdAndUpdate(bookId, doc, { new: true })
  }

  async create(newBookDto: CreateBookDto): Promise<IBook> {
    return await this.bookModel.create(newBookDto)
  }
}

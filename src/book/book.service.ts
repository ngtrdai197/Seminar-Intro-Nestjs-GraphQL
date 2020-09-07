import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IBook } from './interface/book.interface'
import { BOOK_MODEL } from '@/common/constants'
import { BaseService } from '@/common/services/base.service'

@Injectable()
export class BookService extends BaseService<IBook> {
  NOT_FOUND_ERROR = 'Book does not exists'
  constructor(
    @InjectModel(BOOK_MODEL) private readonly bookModel: Model<IBook, {}>,
  ) {
    super(bookModel)
  }

  async create(doc: any): Promise<IBook> {
    return this.bookModel.create(doc)
  }
}

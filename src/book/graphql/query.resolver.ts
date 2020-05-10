import { Resolver, Query } from '@nestjs/graphql'

import { Book } from '../book.entity'
import { BookService } from '../book.service'
import { IBook } from '../interface/book.interface'

@Resolver(() => Book)
export class BookQueryResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async fetchBooks(): Promise<IBook[]> {
    return this.bookService.find()
  }
}

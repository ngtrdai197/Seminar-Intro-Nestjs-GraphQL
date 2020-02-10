import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { BookController } from './book.controller'
import { BookMutationResolver, BookQueryResolver } from './graphql'
import { BookService } from './book.service'
import { BookSchema } from './schema/book.schema'
import { BOOK_MODEL } from '@/common/constants'

const resolvers = [BookMutationResolver, BookQueryResolver]

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BOOK_MODEL,
        schema: BookSchema,
        collection: BOOK_MODEL,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [...resolvers, BookService],
  exports: [BookService],
})
export class BookModule {}

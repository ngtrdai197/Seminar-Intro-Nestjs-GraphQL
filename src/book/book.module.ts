import { Module } from '@nestjs/common'
import { BookController } from './book.controller'
import { BookService } from './book.service'
import { MongooseModule } from '@nestjs/mongoose'
import { BookSchema } from './schema/book.schema'
import { BOOK_MODEL } from '@/common/constants'

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
  providers: [BookService],
})
export class BookModule {}

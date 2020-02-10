import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PostService } from './post.service'
import { MutationPostResolver, QueryPostResolver } from './graphql'
import { PostSchema } from './schema/post.schema'
import { UserModule } from '@/user/user.module'
import { POST_MODEL } from '@/common/constants'
import { PostController } from './post.controller'

const resolvers = [MutationPostResolver, QueryPostResolver]

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: POST_MODEL,
        collection: POST_MODEL,
        schema: PostSchema,
      },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [PostController],
  providers: [PostService, ...resolvers],
  exports: [PostService],
})
export class PostModule {}

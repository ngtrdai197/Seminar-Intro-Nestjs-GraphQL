import { Module, forwardRef } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema } from './schema/post.schema'
import { UserModule } from '@/user/user.module'
import { POST_MODEL } from '@/common/constants'
import { PostController } from './post.controller'

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
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}

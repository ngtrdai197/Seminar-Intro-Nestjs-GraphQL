import { Module, forwardRef } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema } from './schema/post.schema'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        collection: 'Post',
        schema: PostSchema,
      },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}

import { Module, forwardRef } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema } from './schema/post.schema'
import { UserModule } from 'src/user/user.module'
import { POST_MODEL } from '../constants'
import { DatabaseModule } from '../database/database.module'
import { postProviders } from './post.providers'

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
    // DatabaseModule,
  ],
  // providers: [PostService, PostResolver, ...postProviders], // TODO: provider
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}

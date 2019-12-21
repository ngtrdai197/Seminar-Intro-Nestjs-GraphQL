import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { UserSchema } from './schema/user.schema'
import { DatabaseModule } from '../database/database.module'
import { userProviders } from './user.providers'
import { USER_MODEL } from '../constants'
import { PostModule } from '../post/post.module'
import { PubsubModule } from 'src/pubsub/pubsub.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_MODEL, schema: UserSchema, collection: USER_MODEL },
    ]),
    PubsubModule,
    PostModule,
    // DatabaseModule, // TODO: import here
  ],
  // providers: [UserResolver, UserService, ...userProviders], // TODO: using for provider
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

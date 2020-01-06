import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { UserSchema } from './schema/user.schema'
import { userProviders } from './user.providers'
import { USER_MODEL } from '../constants'
import { PostModule } from '../post/post.module'
import { PubsubModule } from 'src/pubsub/pubsub.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_MODEL, schema: UserSchema, collection: USER_MODEL },
    ]),
    PubsubModule,
    PostModule,
    AuthModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

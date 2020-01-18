import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserController } from './user.controller'
import {
  MutationUserResolver,
  PropertyUserResovler,
  QueryUserResolver,
  SubscriptionUserResolver,
} from './graphql'
import { UserService } from './user.service'
import { UserSchema } from './schema/user.schema'
import { USER_MODEL } from '@/common/constants'
import { PostModule } from '@/post/post.module'
import { PubsubModule } from '@/pubsub/pubsub.module'

const resolvers = [
  MutationUserResolver,
  PropertyUserResovler,
  QueryUserResolver,
  SubscriptionUserResolver,
]

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_MODEL, schema: UserSchema, collection: USER_MODEL },
    ]),
    PubsubModule,
    PostModule,
  ],
  providers: [...resolvers, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

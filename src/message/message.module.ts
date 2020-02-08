import { Module, forwardRef } from '@nestjs/common'
import { MessageMutationResolver, MessagePropertyResolver } from './graphql/'
import { MessageService } from './message.service'
import { MESSAGE_MODEL } from '@/common/constants'
import { MessageSchema } from './schemas/message.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { ConversationModule } from '@/conversation/conversation.module'
import { UserModule } from '@/user/user.module'
import { PubsubModule } from '@/pubsub/pubsub.module'

const resolvers = [MessageMutationResolver, MessagePropertyResolver]

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MESSAGE_MODEL,
        schema: MessageSchema,
        collection: MESSAGE_MODEL,
      },
    ]),
    forwardRef(() => ConversationModule),
    UserModule,
    PubsubModule,
  ],
  providers: [...resolvers, MessageService],
  exports: [MessageService],
})
export class MessageModule {}

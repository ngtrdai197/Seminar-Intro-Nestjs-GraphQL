import { Module, forwardRef } from '@nestjs/common'
import {
  ConversationMutationResolver,
  ConversationQueryResolver,
  ConversationPropertyResolver,
  ConversationSubscriptionResolver,
} from './graphql'
import { ConversationService } from './conversation.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConversationSchema } from './schemas/conversation.schema'
import { CONVERSATION_MODEL } from '@/common/constants'
import { UserModule } from '@/user/user.module'
import { MessageModule } from '@/message/message.module'
import { PubsubModule } from '@/pubsub/pubsub.module'

const resolvers = [
  ConversationMutationResolver,
  ConversationQueryResolver,
  ConversationPropertyResolver,
  ConversationSubscriptionResolver,
]

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CONVERSATION_MODEL,
        schema: ConversationSchema,
        collection: CONVERSATION_MODEL,
      },
    ]),
    UserModule,
    PubsubModule,
    forwardRef(() => MessageModule),
  ],
  providers: [...resolvers, ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}

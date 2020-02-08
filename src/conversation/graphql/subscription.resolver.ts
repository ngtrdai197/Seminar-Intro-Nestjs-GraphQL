import { Resolver, Subscription, Args } from '@nestjs/graphql'
import { Conversation, ConversationSubscription } from '../conversation.entity'
import { PubsubService } from '@/pubsub/pubsub.service'

@Resolver(() => Conversation)
export class ConversationSubscriptionResolver {
  constructor(private readonly pubsubService: PubsubService) {}

  @Subscription(() => ConversationSubscription, {
    filter(payload, variables, context) {
      return (
        payload.subscribeConversation.conversationId ===
        variables.conversationId
      )
    },
  })
  subscribeConversation(@Args('conversationId') id: string) {
    return this.pubsubService.conversationChat(id)
  }
}

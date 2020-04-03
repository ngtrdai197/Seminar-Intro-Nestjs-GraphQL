import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query } from '@nestjs/graphql'

import { Conversation } from '../conversation.entity'
import { GqlAuthGuard } from '@/common/guards/gql.guard'
import { IConversation } from '../interfaces/conversation.interface'
import { ConversationService } from '../conversation.service'

@Resolver(() => Conversation)
export class ConversationQueryResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => Conversation)
  @UseGuards(GqlAuthGuard)
  async conversationById(@Args('id') id: string): Promise<IConversation> {
    return this.conversationService.findById(id)
  }
}

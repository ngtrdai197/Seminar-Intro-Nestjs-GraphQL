import { Conversation } from '../conversation.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@/common/guards/gql.guard'
import { Args, Resolver, Query } from '@nestjs/graphql'
import { IConversation } from '../interfaces/conversation.interface'
import { ConversationService } from '../conversation.service'

@Resolver(() => Conversation)
export class ConversationQueryResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => Conversation)
  @UseGuards(GqlAuthGuard)
  async conversationById(@Args('id') id: string): Promise<IConversation> {
    return await this.conversationService.findById(id)
  }
}

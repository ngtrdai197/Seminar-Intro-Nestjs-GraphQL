import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common'

import {
  Conversation,
  CreateConversationInput,
  EditConversationInput,
} from '../conversation.entity'
import { ConversationService } from '../conversation.service'
import { IConversation } from '../interfaces/conversation.interface'
import { IUser } from '@/user/interface/user.interface'
import { GqlAuthGuard } from '@/common/guards/gql.guard'
import { GqlUser } from '@/common/decorators'

@Resolver(() => Conversation)
export class ConversationMutationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Mutation(() => Conversation)
  @UseGuards(GqlAuthGuard)
  async createConversation(
    @GqlUser() user: IUser,
    @Args('createConversation') newConversation: CreateConversationInput,
  ): Promise<IConversation> {
    const exsits = newConversation.participantIds.includes(user.id)
    newConversation.createdById = user.id
    if (exsits) {
      return await this.conversationService.create(newConversation)
    }
    newConversation.participantIds.push(user.id)
    return await this.conversationService.create(newConversation)
  }

  @Mutation(() => Conversation)
  @UseGuards(GqlAuthGuard)
  async updateConversation(
    @Args('updateConversation') updateConversation: EditConversationInput,
    @Args('conversationId') id: string,
  ): Promise<IConversation> {
    return await this.conversationService.findByIdAndUpdate(
      id,
      updateConversation,
      { new: true, upsert: true },
    )
  }

  @Mutation(() => Conversation)
  @UseGuards(GqlAuthGuard)
  async joinConversation(
    @GqlUser() user: IUser,
    @Args('conversationId') id: string,
  ): Promise<IConversation> {
    const conversation = await this.conversationService.findById(id)
    if (!conversation) {
      throw new HttpException(
        { statusCode: 404, message: 'Conversation does not exists' },
        HttpStatus.NOT_FOUND,
      )
    }
    const exsits = conversation.participantIds.includes(user.id)
    if (exsits) {
      throw new HttpException(
        { statusCode: 400, message: 'User already exist in the conversation' },
        HttpStatus.BAD_REQUEST,
      )
    }
    conversation.set('participantIds', [
      ...conversation.participantIds,
      user.id,
    ])
    return await conversation.save()
  }
}

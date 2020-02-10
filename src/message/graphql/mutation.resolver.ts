import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common'

import { Message, CreateMessageInput } from '../message.entity'
import { ConversationService } from '@/conversation/conversation.service'
import { IMessage } from '../interfaces/message.interface'
import { GqlAuthGuard } from '@/common/guards/gql.guard'
import { GqlUser } from '@/common/decorators'
import { IUser } from '@/user/interface/user.interface'
import { MessageService } from '../message.service'
import { PubsubService } from '@/pubsub/pubsub.service'

@Resolver(() => Message)
export class MessageMutationResolver {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
    private readonly pubsubService: PubsubService,
  ) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async createNewMessage(
    @GqlUser() user: IUser,
    @Args('newMessage') newMessage: CreateMessageInput,
    @Args('conversationId') conversationId: string,
  ): Promise<IMessage> {
    newMessage.createdById = user.id
    const message = await this.messageService.create(newMessage)
    await this.conversationService.findByIdAndUpdate(conversationId, {
      $push: { messageIds: message.id },
    })
    this.pubsubService.pubsub.publish(`conversation.${conversationId}`, {
      subscribeConversation: { message, conversationId },
    })
    return message
  }

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  async editMessage(
    @GqlUser() user: IUser,
    @Args('content') content: string,
    @Args('messageId') id: string,
  ): Promise<IMessage> {
    const message = await this.messageService.findById(id)
    if (!message) {
      throw new HttpException(
        { statusCode: 404, message: 'Message does not exists' },
        HttpStatus.NOT_FOUND,
      )
    }
    if ((user.id as string) !== message.createdById) {
      throw new HttpException(
        { statusCode: 403, message: `You can't edit message of other user` },
        HttpStatus.FORBIDDEN,
      )
    }
    message.set('content', content)
    return await message.save()
  }
}

import { ResolveProperty, Parent, Args, Resolver } from '@nestjs/graphql'
import { Int } from 'type-graphql'

import { Conversation } from '../conversation.entity'
import { UserService } from '@/user/user.service'
import { User } from '@/user/user.entity'
import { IUser } from '@/user/interface/user.interface'
import { Message } from '@/message/message.entity'
import { IMessage } from '@/message/interfaces/message.interface'
import { MessageService } from '@/message/message.service'

@Resolver(() => Conversation)
export class ConversationPropertyResolver {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  @ResolveProperty(() => [User])
  async participants(@Parent() conversation: Conversation): Promise<IUser[]> {
    return await this.userService.find({
      _id: { $in: conversation.participantIds },
    })
  }

  @ResolveProperty(() => [Message])
  async messages(
    @Parent() conversation: Conversation,
    @Args({ name: 'limit', type: () => Int }) limit: number,
    @Args({ name: 'skip', type: () => Int }) skip: number,
  ): Promise<IMessage[]> {
    return await this.messageService.pagination({
      query: { _id: { $in: conversation.messageIds } },
      limit,
      skip,
      sort: { createdAt: -1 },
    })
  }
}

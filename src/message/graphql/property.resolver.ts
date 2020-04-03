import { Resolver, ResolveField, Parent } from '@nestjs/graphql'

import { Message } from '../message.entity'
import { User } from '@/user/user.entity'
import { IUser } from '@/user/interface/user.interface'
import { UserService } from '@/user/user.service'

@Resolver(() => Message)
export class MessagePropertyResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField('createdBy', () => User)
  async getCreatedBy(@Parent() message: Message): Promise<IUser> {
    return this.userService.findById(message.createdById)
  }
}

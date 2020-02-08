import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql'
import { Message } from '../message.entity'
import { User } from '@/user/user.entity'
import { IUser } from '@/user/interface/user.interface'
import { UserService } from '@/user/user.service'

@Resolver(() => Message)
export class MessagePropertyResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveProperty(() => User)
  async createdBy(@Parent() message: Message): Promise<IUser> {
    return await this.userService.findById(message.createdById)
  }
}

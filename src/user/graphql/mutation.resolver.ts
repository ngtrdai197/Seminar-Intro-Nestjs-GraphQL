import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { User, EditUserInput } from '../user.entity'
import { IUser } from '../interface/user.interface'
import { UserService } from '../user.service'
import { PubsubService } from '@/pubsub/pubsub.service'

@Resolver(() => User)
export class MutationUserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly pubsubService: PubsubService,
  ) {}

  @Mutation(() => User)
  async editUser(
    @Args('userId') userId: string,
    @Args('editUser') editUser: EditUserInput,
  ): Promise<IUser> {
    const edited = await this.userService.findByIdAndUpdate(userId, editUser, {
      new: true,
    })
    this.pubsubService.pubsub.publish('editedUser', {
      subscribeEditeUser: edited,
    })
    return edited
  }
}

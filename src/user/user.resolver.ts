import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveProperty,
  Parent,
  Subscription,
} from '@nestjs/graphql'
import { User, EditUserInput } from './user.entity'
import { IUser } from './interface/user.interface'
import { UserService } from './user.service'
import { Post } from '@/post/post.entity'
import { IPost } from '@/post/interfaces/post.interface'
import { PostService } from '@/post/post.service'
import { PubsubService } from '@/pubsub/pubsub.service'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly pubsubService: PubsubService,
  ) {}

  @Mutation(() => User)
  async editUser(
    @Args('userId') userId: string,
    @Args('editUser') editUser: EditUserInput,
  ): Promise<IUser> {
    const edited = await this.userService.update(userId, editUser)
    this.pubsubService.pubsub.publish('editedUser', {
      subscribeEditeUser: edited,
    })
    return edited
  }

  @Query(() => [User])
  async fetchUsers(): Promise<IUser[]> {
    return await this.userService.fetchUsers()
  }

  @ResolveProperty(() => [Post], { nullable: true })
  async posts(
    @Parent() user: User,
    @Args({
      name: 'postName',
      type: () => String,
      nullable: true,
    })
    postName: string,
  ): Promise<IPost[]> {
    if (user.postIds && user.postIds.length === 0) {
      return []
    }
    return await this.postService.find({
      _id: { $in: user.postIds },
      name: new RegExp(postName, 'i'),
    })
  }

  @Subscription(() => User, {
    filter(payload, variables, context) {
      return payload.subscribeEditeUser.username === variables.username
    },
  })
  subscribeEditeUser(@Args('username') username: string) {
    return this.pubsubService.editedUser()
  }
}

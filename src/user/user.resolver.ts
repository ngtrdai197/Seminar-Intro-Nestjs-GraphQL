import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { User, EditUser } from './user.entity'
import { IUser } from './interface/user.interface'
import { UserService } from './user.service'
import { UseInterceptors } from '@nestjs/common'
import { Post } from '../post/post.entity'
import { IPost } from '../post/interfaces/post.schema'
import { PostService } from '../post/post.service'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Mutation(() => User)
  async createNewUser(
    @Args('username') username: string,
    @Args('fullName') fullName: string,
  ): Promise<IUser> {
    return await this.userService.createUser({ fullName, username })
  }

  @Mutation(() => User)
  async editUser(
    @Args('userId') userId: string,
    @Args('editUser') editUser: EditUser,
  ): Promise<IUser> {
    return await this.userService.editUser(userId, editUser)
  }

  @Query(() => [User])
  async fetchUsers(): Promise<IUser[]> {
    return await this.userService.fetchUsers()
  }

  @ResolveProperty(() => [Post])
  async posts(
    @Parent() user: User,
    @Args({
      name: 'postName',
      type: () => String,
      nullable: true,
    })
    postName: string,
  ): Promise<IPost[]> {
    const currentUser = await this.userService.findById(user._id)
    return await this.postService.find({
      _id: { $in: currentUser.posts },
      name: new RegExp(postName, 'i'),
    })
  }
}

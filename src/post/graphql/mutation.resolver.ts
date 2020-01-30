import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@/common/guards/gql.guard'
import { GqlUser } from '@/common/decorators/current-user.decorator'
import { IUser } from '@/user/interface/user.interface'
import { IPost } from '../interfaces/post.interface'
import { EditPost, Post } from '../post.entity'
import { PostService } from '../post.service'
import { UserService } from '@/user/user.service'

@Resolver()
export class MutationPostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createNewPost(
    @GqlUser() user: IUser,
    @Args('name') name: string,
    @Args({
      name: 'content',
      type: () => String,
      nullable: true,
    })
    content: string,
  ): Promise<IPost> {
    const { id: createdBy } = user
    const post = await this.postService.create({ name, content })
    await this.userService.findByIdAndUpdate(
      createdBy,
      {
        $push: { postIds: post.id },
      },
      { new: true },
    )
    return post
  }

  @Mutation(() => Post)
  async editPost(
    @Args('postId') postId: string,
    @Args('editPost') edit: EditPost,
  ): Promise<IPost> {
    return await this.postService.findByIdAndUpdate(postId, edit, { new: true })
  }
}

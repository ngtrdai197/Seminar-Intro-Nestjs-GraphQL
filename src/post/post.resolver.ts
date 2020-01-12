import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { Post, EditPost } from './post.entity'
import { PostService } from './post.service'
import { IPost } from './interfaces/post.interface'
import { GqlUser } from '@/common/decorators/current-user.decorator'
import { IUser } from '@/user/interface/user.interface'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@/common/guards/gql.guard'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createNewPost(
    @GqlUser() user: IUser,
    @Args('name') name: string,
    @Args('content') content: string,
  ): Promise<IPost> {
    const { id: createdBy } = user
    return await this.postService.create({ createdBy, name, content })
  }

  @Mutation(() => Post)
  async editPost(
    @Args('postId') postId: string,
    @Args('editPost') edit: EditPost,
  ): Promise<IPost> {
    return await this.postService.update(postId, edit)
  }

  @Query(() => [Post])
  async fetchPosts(): Promise<IPost[]> {
    return await this.postService.find()
  }
}

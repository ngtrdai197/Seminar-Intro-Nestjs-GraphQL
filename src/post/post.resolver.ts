import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { Post, EditPost } from './post.entity'
import { PostService } from './post.service'
import { IPost } from './interfaces/post.schema'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createNewPost(
    @Args('name') name: string,
    @Args('content') content: string,
  ): Promise<IPost> {
    return await this.postService.create(name, content)
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
    return await this.postService.find({})
  }
}

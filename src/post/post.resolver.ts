import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { Post } from './post.entity'
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
}

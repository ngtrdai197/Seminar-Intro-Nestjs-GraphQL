import { Resolver, Query } from '@nestjs/graphql'

import { Post } from '../post.entity'
import { IPost } from '../interfaces/post.interface'
import { PostService } from '../post.service'

@Resolver(() => Post)
export class QueryPostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async fetchPosts(): Promise<IPost[]> {
    return await this.postService.find()
  }
}

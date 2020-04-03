import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql'
import { User } from '../user.entity'
import { Post } from '@/post/post.entity'
import { IPost } from '@/post/interfaces/post.interface'
import { PostService } from '@/post/post.service'

@Resolver(() => User)
export class PropertyUserResovler {
  constructor(private readonly postService: PostService) {}

  @ResolveField('posts', () => [Post], { nullable: true })
  async getPosts(
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
    return this.postService.find({
      _id: { $in: user.postIds },
      name: new RegExp(postName, 'i'),
    })
  }
}

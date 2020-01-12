import { Controller, Get, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { validateQuery } from '@/common/utils/validate-query.utils'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('fetch')
  async fetchPost(@Query() query: { [key: string]: any }) {
    const { content, name } = query
    query = validateQuery(query)
    return await this.postService.find({
      $or: [
        {
          content: content ? new RegExp(content, 'i') : null,
        },
        {
          name: name ? new RegExp(name, 'i') : null,
        },
      ],
    })
  }
}

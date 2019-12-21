import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IPost } from './interfaces/post.schema'
import { UserService } from '../user/user.service'
import { POST_MODEL } from '../constants'

@Injectable()
export class PostService {
  constructor(
    // @Inject(POST_MODEL) private readonly postModel: Model<IPost>,

    @InjectModel(POST_MODEL) private readonly postModel: Model<IPost>,
    private readonly userService: UserService,
  ) {}

  async find(conditions?: { [key: string]: any }): Promise<IPost[]> {
    return await this.postModel.find(conditions)
  }

  async create(name: string, content?: string): Promise<IPost> {
    const post = await this.postModel.create({ name, content })
    const user = await this.userService.findById('5dfde25da7a2d0355ef727dd')
    user.posts.push(post._id)
    user.set('posts', user.posts)
    await user.save()
    return post
  }
}

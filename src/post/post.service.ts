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
    await this.userService.update('5e07341f40b8da005acab1a1', {
      $push: { postIds: post._id },
    })
    return post
  }

  async update(id: string, docs: { [key: string]: any }): Promise<IPost> {
    return await this.postModel.findByIdAndUpdate(id, docs, { new: true })
  }
}

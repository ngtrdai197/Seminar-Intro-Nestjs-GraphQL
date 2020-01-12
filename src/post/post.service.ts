import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IPost } from './interfaces/post.interface'
import { UserService } from '@/user/user.service'
import { POST_MODEL } from '@/common/constants'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(POST_MODEL) private readonly postModel: Model<IPost>,
    private readonly userService: UserService,
  ) {}

  async find(conditions?: { [key: string]: any }): Promise<IPost[]> {
    return await this.postModel.find(conditions)
  }

  async create({
    createdBy,
    name,
    content,
  }: {
    createdBy: string
    name: string
    content?: string
  }): Promise<IPost> {
    const post = await this.postModel.create({ name, content })
    await this.userService.update(createdBy, {
      $push: { postIds: post.id },
    })
    return post
  }

  async update(id: string, docs: { [key: string]: any }): Promise<IPost> {
    return await this.postModel.findByIdAndUpdate(id, docs, { new: true })
  }
}

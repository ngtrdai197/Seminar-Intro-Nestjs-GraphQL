import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IPost } from './interfaces/post.interface'
import { POST_MODEL } from '@/common/constants'
import { BaseService } from '@/common/services/base.service'

@Injectable()
export class PostService extends BaseService<IPost> {
  constructor(
    @InjectModel(POST_MODEL) private readonly postModel: Model<IPost>,
  ) {
    super(postModel)
  }
}

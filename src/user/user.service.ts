import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IUser } from './interface/user.interface'
import { USER_MODEL } from '@/common/constants'
import { BaseService } from '@/common/services/base.service'

@Injectable()
export class UserService extends BaseService<IUser> {
  NOT_FOUND_ERROR = 'User does not exists'
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<IUser>,
  ) {
    super(userModel)
  }
}

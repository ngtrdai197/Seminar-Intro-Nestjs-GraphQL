import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MESSAGE_MODEL } from '@/common/constants'
import { IMessage } from './interfaces/message.interface'
import { BaseService } from '@/common/services/base.service'

@Injectable()
export class MessageService extends BaseService<IMessage> {
  constructor(
    @InjectModel(MESSAGE_MODEL) private messageModel: Model<IMessage, {}>,
  ) {
    super(messageModel)
  }
}

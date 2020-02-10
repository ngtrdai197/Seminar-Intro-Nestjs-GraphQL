import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CONVERSATION_MODEL } from '@/common/constants'
import { IConversation } from './interfaces/conversation.interface'
import { BaseService } from '@/common/services/base.service'

@Injectable()
export class ConversationService extends BaseService<IConversation> {
  constructor(
    @InjectModel(CONVERSATION_MODEL)
    private conversationModel: Model<IConversation, {}>,
  ) {
    super(conversationModel)
  }
}

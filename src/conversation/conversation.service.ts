import { Injectable } from '@nestjs/common'
import { CONVERSATION_MODEL } from '@/common/constants'
import { IConversation } from './interfaces/conversation.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
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

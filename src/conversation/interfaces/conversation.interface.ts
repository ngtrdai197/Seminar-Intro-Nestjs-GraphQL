import { Document } from 'mongoose'
import { IUser } from '@/user/interface/user.interface'
import { IMessage } from '@/message/interfaces/message.interface'

export interface IConversation extends Document {
  readonly name: string
  readonly createdById: string
  readonly createdBy: IUser
  readonly participantIds: string[]
  readonly participants: IUser[]
  readonly messageIds: string[]
  readonly messages: IMessage[]
}

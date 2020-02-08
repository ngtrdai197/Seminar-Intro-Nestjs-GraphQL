import { IUser } from '@/user/interface/user.interface'
import { Document } from 'mongoose'

export interface IMessage extends Document {
  readonly createdById: string
  readonly createdBy: IUser
  readonly content: string
  readonly isEdited: boolean
}

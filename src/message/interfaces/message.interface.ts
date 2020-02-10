import { Document } from 'mongoose'

import { IUser } from '@/user/interface/user.interface'

export interface IMessage extends Document {
  readonly createdById: string
  readonly createdBy: IUser
  readonly content: string
  readonly isEdited: boolean
}

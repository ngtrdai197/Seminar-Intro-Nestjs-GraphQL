import { Document } from 'mongoose'

import { IUser } from '@/user/interface/user.interface'

export interface IBook extends Document {
  name: string
  author: string
  genres: string[]
  description: string
  price: number
  createdById: string
  createdBy: IUser
}

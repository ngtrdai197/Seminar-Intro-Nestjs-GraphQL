import { Document } from 'mongoose'

import { IPost } from '@/post/interfaces/post.interface'

export interface IUser extends Document {
  readonly username: string
  readonly password: string
  readonly fullName: string
  readonly address: string
  readonly postIds: string[]
  readonly roles: string[]
  readonly posts: IPost[]
}

import { Document } from 'mongoose'

export interface IUser extends Document {
  readonly username: string
  readonly fullName: string
  readonly address?: string
  readonly posts?: string[]
}

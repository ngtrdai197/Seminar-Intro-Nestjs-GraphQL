import { Document } from 'mongoose'
export interface IPost extends Document {
  readonly name: string
  readonly content: string
}

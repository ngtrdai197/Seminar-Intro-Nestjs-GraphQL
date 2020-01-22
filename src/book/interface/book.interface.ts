import { Document } from 'mongoose'

export interface IBook extends Document {
  name: string
  author: string
  genres: string[]
  description: string
  price: number
}

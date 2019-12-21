import { Schema } from 'mongoose'

export const PostSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String },
})

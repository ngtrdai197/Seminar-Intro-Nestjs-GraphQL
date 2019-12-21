import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
})

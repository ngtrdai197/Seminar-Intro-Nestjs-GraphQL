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
  postIds: {
    type: [String],
    default: [],
  },
})

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: 'postIds',
  foreignField: '_id',
  justOne: false,
  options: { sort: { name: -1 } },
})

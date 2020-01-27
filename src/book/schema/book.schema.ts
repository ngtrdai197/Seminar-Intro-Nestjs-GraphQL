import { Schema } from 'mongoose'

export const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    genres: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdById: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id, delete ret.__v
      },
    },
  },
)
BookSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'createdById',
  foreignField: '_id',
  justOne: true,
})

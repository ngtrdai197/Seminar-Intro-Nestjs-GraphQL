import { Schema } from 'mongoose'

export const MessageSchema = new Schema(
  {
    createdById: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id, delete ret.__v
      },
    },
  },
)

MessageSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'createdById',
  foreignField: '_id',
  justOne: false,
})

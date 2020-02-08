import { Schema } from 'mongoose'

export const ConversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdById: {
      type: String,
      required: true,
    },
    participantIds: [String],
    messageIds: [String],
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

ConversationSchema.virtual('messages', {
  ref: 'Message',
  localField: 'messageIds',
  foreignField: '_id',
  justOne: false,
})
ConversationSchema.virtual('createdBy', {
  ref: 'User',
  localField: 'createdById',
  foreignField: '_id',
  justOne: true,
})
ConversationSchema.virtual('participants', {
  ref: 'User',
  localField: 'participantIds',
  foreignField: '_id',
  justOne: false,
})

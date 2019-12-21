import { Connection } from 'mongoose'
import { POST_MODEL, DATABASE_CONNECTION } from '../constants'
import { PostSchema } from './schema/post.schema'

export const postProviders = [
  {
    provide: POST_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(POST_MODEL, PostSchema, POST_MODEL),
    inject: [DATABASE_CONNECTION],
  },
]

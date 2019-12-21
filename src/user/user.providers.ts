import { Connection } from 'mongoose'
import { UserSchema } from './schema/user.schema'
import { USER_MODEL, DATABASE_CONNECTION } from '../constants'

export const userProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(USER_MODEL, UserSchema, USER_MODEL),
    inject: [DATABASE_CONNECTION],
  },
]

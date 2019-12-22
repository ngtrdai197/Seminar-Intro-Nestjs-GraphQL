import * as mongoose from 'mongoose'
import { DATABASE_CONNECTION } from '../constants'
import { ConfigService } from '@nestjs/config'

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService) => {
      return await mongoose.createConnection(
        configService.get<string>('DB_CONNECTION_STRING'),
        {
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
        },
      )
    },
    inject: [ConfigService],
  },
]

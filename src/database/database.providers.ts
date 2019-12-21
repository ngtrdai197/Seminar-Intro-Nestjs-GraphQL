import * as mongoose from 'mongoose'
import { DATABASE_CONNECTION } from '../constants'
import { ConfigService } from '../config/config.service'
import { ConfigModule } from '../config/config.module'

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService) => {
      return await mongoose.createConnection(configService.uriConnectDB, {
        useNewUrlParser: true,
        useFindAndModify: true,
      })
    },
    inject: [ConfigService],
  },
]

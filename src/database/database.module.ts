import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { MongooseconfigService } from './mongooseconfig.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseconfigService, // TODO: useClass
      inject: [ConfigService],
    }),
  ],
  // providers: [...databaseProviders], // TODO: using for provider
  // exports: [...databaseProviders], // TODO: using for provider
})
export class DatabaseModule {}

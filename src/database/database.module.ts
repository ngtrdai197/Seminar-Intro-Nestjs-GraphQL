import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { MongooseConfigService } from './mongoose-config.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useClass: MongooseConfigService, // TODO: useClass
    //   inject: [ConfigService],
    // }),
    ConfigModule, // TODO: inject ConfigService inside db.providers
  ],
  providers: [...databaseProviders], // TODO: using for provider
  exports: [...databaseProviders], // TODO: using for provider
})
export class DatabaseModule {}

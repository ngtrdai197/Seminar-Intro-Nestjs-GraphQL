import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { MongooseConfigService } from './mongoose-config.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService, // TODO: useClass
    }),
  ],
  providers: [...databaseProviders], // TODO: provider
  exports: [...databaseProviders], // TODO: provider
})
export class DatabaseModule {}

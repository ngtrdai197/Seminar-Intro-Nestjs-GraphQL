import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { MongooseconfigService } from './mongooseconfig.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseconfigService, // TODO: useClass
    }),
  ],
  providers: [...databaseProviders], // TODO: using for provider
  exports: [...databaseProviders], // TODO: using for provider
})
export class DatabaseModule {}

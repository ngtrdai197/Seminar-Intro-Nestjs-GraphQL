import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'

@Injectable()
export class MongooseconfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://localhost/nest',
    }
  }
}

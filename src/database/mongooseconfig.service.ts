import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigService } from '../config/config.service'

@Injectable()
export class MongooseconfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `${this.configService.uriConnectDB}`,
    }
  }
}

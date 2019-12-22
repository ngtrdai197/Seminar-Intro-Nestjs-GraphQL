import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `${this.configService.get<string>('DB_CONNECTION_STRING')}`,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    }
  }
}

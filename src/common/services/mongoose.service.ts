import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      //   uri: this.configService.get<string>('DB_CONNECTION_STRING'),
      uri: 'mongodb://localhost/book-store',
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  }
}

import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      // TODO: check it, why not able connect to db when use configService
      // uri: this.configService.get<string>('DB_CONNECTION_STRING'),
      uri: `mongodb://localhost:27017/book-store`,
      // uri: `mongodb://nest-mongodb:27017/book-store`,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  }
}

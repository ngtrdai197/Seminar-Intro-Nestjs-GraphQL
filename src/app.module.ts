import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './user/user.module'
import { DatabaseModule } from './database/database.module'
import { PostModule } from './post/post.module'
import { PubsubModule } from './pubsub/pubsub.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    // DatabaseModule, // TODO: import here
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECTION_STRING'),
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    PubsubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

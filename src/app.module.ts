import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './user/user.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { PostModule } from './post/post.module'
import { PubsubModule } from './pubsub/pubsub.module'

@Module({
  imports: [
    // DatabaseModule, // TODO: import here
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.uriConnectDB,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule,
    UserModule,
    PostModule,
    PubsubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

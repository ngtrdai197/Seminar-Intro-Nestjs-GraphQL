import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { PubsubModule } from './pubsub/pubsub.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/book-store`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    PubsubModule,
    AuthModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('user')
  }
}

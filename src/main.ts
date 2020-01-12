import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { AllExceptionsFilter, HttpGqlExceptionFilter } from './common/filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.setGlobalPrefix('/v1/api')
  app.useGlobalFilters(new HttpGqlExceptionFilter(), new AllExceptionsFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())

  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('PORT'), () => {
    console.log(
      `Server started at port: ${configService.get<number>('PORT')} 🚀🚀🚀`,
    )
  })
}
bootstrap()

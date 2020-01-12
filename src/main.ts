import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { HttpExceptionFilter } from './common/filter/gql-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.setGlobalPrefix('/v1/api')
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())

  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('PORT'), () => {
    console.log(
      `Server started at port: ${configService.get<number>('PORT')} 🚀🚀🚀`,
    )
  })
}
bootstrap()

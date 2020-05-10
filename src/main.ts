import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger } from '@nestjs/common'
import compression from 'compression'
import chalk from 'chalk'
import log4js from 'log4js'
import morgan from 'morgan'

import { AppModule } from './app.module'
import { AllExceptionsFilter, HttpGqlExceptionFilter } from './common/filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors()

  app.setGlobalPrefix('/v1/api')
  // app.useGlobalFilters(new HttpGqlExceptionFilter(), new AllExceptionsFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.use(compression())
  // app.use(morgan('common'))

  // write logs to files ...
  app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'debug' }))

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT')
  await app.init()
  await app.listen(PORT)
  Logger.log(
    `Server started at port: ${chalk.hex('#87e8de').bold(PORT)} 🚀🚀🚀`,
    'Bootstrap',
  )

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()

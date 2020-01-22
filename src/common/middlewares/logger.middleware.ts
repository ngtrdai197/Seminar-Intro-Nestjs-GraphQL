import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization && !req.body.authorization) {
      throw new HttpException('Missing header', HttpStatus.UNAUTHORIZED)
    }
    next()
  }
}

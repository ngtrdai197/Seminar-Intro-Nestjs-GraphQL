import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { Request } from 'express'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(`LoggingInterceptor`)
    const request: Request = context.switchToHttp().getRequest()
    return next.handle().pipe(map(response => response))
  }
}

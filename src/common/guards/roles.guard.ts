import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IUser } from 'src/user/interface/user.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    console.log(`RolesGuard`)
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return false
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user as IUser
    const hasRole = () => user.roles.some(role => roles.includes(role))
    if (user && user.roles && hasRole()) {
      return true
    }
    throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IUser } from '@/user/interface/user.interface'
import { ForbiddenException } from '@/common/exceptions/forbidden.exception'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
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
    throw new ForbiddenException()
  }
}

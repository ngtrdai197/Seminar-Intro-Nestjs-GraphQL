import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
  constructor() {
    super(`You do not have permission`, HttpStatus.FORBIDDEN)
  }
}

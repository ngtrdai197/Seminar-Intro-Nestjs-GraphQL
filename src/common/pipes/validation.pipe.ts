import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { EditUserDto } from '@/user/dto/edit-user.dto'
import { Types } from 'mongoose'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype, type, data }: ArgumentMetadata) {
    const object = plainToClass(metatype, value)
    if (type === 'body') {
      if (object instanceof EditUserDto) {
        delete value.username
      }
      const errors = await validate(object)
      if (errors.length > 0) {
        const messages = errors.map(rec => ({
          property: rec.target,
          err: rec.constraints,
        }))
        throw new BadRequestException(messages, 'Validation failed')
      }
    }
    if (type === 'param') {
      if (!Types.ObjectId.isValid(value)) {
        throw new BadRequestException('Not an ObjectId')
      }
    }
    return value
  }
}

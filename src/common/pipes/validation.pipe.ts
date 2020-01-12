import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { EditUserDto } from '@/user/dto/edit-user.dto'
import * as mongoose from 'mongoose'

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
        throw new BadRequestException(errors, 'Validation failed')
      }
    }
    if (type === 'param') {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new HttpException('Not an ObjectId', HttpStatus.BAD_REQUEST)
      }
    }
    return value
  }
}

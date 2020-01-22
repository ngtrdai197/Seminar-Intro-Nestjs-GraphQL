import {
  PipeTransform,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import * as mongoose from 'mongoose'

export class ValidateParamsMongoId implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new HttpException('Not an ObjectId', HttpStatus.BAD_REQUEST)
    }
    return value
  }
}

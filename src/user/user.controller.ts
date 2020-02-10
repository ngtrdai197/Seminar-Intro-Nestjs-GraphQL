import {
  Controller,
  Get,
  UseGuards,
  Delete,
  HttpException,
  Put,
  Body,
  Param,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
  Post,
  Res,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport'
import { join } from 'path'
import * as multer from 'multer'
import { Response } from 'express'

import { UserService } from './user.service'
import { IUser } from './interface/user.interface'
import { CurrentUser, Roles } from '@/common/decorators'
import { RolesGuard } from '@/common/guards/roles.guard'
import { ValidationPipe } from '@/common/pipes/validation.pipe'
import { EditUserDto } from './dto/edit-user.dto'
import { editFileName } from '@/common/utils/editFilename.utils'
import { imageFileFilter } from '@/common/utils/imageFileFilter.utils'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('uploads/avatar')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: multer.diskStorage({
        destination: join(__dirname, '..', 'public'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFiles(@UploadedFiles() files) {
    console.log('files', files)
  }

  @Get('avatar')
  getFile(@Res() res: Response) {
    res.sendFile('2020-02-03-d4ce.png', {
      root: join(__dirname, '..', 'public'),
    })
  }

  @Get('fetch')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['admin, user'])
  async fetchUsers(): Promise<IUser[]> {
    return await this.userService.find()
  }

  @Put('update/:userId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['admin', 'user'])
  async updateUser(
    @CurrentUser() user: IUser,
    @Param('userId', new ValidationPipe()) id: string,
    @Body(new ValidationPipe()) body: EditUserDto,
  ) {
    if (id !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return await this.userService.findByIdAndUpdate(id, body, { new: true })
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:userId')
  async removeUser(
    @Param('userId', new ValidationPipe()) userId: string,
  ): Promise<boolean> {
    const exist = await this.userService.findOne({ postIds: { $gte: 1 } })
    if (exist) {
      return await this.userService.delete({ _id: userId })
    }
    return false
  }
}

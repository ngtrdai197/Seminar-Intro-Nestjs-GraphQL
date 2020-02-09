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
} from '@nestjs/common'
import { UserService } from './user.service'
import { IUser } from './interface/user.interface'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { RolesGuard } from '@/common/guards/roles.guard'
import { Roles } from '@/common/decorators/roles.decorator'
import { ValidationPipe } from '@/common/pipes/validation.pipe'
import { EditUserDto } from './dto/edit-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

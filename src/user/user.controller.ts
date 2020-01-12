import {
  Controller,
  Get,
  Req,
  UseGuards,
  Delete,
  HttpException,
  Put,
  Body,
  Param,
  SetMetadata,
  HttpStatus,
} from '@nestjs/common'
import { UserService } from './user.service'
import { IUser } from './interface/user.interface'
import { Request } from 'express'
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
  @SetMetadata('roles', ['admin', 'user'])
  async fetchUsers(@CurrentUser() user: IUser | any): Promise<IUser[]> {
    return await this.userService.fetchUsers()
  }

  @Put('update/:userId')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @CurrentUser() user: IUser,
    @Param('userId', new ValidationPipe()) id: string,
    @Body(new ValidationPipe()) body: EditUserDto,
  ) {
    if (id !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return await this.userService.update(id, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove')
  async removeUser(@Req() req: Request): Promise<IUser[]> {
    const result = await this.userService.fetchUsers()
    if (result) {
      throw new HttpException('test dadas error', 404)
    }
    return result
  }
}

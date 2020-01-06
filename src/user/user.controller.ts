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
} from '@nestjs/common'
import { UserService } from './user.service'
import { IUser } from './interface/user.interface'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { ValidateParamsMongoId } from '../common/pipes/validation-mongo-id.pipe'
import { EditUserInput } from './user.entity'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { RolesGuard } from 'src/common/guards/roles.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('fetch')
  @UseGuards(AuthGuard('jwt'))
  @SetMetadata('roles', ['admin'])
  async fetchUsers(@CurrentUser() user: IUser | any): Promise<IUser[]> {
    return await this.userService.fetchUsers()
  }

  @Put('update/:id')
  async updateUser(
    @Body() body: EditUserInput,
    @Param('id', new ValidateParamsMongoId()) id: string,
  ) {
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

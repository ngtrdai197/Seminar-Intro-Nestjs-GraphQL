import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { IUser } from './interface/user.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('fetch')
  async fetchUsers(): Promise<IUser[]> {
    return await this.userService.fetchUsers()
  }
}

import { Controller, Body, Post, Get } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { UserService } from '@/user/user.service'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { IUser } from '@/user/interface/user.interface'

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Post('signup')
  async signUp(@Body() createUser: CreateUserDto): Promise<IUser> {
    const { username, password, fullName, address } = createUser
    return await this.userService.createUser({
      username,
      password,
      fullName,
      address,
    })
  }
}

import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { IUser } from '@/user/interface/user.interface'
import { ValidationPipe } from '@/common/pipes/validation.pipe'
import { CurrentUser } from '@/common/decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) createUser: CreateUserDto,
  ): Promise<IUser> {
    return await this.authService.signUp(createUser)
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@CurrentUser() user: IUser | { [key: string]: any }) {
    return user
  }
}

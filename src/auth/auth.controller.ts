import { Controller, Body, Post, Get } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@/user/dto/create-user.dto'
import { IUser } from '@/user/interface/user.interface'
import { ValidationPipe } from '@/common/pipes/validation.pipe'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Post('signup')
  async signUp(@Body() createUser: CreateUserDto): Promise<IUser> {
    return await this.authService.signUp(createUser)
  }
}

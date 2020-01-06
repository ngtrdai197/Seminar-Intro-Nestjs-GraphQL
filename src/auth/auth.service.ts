import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { IUser } from 'src/user/interface/user.interface'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { IValidatePayload } from './interface/validate-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(validate: IValidatePayload): Promise<IUser> {
    const { username, fullName } = validate
    const user = await this.userService.findOne({ username, fullName })
    if (!user) {
      throw new HttpException('Unauthorization', HttpStatus.UNAUTHORIZED)
    }
    return user
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOne({ username: loginDto.username })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    if (user.password !== loginDto.password) {
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST)
    }
    const payload: IValidatePayload = {
      username: user.username,
      fullName: user.fullName,
    }
    const token = this.createToken(payload)
    return { accessToken: token }
  }

  private createToken(payload: IValidatePayload): string {
    return this.jwtService.sign(payload)
  }
}

import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { UserModule } from '@/user/user.module'
import { JwtStrategyService } from './jwt-strategy.service'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, JwtStrategyService, AuthResolver],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

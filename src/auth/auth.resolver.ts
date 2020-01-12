import { User } from '@/user/user.entity'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { IUser } from '@/user/interface/user.interface'
import { CreateNewUserInput } from './auth.entity'
import { GraphQLJSON } from 'graphql-type-json'

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async createNewUser(
    @Args('newUser') newUser: CreateNewUserInput,
  ): Promise<IUser> {
    return await this.authService.signUp(newUser)
  }

  @Mutation(() => GraphQLJSON)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.authService.login({ username, password })
  }
}

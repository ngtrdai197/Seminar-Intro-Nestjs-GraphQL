import { Resolver, Query } from '@nestjs/graphql'
import { User } from '../user.entity'
import { IUser } from '../interface/user.interface'
import { UserService } from '../user.service'

@Resolver(() => User)
export class QueryUserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async fetchUsers(): Promise<IUser[]> {
    return await this.userService.find()
  }
}

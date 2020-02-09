import { Resolver, Query } from '@nestjs/graphql'
import { User } from '../user.entity'
import { IUser } from '../interface/user.interface'
import { UserService } from '../user.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@/common/guards/gql.guard'

@Resolver(() => User)
export class QueryUserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async fetchUsers(): Promise<IUser[]> {
    return await this.userService.find()
  }
}

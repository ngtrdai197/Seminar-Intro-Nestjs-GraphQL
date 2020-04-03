import { Resolver, Query, Args, Directive, Int } from '@nestjs/graphql'
import { User, PaginationUser } from '../user.entity'
import { IUser } from '../interface/user.interface'
import { UserService } from '../user.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@/common/guards/gql.guard'
import { IPagination } from '@/common/base.interface'

@Resolver(() => User)
export class QueryUserResolver {
  constructor(private readonly userService: UserService) {}

  @Directive(
    '@deprecated(reason: "This query will be removed in the next version")',
  )
  @Query(() => PaginationUser)
  // @UseGuards(GqlAuthGuard)
  async fetchUsers(
    @Args({ name: 'limit', type: () => Int }) limit: number,
    @Args({ name: 'skip', type: () => Int }) skip: number,
  ): Promise<IPagination<IUser>> {
    return this.userService.pagination({ limit, skip })
  }
}

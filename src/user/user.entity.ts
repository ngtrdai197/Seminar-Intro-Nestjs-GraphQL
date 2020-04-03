import { ObjectType, Field, InputType, Int } from '@nestjs/graphql'

import { BaseEntity, PaginationBase } from '@/common/base.entity'

@ObjectType({ implements: BaseEntity })
export class User extends BaseEntity {
  @Field(() => String)
  username: string

  @Field(() => String)
  password: string

  @Field(() => String)
  fullName: string

  @Field(() => String, { nullable: true })
  address: string

  @Field(() => [String], { nullable: true })
  postIds: string[]
}

@InputType()
export class EditUserInput implements Partial<User> {
  @Field(() => String, { nullable: true })
  username?: string

  @Field(() => String, { nullable: true })
  address?: string

  @Field(() => String, { nullable: true })
  fullName?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => String, { nullable: true })
  postIds?: string[]

  @Field(() => [String], { nullable: true })
  roles?: string[]
}

@ObjectType({ implements: PaginationBase })
export class PaginationUser extends PaginationBase {
  @Field(() => [User])
  results: User[]
}

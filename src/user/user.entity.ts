import { ObjectType, Field, InputType, Int, PartialType } from '@nestjs/graphql'

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

  @Field(() => [String])
  roles: string[]
}

@InputType()
export class EditUserInput extends PartialType(User) {}

@ObjectType({ implements: PaginationBase })
export class PaginationUser extends PaginationBase {
  @Field(() => [User])
  results: User[]
}

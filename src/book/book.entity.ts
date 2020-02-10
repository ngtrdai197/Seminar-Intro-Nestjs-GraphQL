import { ObjectType, Field, Float, InputType } from 'type-graphql'

import { BaseEntity } from '@/common/base.entity'
import { User } from '@/user/user.entity'

@ObjectType({ implements: BaseEntity })
export class Book extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  author: string

  @Field(() => [String])
  genres: string[]

  @Field(() => String)
  description: string

  @Field(() => Float, { nullable: true })
  price?: number

  @Field(() => String)
  createdById: string

  @Field(() => User)
  createdBy: User
}

@InputType()
export class CreateNewBookInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  author: string

  @Field(() => [String])
  genres: string[]

  @Field(() => String)
  description: string

  @Field(() => Float, { nullable: true })
  price?: number

  @Field(() => String, { nullable: true })
  createdById?: string
}

@InputType()
export class EditBookInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  author?: string

  @Field(() => [String], { nullable: true })
  genres?: string[]

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  price?: number
}

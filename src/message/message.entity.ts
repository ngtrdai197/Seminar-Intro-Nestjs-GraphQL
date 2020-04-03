import { Field, ObjectType, InputType, Int } from '@nestjs/graphql'

import { User } from '@/user/user.entity'
import { BaseEntity, PaginationBase } from '@/common/base.entity'

@ObjectType({ implements: BaseEntity })
export class Message extends BaseEntity {
  @Field(() => String)
  readonly createdById: string

  @Field(() => User)
  readonly createdBy: User

  @Field(() => String)
  readonly content: string

  @Field(() => Boolean)
  readonly isEdited: boolean
}

@InputType()
export class CreateMessageInput {
  @Field(() => String, { nullable: true })
  createdById?: string

  @Field(() => String)
  content: string
}

@InputType()
export class EditMessageInput {
  @Field(() => String, { nullable: true })
  content?: string

  @Field(() => Boolean, { nullable: true })
  isEdited?: boolean
}

@ObjectType({ implements: PaginationBase })
export class PaginationMessage extends PaginationBase {
  @Field(() => [Message])
  results: Message[]
}

import { ObjectType, Field, InputType } from '@nestjs/graphql'

import { User } from '@/user/user.entity'
import { Message } from '@/message/message.entity'
import { BaseEntity } from '@/common/base.entity'

@ObjectType({ implements: BaseEntity })
export class Conversation extends BaseEntity {
  @Field(() => String)
  readonly name: string

  @Field(() => String)
  readonly createdById: string

  @Field(() => User)
  readonly createdBy: User

  @Field(() => [String], { nullable: true, defaultValue: [] })
  readonly participantIds?: string[]

  @Field(() => [User], { nullable: true, defaultValue: [] })
  readonly participants?: User[]

  @Field(() => [String], { nullable: true, defaultValue: [] })
  readonly messageIds?: string[]

  @Field(() => [Message], { nullable: true, defaultValue: [] })
  readonly messages?: Message[]
}

@InputType()
export class CreateConversationInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  createdById?: string

  @Field(() => [String], { nullable: true, defaultValue: [] })
  participantIds?: string[]
}

@InputType()
export class EditConversationInput {
  @Field(() => String, {
    nullable: true,
    description: 'Name of the conversation',
  })
  name?: string

  @Field(() => [String], {
    nullable: true,
    description: 'People who join the conversation',
  })
  participantIds?: string[]

  @Field(() => [String], {
    nullable: true,
    description: 'Messages ID in conversation',
  })
  messageIds?: string[]
}

@ObjectType()
export class ConversationSubscription {
  @Field(() => String)
  conversationId: string

  @Field(() => Message)
  message: Message
}

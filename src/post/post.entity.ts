import { ObjectType, Field, InputType } from 'type-graphql'

import { BaseEntity } from '@/common/base.entity'

@ObjectType({ implements: BaseEntity })
export class Post extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  content: string
}

@InputType()
export class EditPost {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  content?: string
}

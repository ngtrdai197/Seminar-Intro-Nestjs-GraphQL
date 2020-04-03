import { InterfaceType, Field, ID, Int } from '@nestjs/graphql'

@InterfaceType()
export abstract class BaseEntity {
  @Field(() => ID)
  id: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}

@InterfaceType()
export abstract class PaginationBase {
  @Field(() => Int, { nullable: true })
  total?: number

  @Field(() => Boolean, { nullable: true })
  hasNext?: number

  @Field(() => Boolean, { nullable: true })
  hasPre?: boolean
}

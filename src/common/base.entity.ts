import { InterfaceType, Field, ID } from 'type-graphql'

@InterfaceType()
export abstract class BaseEntity {
  @Field(() => ID)
  id: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}

import { InputType, Field, ID } from 'type-graphql'

@InputType()
export class CreateNewUserInput {
  @Field(() => ID)
  id: string

  @Field(() => String)
  username: string

  @Field(() => String)
  fullName: string

  @Field(() => String)
  password: string

  @Field(() => String, { nullable: true })
  address: string
}

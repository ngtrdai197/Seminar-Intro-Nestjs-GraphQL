import { InputType, Field, ID } from 'type-graphql'

@InputType()
export class CreateNewUserInput {
  @Field(() => String)
  username: string

  @Field(() => String)
  fullName: string

  @Field(() => String)
  password: string

  @Field(() => String, { nullable: true })
  address: string
}

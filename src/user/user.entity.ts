import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  // tslint:disable-next-line: variable-name
  _id: string

  @Field(type => String)
  username: string

  @Field(type => String)
  password: string

  @Field(type => String)
  fullName: string

  @Field(type => String, { nullable: true })
  address?: string

  @Field(type => [String])
  postIds: string[]
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class EditUserInput {
  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  fullName?: string

  @Field({ nullable: true })
  address?: string

  @Field(() => [String], { nullable: true })
  roles?: string[]
}

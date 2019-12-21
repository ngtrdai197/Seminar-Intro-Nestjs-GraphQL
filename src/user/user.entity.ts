import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  // tslint:disable-next-line: variable-name
  _id: string

  @Field(type => String)
  username: string

  @Field(type => String)
  fullName: string

  @Field(type => String)
  address: string
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class EditUser {
  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  fullName?: string

  @Field({ nullable: true })
  address?: string
}

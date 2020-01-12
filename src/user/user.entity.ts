import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field(type => String)
  username: string

  @Field(type => String)
  password: string

  @Field(type => String)
  fullName: string

  @Field(type => String, { nullable: true })
  address: string

  @Field(type => [String], { nullable: true })
  postIds: string[]
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class EditUserInput implements Partial<User> {
  @Field(type => String, { nullable: true })
  username?: string

  @Field(type => String, { nullable: true })
  address?: string

  @Field(type => String, { nullable: true })
  fullName?: string

  @Field(type => String, { nullable: true })
  password?: string

  @Field(type => String, { nullable: true })
  postIds?: string[]

  @Field(() => [String], { nullable: true })
  roles: string[]
}

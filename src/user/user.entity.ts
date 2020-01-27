import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field(() => String)
  username: string

  @Field(() => String)
  password: string

  @Field(() => String)
  fullName: string

  @Field(() => String, { nullable: true })
  address: string

  @Field(() => [String], { nullable: true })
  postIds: string[]
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class EditUserInput implements Partial<User> {
  @Field(() => String, { nullable: true })
  username?: string

  @Field(() => String, { nullable: true })
  address?: string

  @Field(() => String, { nullable: true })
  fullName?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => String, { nullable: true })
  postIds?: string[]

  @Field(() => [String], { nullable: true })
  roles: string[]
}

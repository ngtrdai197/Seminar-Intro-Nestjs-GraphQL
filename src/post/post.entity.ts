import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType()
export class Post {
  @Field(type => ID)
  // tslint:disable-next-line: variable-name
  _id: string

  @Field(type => String)
  name: string

  @Field(type => String)
  content: string
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class EditPost {
  @Field(type => String, { nullable: true })
  name?: string

  @Field(type => String, { nullable: true })
  content?: string
}

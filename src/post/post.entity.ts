import { ObjectType, Field, ID } from 'type-graphql'

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

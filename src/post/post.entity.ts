import { ObjectType, Field, ID, InputType } from 'type-graphql'

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  content: string
}

// tslint:disable-next-line: max-classes-per-file
@InputType()
export class EditPost {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  content?: string
}

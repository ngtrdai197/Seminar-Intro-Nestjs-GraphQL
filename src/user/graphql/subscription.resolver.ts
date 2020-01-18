import { Resolver, Subscription, Args } from '@nestjs/graphql'
import { User } from '../user.entity'
import { PubsubService } from '@/pubsub/pubsub.service'

@Resolver(() => User)
export class SubscriptionUserResolver {
  constructor(private readonly pubsubService: PubsubService) {}

  @Subscription(() => User, {
    filter(payload, variables, context) {
      return payload.subscribeEditeUser.username === variables.username
    },
  })
  subscribeEditeUser(@Args('username') username: string) {
    return this.pubsubService.editedUser()
  }
}

import { Injectable, Inject } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { PUB_SUB } from '../constants'

@Injectable()
export class PubsubService {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  get pubsub() {
    return this.pubSub
  }

  editedUser() {
    return this.pubSub.asyncIterator('editedUser')
  }
}

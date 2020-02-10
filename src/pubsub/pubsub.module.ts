import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

import { PubsubService } from './pubsub.service'
import { PUB_SUB } from '@/common/constants'

@Module({
  providers: [
    PubsubService,
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PubsubService],
})
export class PubsubModule {}

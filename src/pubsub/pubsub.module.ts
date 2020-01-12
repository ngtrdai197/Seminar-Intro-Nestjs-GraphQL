import { Module } from '@nestjs/common'
import { PubsubService } from './pubsub.service'
import { PubSub } from 'graphql-subscriptions'
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

import { Module } from '@nestjs/common';
import { QueuesResolver } from './queues.resolver';

@Module({
  imports: [],
  providers: [QueuesResolver],
})
export class QueuesModule {}

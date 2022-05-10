import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueuesResolver } from './queues.resolver';

@Module({
  imports: [],
  controllers: [QueueController],
  providers: [QueuesResolver],
})
export class QueuesModule {}

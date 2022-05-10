import { Module } from '@nestjs/common';
import { RecordController } from './record/record.controller';
import { ClientController } from './client.controller';

@Module({
  controllers: [RecordController, ClientController]
})
export class ClientModule {}

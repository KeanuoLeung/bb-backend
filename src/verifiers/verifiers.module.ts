import { Module } from '@nestjs/common';
import { VerifiersController } from './verifiers.controller';

@Module({
  controllers: [VerifiersController]
})
export class VerifiersModule {}

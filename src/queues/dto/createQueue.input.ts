import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQueueInput {
  @Field()
  @IsNotEmpty()
  title: string;
}

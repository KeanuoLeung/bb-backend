import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Queue extends BaseModel {
  title: string;
}

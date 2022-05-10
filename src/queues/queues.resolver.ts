import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { CreateQueueInput } from './dto/createQueue.input';
import { Queue } from './models/queue.model';

@Resolver(() => Queue)
export class QueuesResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Queue)
  async createQueue(@Args('data') data: CreateQueueInput) {
    const newQueue = this.prisma.queue.create({
      data: {
        title: data.title,
      },
    });
    return newQueue;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Queue])
  async queues() {
    const queues = await this.prisma.queue.findMany();
    return queues;
  }
}

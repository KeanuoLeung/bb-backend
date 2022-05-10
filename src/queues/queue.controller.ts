import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User, VerifyStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';

@Controller('queue')
export class QueueController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('hello')
  getQueueHello(): string {
    return 'Hello Queue!';
  }

  @Get()
  @Roles('admin', 'verifier')
  @UseGuards(GqlAuthGuard, RolesGuard)
  getQueues(@UserEntity() user: any) {
    console.log('cur user', user);
    return this.prisma.queue.findMany({
      include: {
        VerifyRecord: {
          where: { verifyStatus: VerifyStatus.PENDING },
          select: { id: true },
        },
      },
    });
  }

  @Post()
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  createQueue(@Body() data: any) {
    return this.prisma.queue.create({
      data: {
        title: data.title,
      },
    });
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  updateQueue(@Param('id') id: string, @Body() data: any) {
    return this.prisma.queue.update({
      where: {
        id,
      },
      data: {
        title: data.title,
      },
    });
  }

  @Get(':id')
  @Roles('admin', 'verifier')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getQueue(@Param('id') id: string) {
    console.log('queue id', id);
    return await this.prisma.queue.findFirst({
      where: {
        id,
      },
      include: {
        VerifyRecord: true,
      },
    });
  }

  // delete queue by id
  @Delete(':id')
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  deleteQueue(@Param('id') id: string) {
    return this.prisma.queue.delete({
      where: {
        id,
      },
    });
  }
}

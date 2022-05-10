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
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Roles('admin')
@UseGuards(GqlAuthGuard, RolesGuard)
@Controller('admin/machine')
export class MachineController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getMachines() {
    return this.prisma.machineStrategy.findMany({
      include: {
        queue: true,
      },
    });
  }

  @Post()
  createMachine(@Body() data: any) {
    return this.prisma.machineStrategy.create({
      data: {
        title: data.title,
        url: data.url,
        content: '模型内容',
        reasonTag: data.reasonTag,
        ...(data.queue
          ? {
              queue: {
                connect: {
                  id: data.queueId,
                },
              },
            }
          : {}),
      },
    });
  }

  @Put('/:id')
  updateMachine(@Param('id') id: string, @Body() data: any) {
    return this.prisma.machineStrategy.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        url: data.url,
        content: data.content,
        queueId: data.queueId,
        reasonTag: data.reasonTag,
      },
    });
  }

  /** Delete machine by id */
  @Delete('/:id')
  deleteMachine(@Param('id') id: string) {
    return this.prisma.machineStrategy.delete({
      where: {
        id,
      },
    });
  }

  /** Get machine by id */
  @Get(':id')
  getMachine(@Param('id') id: string) {
    return this.prisma.machineStrategy.findFirst({
      where: {
        id,
      },
    });
  }
}

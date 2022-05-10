import {
  Body,
  Controller,
  Post,
  Headers,
  Get,
  UseGuards,
} from '@nestjs/common';
import { VerifyStatus } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';

@Controller('client/record')
export class RecordController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async createRecord(
    @Headers('bb-appid') appId: string,
    @Headers('bb-secret') secret: string,
    @Headers('bb-m') m: string,
    @Headers('bb-r') r: string,
    @Body() data: any
  ) {
    const client = await this.prisma.clientAccessToken
      .findFirst({
        where: {
          appid: appId,
          token: secret,
        },
      })
      .Client();

    const webhook = await this.prisma.clientWebhook.findFirst({
      where: {
        clientId: client.id,
      },
    });
    const webhookUrl = webhook.url;

    if (!client) {
      throw new Error('Token not valid');
    }

    console.log(m, r);

    const strategy = await this.prisma.machineStrategy.findFirst({
      where: {
        code: m,
      },
      include: {
        queue: true,
      },
    });

    let reason = '';

    if (r === 'true') {
      reason = strategy.reasonTag;
    }

    const verifyRecord = await this.prisma.verifyRecord.create({
      data: {
        title: data.title,
        content: data.content,
        type: data.type,
        clientId: client.id,
        verifyStatus:
          r === 'true' ? VerifyStatus.PENDING : VerifyStatus.VERIFIED,
        rejectReason: reason,
        oriId: data.oriId,
      },
    });

    if (r === 'true') {
      await this.prisma.verifyRecord.update({
        where: {
          id: verifyRecord.id,
        },
        data: {
          queueId: strategy.queue.id,
        },
      });
    }

    if (verifyRecord.verifyStatus === VerifyStatus.VERIFIED) {
      axios.post(webhookUrl, verifyRecord).catch(() => {});
    }

    return true;
  }

  @Get()
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('client')
  async getRecords(@UserEntity() user: any) {
    const records = await this.prisma.client
      .findFirst({
        where: {
          id: user.id,
        },
      })
      .VerifyRecord({
        orderBy: {
          updatedAt: 'desc',
        },
      });

    return records;
  }
}

import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { VerifyStatus } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';

@Controller('verifiers')
export class VerifiersController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('mark/:id')
  @Roles('admin', 'verifier')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getQueues(
    @UserEntity() user: any,
    @Param('id') id: string,
    @Body('status') status: VerifyStatus
  ) {
    console.log('cur user', user);
    const webhook = await this.prisma.verifyRecord
      .findFirst({
        where: {
          id,
        },
      })
      .client()
      .webhook();

    const record = await this.prisma.verifyRecord.findFirst({ where: { id } });
    const url = webhook[0].url;

    axios.post(url, record).catch((e) => {});

    return await this.prisma.verifyRecord.update({
      where: {
        id: id,
      },
      data: {
        verifyStatus: status,
      },
    });
  }
}

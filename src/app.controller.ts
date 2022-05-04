import { Controller, Get, Param } from '@nestjs/common';
import { Client, VerifyRecord, VerifyStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name);
  }

  @Get('verify_records/:name')
  async getVerifyRecords(
    @Param('name') name: string
  ): Promise<Partial<VerifyRecord>> {
    const record = await this.prisma.verifyRecord.findFirst({
      select: {
        id: true,
        client: true,
      },
    });

    const queue = await this.prisma.queue
      .findFirst()
      .VerifyRecord({ where: { verifyStatus: VerifyStatus.PENDING } });

    return record;
  }
}

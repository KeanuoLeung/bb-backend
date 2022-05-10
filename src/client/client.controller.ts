import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { v4 } from 'uuid';

@Controller('client')
export class ClientController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('generate_token')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('client')
  async generateToken(@UserEntity() user: any) {
    console.log('User is generating token', user);
    const curClient = await this.prisma.client.findFirst({
      where: { id: user.id },
    });
    const newAccessToken = await this.prisma.clientAccessToken.create({
      data: {
        appid: v4(),
        token: v4(),
        clientId: curClient.id,
      },
    });
    return newAccessToken;
  }

  @Get('tokens')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('client')
  async getTokens(@UserEntity() user: any) {
    const curClient = await this.prisma.client.findFirst({
      where: { id: user.id },
    });
    const tokens = await this.prisma.clientAccessToken.findMany({
      where: { clientId: curClient.id },
    });
    return tokens;
  }

  @Delete('token/:id')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('client')
  async deleteToken(@Param('id') id: string) {
    return this.prisma.clientAccessToken.delete({
      where: {
        id,
      },
    });
  }

  @Get('webhook')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('client')
  async getWebhook(@UserEntity() user: any) {
    return (
      (
        await this.prisma.clientWebhook.findFirst({
          where: {
            clientId: user.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      )?.url ?? ''
    );
  }

  @Post('webhook')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('client')
  async saveWebhook(@UserEntity() user: any, @Body() data: any) {
    return await this.prisma.clientWebhook.create({
      data: {
        url: data.url,
        clientId: user.id,
      },
    });
  }
}

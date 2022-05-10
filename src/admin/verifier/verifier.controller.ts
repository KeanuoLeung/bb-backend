import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from 'src/auth/password.service';

@Controller('admin/verifier')
export class VerifierController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}
  // Get all IllegalPic
  @Get()
  async getAll() {
    return await this.prisma.verifier.findMany({
      include: { VerifierGroup: true },
    });
  }
  // Get one IllegalPic
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.prisma.verifier.findMany({
      where: {
        verifierGroupId: id,
      },
      include: {
        VerifierGroup: true,
      },
    });
  }

  // Create a new IllegalPic
  @Post()
  async create(@Body() data: any) {
    return this.prisma.verifier.create({
      data: {
        email: data.email,
        password: await this.passwordService.hashPassword(data.password),
        verifierGroupId: data.verifierGroupId,
      },
    });
  }

  @Put(':id')
  async changePassword(@Param('id') id: string, @Body() data: any) {
    return this.prisma.verifier.update({
      data: {
        password: await this.passwordService.hashPassword(data.password),
        verifierGroupId: data.verifierGroupId,
      },
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.prisma.verifier.delete({
      where: {
        id,
      },
    });
  }
}

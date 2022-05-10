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

@Controller('admin/verifier-group')
export class VerifierGroupController {
  constructor(private readonly prisma: PrismaService) {}
  // Get all IllegalPic
  @Get()
  async getAll() {
    return await this.prisma.verifierGroup.findMany();
  }
  // Get one IllegalPic
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.prisma.verifierGroup.findFirst({
      where: {
        id,
      },
    });
  }

  // Create a new IllegalPic
  @Post()
  async create(@Body() data: any) {
    return await this.prisma.verifierGroup.create({
      data: {
        name: data.name,
      },
    });
  }

  @Put(':id')
  async changeName(@Param('id') id: string, @Body() data: any) {
    return await this.prisma.verifierGroup.update({
      data: {
        name: data.name,
      },
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.prisma.verifierGroup.delete({
      where: {
        id,
      },
    });
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

// Controller for crud of IllegalPic
@Controller('admin/illegalpic')
export class IllegalpicController {
  constructor(private readonly prisma: PrismaService) {}
  // Get all IllegalPic
  @Get()
  async getAll() {
    return await this.prisma.illegalPic.findMany();
  }
  // Get one IllegalPic
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.prisma.illegalPic.findFirst({
      where: {
        id,
      },
    });
  }

  // Create a new IllegalPic
  @Post()
  async create(@Body() data: any) {
    return await this.prisma.illegalPic.create({
      data: {
        title: data.title,
        url: data.url,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.prisma.illegalPic.delete({
      where: {
        id,
      },
    });
  }
}

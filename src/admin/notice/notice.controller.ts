import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Controller('admin/notice')
export class NoticeController {
  constructor(private readonly prisma: PrismaService) {}
  // Get all IllegalPic
  @Get()
  async getAll() {
    return await this.prisma.notice.findMany();
  }
  // Get one IllegalPic
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.prisma.notice.findFirst({
      where: {
        id,
      },
    });
  }

  // Create a new IllegalPic
  @Post()
  async create(@Body() data: any) {
    return await this.prisma.notice.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.prisma.notice.delete({
      where: {
        id,
      },
    });
  }
}

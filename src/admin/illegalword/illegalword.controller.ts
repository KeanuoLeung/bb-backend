import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Controller('admin/illegalword')
export class IllegalwordController {
  constructor(private readonly prisma: PrismaService) {}
  // Get all IllegalPic
  @Get()
  async getAll() {
    return await this.prisma.illegalWord.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
  // Get one IllegalPic
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.prisma.illegalWord.findFirst({
      where: {
        id,
      },
    });
  }

  // Create a new IllegalPic
  @Post()
  async create(@Body() data: any) {
    return await this.prisma.illegalWord.create({
      data: {
        word: data.word,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.prisma.illegalWord.delete({
      where: {
        id,
      },
    });
  }
}

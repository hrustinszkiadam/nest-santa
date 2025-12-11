import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  async create(@Body() createChildDto: CreateChildDto) {
    return await this.childrenService.create(createChildDto);
  }

  @Get()
  async findAll() {
    return await this.childrenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const child = await this.childrenService.findOne(id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return await this.childrenService.update(id, updateChildDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.childrenService.remove(id);
  }

  @Put(':id/toys/:toyId')
  async assignToy(
    @Param('id', ParseIntPipe) id: number,
    @Param('toyId', ParseIntPipe) toyId: number,
  ) {
    return await this.childrenService.assignToy(id, toyId);
  }

  @Delete(':id/toy')
  async removeToy(@Param('id', ParseIntPipe) id: number) {
    return await this.childrenService.removeToy(id);
  }
}

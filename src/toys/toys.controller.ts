import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  async create(@Body() createToyDto: CreateToyDto) {
    return await this.toysService.create(createToyDto);
  }

  @Get()
  async findAll() {
    return await this.toysService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.toysService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateToyDto: UpdateToyDto,
  ) {
    return await this.toysService.update(id, updateToyDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.toysService.remove(id);
  }
}

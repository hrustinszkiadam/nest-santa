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
} from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 201,
    description: 'The toy has been successfully created.',
  })
  @ApiBody({ type: CreateToyDto })
  @Post()
  async create(@Body() createToyDto: CreateToyDto) {
    return await this.toysService.create(createToyDto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of all toys.',
  })
  @Get()
  async findAll() {
    return await this.toysService.findAll();
  }

  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Toy not found.',
  })
  @ApiResponse({
    status: 200,
    description: 'The toy with the specified ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the toy to retrieve',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const toy = await this.toysService.findOne(id);

    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }

    return toy;
  }

  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format or input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Toy not found.',
  })
  @ApiResponse({
    status: 200,
    description: 'The toy has been successfully updated.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the toy to update',
  })
  @ApiBody({ type: UpdateToyDto })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateToyDto: UpdateToyDto,
  ) {
    return await this.toysService.update(id, updateToyDto);
  }

  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Toy not found.',
  })
  @ApiResponse({
    status: 200,
    description: 'The toy has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the toy to delete',
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.toysService.remove(id);
  }
}

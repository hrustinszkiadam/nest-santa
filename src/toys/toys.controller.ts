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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import Toy from './entities/toy.entity';

@ApiTags('toys')
@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @ApiOperation({
    summary: 'Create a new toy',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 201,
    description: 'The toy has been successfully created.',
    type: Toy,
  })
  @ApiBody({ type: CreateToyDto })
  @Post()
  async create(@Body() createToyDto: CreateToyDto) {
    return await this.toysService.create(createToyDto);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all toys',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all toys.',
    type: Toy,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.toysService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a toy by its ID',
  })
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
    type: Toy,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the toy to retrieve',
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const toy = await this.toysService.findOne(id);

    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }

    return toy;
  }

  @ApiOperation({
    summary: 'Update a toy by its ID',
  })
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
    type: Toy,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the toy to update',
    example: 1,
  })
  @ApiBody({ type: UpdateToyDto })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateToyDto: UpdateToyDto,
  ) {
    return await this.toysService.update(id, updateToyDto);
  }

  @ApiOperation({
    summary: 'Delete a toy by its ID',
  })
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
    example: {
      success: true,
    },
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the toy to delete',
    example: 1,
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.toysService.remove(id);
  }
}

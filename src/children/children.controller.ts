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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import Child, { ChildWithToy } from './entities/child.entity';

@ApiTags('children')
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @ApiOperation({
    summary: 'Create a new child',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 201,
    description: 'The child has been successfully created.',
    type: Child,
  })
  @ApiBody({ type: CreateChildDto })
  @Post()
  async create(@Body() createChildDto: CreateChildDto) {
    return await this.childrenService.create(createChildDto);
  }

  @ApiOperation({
    summary: 'Retrieve a list of all children',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all children.',
    type: ChildWithToy,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.childrenService.findAll();
  }

  @ApiOperation({
    summary: 'Retrieve a child by ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Child not found.',
  })
  @ApiResponse({
    status: 200,
    description: 'The child with the specified ID.',
    type: ChildWithToy,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to retrieve',
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const child = await this.childrenService.findOne(id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

  @ApiOperation({
    summary: 'Update a child by ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Child not found.',
  })
  @ApiResponse({
    status: 200,
    description: 'The child has been successfully updated.',
    type: Child,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to update',
    example: 1,
  })
  @ApiBody({ type: UpdateChildDto })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return await this.childrenService.update(id, updateChildDto);
  }

  @ApiOperation({
    summary: 'Delete a child by ID',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Child not found.',
  })
  @ApiResponse({
    status: 200,
    description: 'The child has been successfully deleted.',
    example: {
      success: true,
    },
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to delete',
    example: 1,
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.childrenService.remove(id);
  }

  @ApiOperation({
    summary: 'Assign a toy to a child',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Child not found.',
  })
  @ApiResponse({
    status: 404,
    description: 'Toy not found.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Conflict. The child was not good this year and cannot be assigned a toy.',
  })
  @ApiResponse({
    status: 200,
    description: 'The toy has been successfully assigned to the child.',
    type: ChildWithToy,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to assign a toy to',
    example: 1,
  })
  @ApiParam({
    name: 'toyId',
    type: Number,
    description: 'ID of the toy to assign',
    example: 1,
  })
  @Put(':id/toys/:toyId')
  async assignToy(
    @Param('id', ParseIntPipe) id: number,
    @Param('toyId', ParseIntPipe) toyId: number,
  ) {
    return await this.childrenService.assignToy(id, toyId);
  }

  @ApiOperation({
    summary: 'Remove a toy from a child',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Child not found.',
  })
  @ApiResponse({
    status: 200,
    description: 'The toy has been successfully removed from the child.',
    type: Child,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to remove a toy from',
    example: 1,
  })
  @Delete(':id/toy')
  async removeToy(@Param('id', ParseIntPipe) id: number) {
    return await this.childrenService.removeToy(id);
  }
}

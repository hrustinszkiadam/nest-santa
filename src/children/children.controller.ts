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
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('children')
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
  })
  @ApiResponse({
    status: 201,
    description: 'The child has been successfully created.',
  })
  @ApiBody({ type: CreateChildDto })
  @Post()
  async create(@Body() createChildDto: CreateChildDto) {
    return await this.childrenService.create(createChildDto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of all children.',
  })
  @Get()
  async findAll() {
    return await this.childrenService.findAll();
  }

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
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to retrieve',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const child = await this.childrenService.findOne(id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

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
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to update',
  })
  @ApiBody({ type: UpdateChildDto })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return await this.childrenService.update(id, updateChildDto);
  }

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
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to delete',
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.childrenService.remove(id);
  }

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
    status: 200,
    description: 'The toy has been successfully assigned to the child.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to assign a toy to',
  })
  @ApiParam({
    name: 'toyId',
    type: Number,
    description: 'ID of the toy to assign',
  })
  @Put(':id/toys/:toyId')
  async assignToy(
    @Param('id', ParseIntPipe) id: number,
    @Param('toyId', ParseIntPipe) toyId: number,
  ) {
    return await this.childrenService.assignToy(id, toyId);
  }

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
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the child to remove a toy from',
  })
  @Delete(':id/toy')
  async removeToy(@Param('id', ParseIntPipe) id: number) {
    return await this.childrenService.removeToy(id);
  }
}

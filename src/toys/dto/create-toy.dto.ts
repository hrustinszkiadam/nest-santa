import { type Material, materials } from '@/database/lib/definitions';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateToyDto {
  @ApiProperty({
    description: 'Name of the toy',
    minLength: 1,
    maxLength: 255,
    example: 'Train Set',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Material of the toy',
    enum: materials,
    example: 'plastic',
  })
  @IsString()
  @IsIn(materials)
  material: Material;

  @ApiProperty({
    description: 'Weight of the toy in kilograms',
    minimum: 0.01,
    maximum: 999.99,
    example: 2.5,
  })
  @IsNumber()
  @IsPositive()
  weight: number;
}

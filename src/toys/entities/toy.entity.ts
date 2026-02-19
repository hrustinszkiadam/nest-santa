import {
  materials,
  type Toy as IToy,
  type Material,
} from '@/database/lib/definitions';
import { ApiProperty } from '@nestjs/swagger';

export default class Toy implements IToy {
  @ApiProperty({
    description: 'Unique identifier for the toy',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the toy',
    example: 'Train Set',
  })
  name: string;

  @ApiProperty({
    description: 'Material of the toy',
    enum: materials,
    example: 'plastic',
  })
  material: Material;

  @ApiProperty({
    description: 'Weight of the toy in kilograms',
    example: 2.5,
  })
  weight: number;
}

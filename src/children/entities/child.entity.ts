import Toy from '@/toys/entities/toy.entity';
import { ApiProperty } from '@nestjs/swagger';

export default class Child {
  @ApiProperty({
    description: 'Unique identifier for the child',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the child',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Address of the child',
    example: '123 Candy Cane Lane, North Pole',
  })
  address: string;

  @ApiProperty({
    description: 'Indicates if the child has been good this year',
    default: false,
    example: true,
  })
  wasGood: boolean;

  @ApiProperty({
    description: 'ID of the toy assigned to the child, if any',
    example: 1,
    nullable: true,
  })
  toyId: number | null;
}

export class ChildWithToy extends Child {
  @ApiProperty({
    description: 'The toy assigned to the child, if any',
    type: () => Toy,
    nullable: true,
  })
  toy: Toy | null;
}

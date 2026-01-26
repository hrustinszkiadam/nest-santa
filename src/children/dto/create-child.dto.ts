import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty({
    description: 'Name of the child',
    minLength: 1,
    maxLength: 255,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Address of the child',
    minLength: 1,
    maxLength: 500,
    example: '123 Candy Cane Lane, North Pole',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Indicates if the child has been good this year',
    default: false,
    example: true,
  })
  @IsBoolean()
  wasGood: boolean;
}

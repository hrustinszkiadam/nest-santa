import { type Material, materials } from '@/database/lib/definitions';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateToyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(materials)
  material: Material;

  @IsNumber()
  @IsPositive()
  weight: number;
}

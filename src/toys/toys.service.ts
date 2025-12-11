import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import {
  DATABASE_CONNECTION,
  NewToy,
  UpdateToy,
  type TDatabase,
} from '@/database/lib/definitions';
import { toys } from '@/database/lib/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ToysService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: TDatabase) {}

  async assertExists(id: number) {
    const toy = await this.findOne(id);
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} does not exist.`);
    }

    return toy;
  }

  async create(createToyDto: CreateToyDto) {
    const newToyData: NewToy = {
      name: createToyDto.name,
      material: createToyDto.material,
      weight: createToyDto.weight,
    };

    const [newToy] = await this.db
      .insert(toys)
      .values(newToyData)
      .returning()
      .catch(() => {
        throw new InternalServerErrorException(
          'Failed to create new toy. Please try again later.',
        );
      });

    return newToy;
  }

  async findAll() {
    return await this.db.query.toys.findMany();
  }

  async findOne(id: number) {
    return await this.db.query.toys.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    await this.assertExists(id);
    const updatedToyData: UpdateToy = {
      name: updateToyDto.name,
      material: updateToyDto.material,
      weight: updateToyDto.weight,
    };

    const [updatedToy] = await this.db
      .update(toys)
      .set(updatedToyData)
      .where(eq(toys.id, id))
      .returning()
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to update toy with ID ${id}. Please try again later.`,
        );
      });

    return updatedToy;
  }

  async remove(id: number) {
    await this.assertExists(id);

    await this.db
      .delete(toys)
      .where(eq(toys.id, id))
      .execute()
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to delete toy with ID ${id}. Please try again later.`,
        );
      });

    return {
      success: true,
    };
  }
}

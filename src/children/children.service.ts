import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import {
  DATABASE_CONNECTION,
  NewChild,
  UpdateChild,
  type TDatabase,
} from '@/database/lib/definitions';
import { children } from '@/database/lib/schema';
import { eq } from 'drizzle-orm';
import { ToysService } from '@/toys/toys.service';

@Injectable()
export class ChildrenService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: TDatabase,
    private readonly toysService: ToysService,
  ) {}

  async assertExists(id: number) {
    const child = await this.findOne(id);
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} does not exist.`);
    }

    return child;
  }

  async create(createChildDto: CreateChildDto) {
    const newChildData: NewChild = {
      name: createChildDto.name,
      address: createChildDto.address,
      wasGood: createChildDto.wasGood,
      toyId: null,
    };

    const [newChild] = await this.db
      .insert(children)
      .values(newChildData)
      .returning()
      .catch(() => {
        throw new InternalServerErrorException(
          'Failed to create new child. Please try again later.',
        );
      });

    return newChild;
  }

  async findAll() {
    return await this.db.query.children.findMany({
      with: { toy: true },
    });
  }

  async findOne(id: number) {
    return await this.db.query.children.findFirst({
      where: {
        id,
      },
      with: { toy: true },
    });
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    const existing = await this.assertExists(id);
    const updatedChildData: UpdateChild = {
      name: updateChildDto.name,
      address: updateChildDto.address,
      wasGood: updateChildDto.wasGood,
      toyId: updateChildDto.wasGood === false ? null : existing.toyId,
    };

    const [updatedChild] = await this.db
      .update(children)
      .set(updatedChildData)
      .where(eq(children.id, id))
      .returning()
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to update child with ID ${id}. Please try again later.`,
        );
      });

    return updatedChild;
  }

  async remove(id: number) {
    await this.assertExists(id);

    await this.db
      .delete(children)
      .where(eq(children.id, id))
      .execute()
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to delete child with ID ${id}. Please try again later.`,
        );
      });

    return {
      success: true,
    };
  }

  async assignToy(id: number, toyId: number) {
    const child = await this.assertExists(id);
    if (!child.wasGood) {
      throw new ConflictException(
        `Cannot assign toy to child with ID ${id} because they were not good.`,
      );
    }

    const toy = await this.toysService.assertExists(toyId);

    await this.db
      .update(children)
      .set({ toyId: toy.id })
      .where(eq(children.id, child.id))
      .execute()
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to assign toy with ID ${toyId} to child with ID ${id}. Please try again later.`,
        );
      });

    return await this.db.query.children.findFirst({
      where: {
        id: child.id,
      },
      with: { toy: true },
    });
  }

  async removeToy(id: number) {
    const child = await this.assertExists(id);

    const [updatedChild] = await this.db
      .update(children)
      .set({ toyId: null })
      .where(eq(children.id, child.id))
      .returning()
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to remove toy from child with ID ${id}. Please try again later.`,
        );
      });

    return updatedChild;
  }
}

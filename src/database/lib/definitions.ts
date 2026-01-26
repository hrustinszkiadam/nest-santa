import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import relations from './relations';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION' as const;
export const DEFAULT_SEED_ROW_COUNT = 20 as const;

export type TDatabase = NodePgDatabase<typeof schema, typeof relations>;

export const materials = ['wood', 'metal', 'plastic', 'other'] as const;
export type Material = (typeof materials)[number];

export type Toy = typeof schema.toys.$inferSelect;
export type NewToy = typeof schema.toys.$inferInsert;
export type UpdateToy = Partial<NewToy>;

export type Child = typeof schema.children.$inferSelect;
export type NewChild = typeof schema.children.$inferInsert;
export type UpdateChild = Partial<NewChild>;

export type ChildWithToy = Omit<Child, 'toyId' | 'wasGood'> &
  (
    | {
        wasGood: boolean;
        toyId: null;
        toy: null;
      }
    | {
        wasGood: true;
        toyId: number;
        toy: Toy;
      }
  );

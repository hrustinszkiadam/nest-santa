import { pgEnum } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { materials } from './definitions';
import { varchar } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';
import { decimal } from 'drizzle-orm/pg-core';

export const materialEnum = pgEnum('materialEnum', materials);

export const toys = pgTable('toys', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: varchar('name', { length: 255 }).notNull(),
  material: materialEnum('material').notNull(),
  weight: decimal('weight_kg', {
    precision: 5,
    scale: 2,
    mode: 'number',
  }).notNull(),
});

export const children = pgTable('children', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
  name: varchar('name', { length: 255 }).notNull(),
  address: varchar('address', { length: 500 }).notNull(),
  wasGood: boolean('was_good').notNull().default(false),
  toyId: integer('toy_id').references(() => toys.id, { onDelete: 'set null' }),
});

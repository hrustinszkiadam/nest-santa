import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

const relations = defineRelations(schema, (r) => ({
  children: {
    toys: r.one.toys({
      from: r.children.toyId,
      to: r.toys.id,
      optional: true,
      alias: 'toy',
    }),
  },
  toys: {
    children: r.many.children({
      from: r.toys.id,
      to: r.children.toyId,
      alias: 'children',
    }),
  },
}));

export default relations;

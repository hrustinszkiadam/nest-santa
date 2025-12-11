import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import relations from './relations';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION' as const;
export const DEFAULT_SEED_ROW_COUNT = 20 as const;

export type TDatabase = NodePgDatabase<typeof schema, typeof relations>;

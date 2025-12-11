import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';
import * as schema from './schema';
import relations from './relations';
import { DEFAULT_SEED_ROW_COUNT } from './definitions';

const connectionString = process.env.DATABASE_URL;
const rowsToInsert =
  process.argv[2] && !isNaN(parseInt(process.argv[2], 10))
    ? parseInt(process.argv[2], 10)
    : DEFAULT_SEED_ROW_COUNT;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables.');
}

const db = drizzle(connectionString, {
  schema,
  relations,
  casing: 'snake_case',
});

async function main() {
  console.log(
    `Resetting database and seeding data with ${rowsToInsert} rows...`,
  );

  await reset(db, schema);
}

main()
  .then(() => {
    console.log('Database seeding completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during database seeding:', error);
    process.exit(1);
  });

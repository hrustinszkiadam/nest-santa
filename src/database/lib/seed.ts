import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import relations from './relations';
import { DEFAULT_SEED_ROW_COUNT, NewChild, NewToy } from './definitions';
import { faker } from '@faker-js/faker';
import { materials } from './definitions';

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

function generatePlaceholderToys(count: number): NewToy[] {
  return Array.from({ length: count }, () => ({
    name: faker.commerce.productName(),
    material: faker.helpers.arrayElement(materials),
    weight: parseFloat(
      faker.commerce.price({
        min: 0.1,
        max: 5.0,
      }),
    ),
  }));
}

function generatePlaceholderChildren(count: number): NewChild[] {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    address: `${faker.location.country()}, ${faker.location.city()}, ${faker.location.streetAddress()}`,
    wasGood: faker.datatype.boolean(),
  }));
}

async function main() {
  console.log(
    `Resetting database and seeding data with ${rowsToInsert} rows...`,
  );

  await db.transaction(async (tx) => {
    await tx.delete(schema.children);
    await tx.delete(schema.toys);
    await tx.execute(`ALTER SEQUENCE toys_id_seq RESTART WITH 1`);
    await tx.execute(`ALTER SEQUENCE children_id_seq RESTART WITH 1`);
  });

  const toysData = generatePlaceholderToys(rowsToInsert);
  const childrenData = generatePlaceholderChildren(rowsToInsert);

  await db.transaction(async (tx) => {
    const generatedToys = await tx
      .insert(schema.toys)
      .values(toysData)
      .returning();
    await tx.insert(schema.children).values(
      childrenData.map((child) => ({
        ...child,
        toyId: child.wasGood
          ? faker.helpers.arrayElement(generatedToys).id
          : null,
      })),
    );
  });
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

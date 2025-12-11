import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './lib/definitions';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './lib/schema';
import relations from './lib/relations';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString =
          configService.getOrThrow<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
        });

        const db = drizzle({
          client: pool,
          schema,
          relations,
          casing: 'snake_case',
        });

        return db;
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

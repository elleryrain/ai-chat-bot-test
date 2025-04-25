import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

export default defineConfig({
  schema: 'packages/shared/src/lib/drizzle/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  out: 'packages/shared/src/lib/drizzle/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
});

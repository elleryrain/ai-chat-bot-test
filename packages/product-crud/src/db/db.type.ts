import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '@shared';
export type DB_TYPE = NodePgDatabase<typeof schema>;

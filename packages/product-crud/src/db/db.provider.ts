import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_TYPE } from './db.type';
import { POSTGRES_CONFIG } from '../config/env.config';

export class Database {
  private _db: DB_TYPE;
  constructor() {
    this._db = drizzle(POSTGRES_CONFIG.databaseUrl);
  }

  get db() {
    return this._db;
  }
}

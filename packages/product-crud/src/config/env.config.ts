import { config } from 'dotenv';

config();

export const NATS_CONFIG = {
  url: process.env.NATS_URL || 'nats://localhost:4222',
};

export const POSTGRES_CONFIG = {
  databaseUrl: String(process.env.DATABASE_URL),
};

export const REDIS_CONFIG = {
  url: String(process.env.REDIS_URL),
};

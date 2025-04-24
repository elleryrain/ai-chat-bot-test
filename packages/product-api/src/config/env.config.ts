import { config } from 'dotenv';

config();

export const NATS_CONFIG = {
  url: String(process.env.NATS_URL),
};

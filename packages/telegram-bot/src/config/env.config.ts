import { config } from 'dotenv';

config();

export const TG_BOT_CONFIG = {
  botToken: String(process.env.BOT_TOKEN),
};

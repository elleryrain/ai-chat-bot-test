import { config } from 'dotenv';

config();

export const TG_BOT_CONFIG = {
  botToken: String(process.env.BOT_TOKEN),
};

export const API_CONFIG = {
  apiUrl: String(process.env.API_URL),
};

export const AI_CONFIG = {
  aiApiUrl: String(process.env.AI_API_URL),
  aiApiKey: String(process.env.AI_API_KEY),
  aiModel: String(process.env.AI_MODEL),
};

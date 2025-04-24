import { config } from 'dotenv';

config();

export const TG_BOT_CONFIG = {
  botToken: String(process.env.BOT_TOKEN),
};

export const API_CONFIG = {
  apiUrl: String(process.env.API_URL),
};

export const AI_CONFIG = {
  client_url: String(process.env.AI_GRADIO_CLIENT_URL),
};

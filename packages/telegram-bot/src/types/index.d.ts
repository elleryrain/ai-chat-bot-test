import { Telegraf } from 'telegraf';
import { ProductApiRequest } from '../api/productApiRequest';
import { AIChat } from '../ai/ai';

declare module 'telegraf' {
  interface Telegraf {
    api: ProductApiRequest;
    ai: AIChat;
  }
}

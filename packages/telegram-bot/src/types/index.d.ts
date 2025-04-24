import { Telegraf } from 'telegraf';
import { ProductApiRequest } from '../api/productApiRequest';

declare module 'telegraf' {
  interface Telegraf {
    api: ProductApiRequest;
  }
}

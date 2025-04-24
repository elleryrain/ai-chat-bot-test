import { Scenes, session, Telegraf } from 'telegraf';
import { AI_CONFIG, TG_BOT_CONFIG } from './config/env.config';
import { loadCommands } from './handlers/commands/commands';
import { ProductApiRequest } from './api/productApiRequest';
import { loadHandlers } from './handlers';
import { AIChat } from './ai/ai';
import { Client } from '@gradio/client';

import { loadScenes } from './scenes';
import { MyContext } from './types';

async function bootstrap() {
  console.log(TG_BOT_CONFIG);
  const bot = new Telegraf<MyContext>(TG_BOT_CONFIG.botToken);

  bot.use((ctx, next) => {
    console.log('Received update:', ctx.update);
    return next();
  });
  bot.use(session());
  bot.use(async (ctx, next) => {
    ctx.botInstance = bot;
    return next();
  });

  await loadScenes(bot);
  bot.ai = new AIChat();
  bot.api = new ProductApiRequest();
  await loadHandlers(bot);

  bot.launch(() => console.log('bot started'));
}

bootstrap();

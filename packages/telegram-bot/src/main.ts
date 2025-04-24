import { Telegraf } from 'telegraf';
import { TG_BOT_CONFIG } from './config/env.config';
import { loadCommands } from './handlers/commands/commands';

async function bootstrap() {
  console.log(TG_BOT_CONFIG);
  const bot = new Telegraf(TG_BOT_CONFIG.botToken);

  await loadCommands(bot);
  bot.launch(() => console.log('bot started'));
}

bootstrap();

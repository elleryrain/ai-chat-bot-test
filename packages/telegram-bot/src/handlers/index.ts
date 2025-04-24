import { Telegraf } from 'telegraf';
import { loadCommands } from './commands/commands';
import { loadCallbacks } from './callback/callback';

export async function loadHandlers(bot: Telegraf) {
  await loadCommands(bot);
  await loadCallbacks(bot);
}

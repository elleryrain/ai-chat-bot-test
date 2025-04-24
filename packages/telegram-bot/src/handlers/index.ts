import { Telegraf } from 'telegraf';
import { loadCommands } from './commands/commands';

export async function loadHandlers(bot: Telegraf) {
  await loadCommands(bot);
}

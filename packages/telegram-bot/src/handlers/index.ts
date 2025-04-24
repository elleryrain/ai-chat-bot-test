import { Telegraf } from 'telegraf';
import { loadCommands } from './commands/commands';
import { loadCallbacks } from './callback/callback';
import { MyContext } from '../types';

export async function loadHandlers(bot: Telegraf<MyContext>) {
  await loadCommands(bot);
  await loadCallbacks(bot);
}

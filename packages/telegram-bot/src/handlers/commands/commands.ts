import { Telegraf, Markup } from 'telegraf';
import { CALLBACK_ACTIONS } from '../../config/consts';

export async function loadCommands(bot: Telegraf) {
  const keyboard = Markup.inlineKeyboard([
    {
      text: 'Псмотреть товары',
      callback_data: CALLBACK_ACTIONS.getAllProducts,
    },
  ]);
  bot.start(
    async (ctx) =>
      await ctx.reply(
        'Привет, у меня здесь можно посмотреть разные товары',
        keyboard
      )
  );
}

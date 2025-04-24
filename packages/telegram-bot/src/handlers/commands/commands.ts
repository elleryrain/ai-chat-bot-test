import { Telegraf } from 'telegraf';

export async function loadCommands(bot: Telegraf) {
  bot.start(
    async (ctx) =>
      await ctx.reply('Привет, у меня здесь можно посмотреть разные товары')
  );
}

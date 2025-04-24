import { Telegraf, Markup } from 'telegraf';
import { CALLBACK_ACTIONS } from '../../config/consts';

export async function loadCommands(bot: Telegraf) {
  const keyboard = Markup.inlineKeyboard([
    {
      text: 'Псмотреть товары',
      callback_data: CALLBACK_ACTIONS.getAllProducts,
    },
  ]);
  bot.hears(/\/product (\d+)/, async (ctx) => {
    const productId = parseInt(ctx.match[1]);
    console.log(123);
    const product = await bot.api.getProductById(productId);

    if (!product) {
      return ctx.reply('Товар не найден 😔');
    }

    const message = `
   🎁 *${product.name}*
  💵 Цена: $${product.price}
  📝 Описание: ${product.desc}
    `;

    await ctx.reply(message);
  });

  bot.hears(/\/delete-product (\d+)/, async (ctx) => {
    const productId = parseInt(ctx.match[1]);
    console.log(123);
    const message = await bot.api.deleteProduct(productId);

    await ctx.reply(message);
  });

  bot.start(
    async (ctx) =>
      await ctx.reply(
        'Привет, у меня здесь можно посмотреть разные товары',
        keyboard
      )
  );
}

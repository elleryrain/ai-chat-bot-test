import { Telegraf, Markup } from 'telegraf';
import { CALLBACK_ACTIONS } from '../../config/consts';
import { MyContext } from '../../types';

export async function loadCommands(bot: Telegraf<MyContext>) {
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
      return ctx.reply('Товар не найден');
    }

    const message = `
  Название: *${product.name}*
  Цена: $${product.price}
  Описание: ${product.desc}
    `;

    await ctx.reply(message);
  });

  bot.hears(/\/deleteProduct (\d+)/, async (ctx) => {
    const productId = parseInt(ctx.match[1]);
    console.log(123);
    const message = await bot.api.deleteProduct(productId);

    await ctx.reply(message);
  });
  bot.command('createProduct', async (ctx) => {
    console.log('Команда /createProduct получена');
    ctx.session = {};
    await ctx.scene.enter('super-wizard');
  });

  bot.hears('/updateProduct', async (ctx) => {
    console.log('Команда /updateProduct получена');
    ctx.session = {};
    await ctx.scene.enter('super-wizard-update-product');
  });
  bot.start(
    async (ctx) =>
      await ctx.reply(
        'Привет, у меня здесь можно посмотреть разные товары',
        keyboard
      )
  );
}

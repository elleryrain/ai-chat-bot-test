import { Telegraf } from 'telegraf';
import { CALLBACK_ACTIONS } from '../../config/consts';
import { TShortProduct } from '@shared';

export async function loadCallbacks(telegraf: Telegraf) {
  telegraf.action(CALLBACK_ACTIONS.getAllProducts, async (ctx) => {
    const items = await telegraf.api.getProducts();
    ctx.reply('Идёт запрос к нейросети, ждите...');
    console.log(items);
    try {
      const message = await telegraf.ai.beautifyProductsMessage(items);
      ctx.reply(message);
    } catch (err) {
      console.log(err);
      ctx.reply('Ошибка при обработке нейросети');
    }
  });
}

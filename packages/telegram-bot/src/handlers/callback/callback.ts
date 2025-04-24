import { Telegraf } from 'telegraf';
import { CALLBACK_ACTIONS } from '../../config/consts';

export async function loadCallbacks(telegraf: Telegraf) {
  telegraf.action(CALLBACK_ACTIONS.getAllProducts, async (ctx) => {
    // console.log(telegraf.api);
    const items = await telegraf.api.getProducts();
    ctx.reply(items.toString());
  });
}

import { Scenes, Telegraf } from 'telegraf';
import { MyContext, superWizard } from './qwe';

export async function loadScenes(bot: Telegraf) {
  const stage = new Scenes.Stage<MyContext>([superWizard], {
    default: 'super-wizard',
  });

  bot.use((ctx: MyContext, next) => {
    const now = new Date();
    ctx.myContextProp = now.toString();
    return next();
  });

  bot.use(stage.middleware());
}

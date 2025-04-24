import { Composer, Context, Markup, Scenes, session, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

interface MyWizardSession extends Scenes.WizardSessionData {
  myWizardSessionProp: number;
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
  name: string;
  price: number;
  desc: string;
}

export interface MyContext
  extends Context<{
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
  }> {
  myContextProp: string;
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<MyContext>;
  botInstance: Telegraf<MyContext>;
}

const stepHandler = new Composer<MyContext>();

stepHandler.command('createProduct', async (ctx) => {
  await ctx.reply('Название предмета:');
  return ctx.wizard.next();
});

// stepHandler.use((ctx) => ctx.reply('Press `Next` button or type /next'));

export const superWizard = new Scenes.WizardScene(
  'super-wizard',
  stepHandler,
  async (ctx) => {
    if (!ctx.message || !('text' in ctx.message)) {
      return await ctx.reply('Пожалуйста, введите текст!');
    }
    ctx.session.name = ctx.message.text;
    console.log(ctx.message.text);
    ctx.reply('Сохранено');
    ctx.reply('Введите цену предмета');
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (!ctx.message || !('text' in ctx.message)) {
      return await ctx.reply('Пожалуйста, введите число');
    }
    if (!Number(ctx.message.text)) {
      return await ctx.reply('Пожалуйста, введите число');
    }
    ctx.session.price = Number(ctx.message.text);
    await ctx.reply('Сохранено');
    await ctx.reply('Введите описание');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message || !('text' in ctx.message)) {
      return await ctx.reply('Пожалуйста, введите текст!');
    }
    ctx.session.desc = ctx.message.text;
    await ctx.reply('Сохранено');

    const product = await ctx.botInstance.api.createProduct(ctx.session);
    ctx.reply(JSON.stringify(product));
    return ctx.wizard.next();
  }
);

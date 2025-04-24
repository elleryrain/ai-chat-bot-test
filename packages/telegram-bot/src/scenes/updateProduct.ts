import { Composer, Context, Markup, Scenes, session, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { MyContext } from '../types';

interface SessionUpdateProduct {
  id?: number;
  name?: string;
  price?: number;
  desc?: string;
}

// stepHandler.use((ctx) => ctx.reply('Press `Next` button or type /next'));

export const superWizardUpdateProduct = new Scenes.WizardScene<
  MyContext<SessionUpdateProduct>
>(
  'super-wizard-update-product',
  async (ctx) => {
    await ctx.reply('Активировано обновление информации предмета:');
    await ctx.reply('Введите id предмета');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message || !('text' in ctx.message)) {
      return await ctx.reply('Пожалуйста, введите число');
    }

    if (!Number(ctx.message.text)) {
      return await ctx.reply('Пожалуйста, введите число');
    }
    const id = Number(ctx.message.text);
    const product = await ctx.botInstance.api.getProductById(id);
    if (!product) {
      return await ctx.reply('Продукт с этим id не найден');
    }
    ctx.session.id = Number(ctx.message.text);
    console.log(ctx.message.text);
    ctx.reply('Сохранено');
    ctx.reply('Введите название предмета');
    return ctx.wizard.next();
  },

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

    const product = await ctx.botInstance.api.updateProduct(ctx.session);
    ctx.reply(JSON.stringify(product));
    return ctx.scene.leave();
  }
);

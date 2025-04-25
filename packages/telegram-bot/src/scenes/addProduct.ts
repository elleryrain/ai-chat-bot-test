import { Composer, Context, Markup, Scenes, session, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { MyContext } from '../types';

interface MyWizardState extends Scenes.WizardContext {
  myWizardSessionProp: number;
}

interface SessionCreateProduct {
  name?: string;
  price?: number;
  desc?: string;
}

export const superWizard = new Scenes.WizardScene<
  MyContext<SessionCreateProduct>
>(
  'super-wizard',

  async (ctx) => {
    await ctx.reply('Активировано создание предмета:');
    await ctx.reply('Название предмета:');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message || !('text' in ctx.message)) {
      return await ctx.reply('Пожалуйста, введите текст!');
    }
    ctx.session.name = ctx.message.text;
    console.log(ctx.message.text);
    await ctx.reply('Сохранено');
    await ctx.reply('Введите цену предмета');
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
    console.log(ctx.session, product);
    await ctx.reply(JSON.stringify(product));
    return ctx.scene.leave();
  }
);

import { Scenes, Telegraf } from 'telegraf';
import { superWizard } from './addProduct';
import { superWizardUpdateProduct } from './updateProduct';
import { MyContext } from '../types';
export async function loadScenes(bot: Telegraf<MyContext>) {
  const stage = new Scenes.Stage<MyContext>([
    superWizard,
    superWizardUpdateProduct,
  ]);

  bot.use(stage.middleware());
}

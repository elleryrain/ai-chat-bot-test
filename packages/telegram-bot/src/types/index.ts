import { Context, Scenes, Telegraf } from 'telegraf';
import { ProductApiRequest } from '../api/productApiRequest';
import { AIChat } from '../ai/ai';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

declare module 'telegraf' {
  interface Telegraf {
    api: ProductApiRequest;
    ai: AIChat;
  }
}

interface MyWizardSession extends Scenes.WizardSessionData {
  myWizardSessionProp: number;
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
  id: number;
  name: string;
  price: number;
  desc: string;
}

export interface MyContext<T = unknown>
  extends Context<{
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
  }> {
  myContextProp: string;
  session: T;
  scene: Scenes.SceneContextScene<MyContext<T>, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<MyContext<T>>;
  botInstance: Telegraf<MyContext<T>>;
}

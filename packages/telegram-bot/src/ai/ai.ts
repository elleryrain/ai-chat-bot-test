export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)'
);

import OpenAI from 'openai';
import { AI_CONFIG } from '../config/env.config';
import { TGetProductsResponse, TShortProduct } from '@shared';

export class AIChat {
  private openAi: OpenAI;
  private model: string;
  constructor() {
    console.log(AI_CONFIG);
    this.openAi = new OpenAI({
      apiKey: AI_CONFIG.aiApiKey,
      baseURL: AI_CONFIG.aiApiUrl,
    });
    this.model = AI_CONFIG.aiModel;
  }
  private async completion(content: string) {
    console.log(content);
    console.log(`[AI_CHAT] start creating message`);
    const data = await this.openAi.chat.completions.create({
      model: this.model,
      reasoning_effort: 'low',
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    console.log(data);
    return data.choices[0].message.content;
  }
  async beautifyProductsMessage(products: TGetProductsResponse) {
    let prompt = `Выведи только список товаров в красивой текстовой таблице`;
    prompt += products.map((product) => JSON.stringify(product));

    return await this.completion(prompt);
  }
}

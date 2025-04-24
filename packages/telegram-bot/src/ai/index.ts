import { Client } from '@gradio/client';
import { AI_CONFIG } from '../config/env.config';

export class AIChat {
  private clientUrl = AI_CONFIG.client_url;
  private client: Client;
  constructor() {
    //
  }
}

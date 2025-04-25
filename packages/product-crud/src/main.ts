import { Redis } from 'ioredis';
import { NatsHandler } from './handlers';
import { REDIS_CONFIG } from './config/env.config';

async function bootstrap() {
  const handler = new NatsHandler();
  await handler.start();
}

bootstrap().catch((err) => console.log(err));

import { NatsHandler } from './handlers';

async function bootstrap() {
  const handler = new NatsHandler();
  await handler.start();
}

bootstrap().catch((err) => console.log(err));

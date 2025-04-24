import Fastify from 'fastify';
import { app } from './app/app';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { setupNats } from './app/plugins/nats';

(async () => {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 4500;

  const server = Fastify({
    logger: true,
  });
  await setupNats(server);

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  await server.register(app);

  server.listen({ port, host }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      console.log(`[SERVER] http://${host}:${port}`);
    }
  });
})();

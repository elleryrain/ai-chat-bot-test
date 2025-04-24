import { FastifyInstance } from 'fastify';
import { appRoutes } from './routes';

export async function app(app: FastifyInstance) {
  await app.register(appRoutes);
}

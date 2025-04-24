import { FastifyInstance } from 'fastify';
import { connect } from 'nats';
import { NATS_CONFIG } from '../../config/env.config';
export async function setupNats(fastify: FastifyInstance) {
  try {
    const nc = await connect({ servers: NATS_CONFIG.url });
    fastify.decorate('nc', nc);
    console.log('[NATS] connected');

    fastify.addHook('onClose', async (instance) => {
      await instance.nc.close();
      console.log('[NATS] connection closed');
    });
  } catch (err) {
    console.log('[NATS] connection error', err);
    throw err;
  }
}

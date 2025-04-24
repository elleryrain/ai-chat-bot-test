import {
  ErrorResponseSchema,
  IdParamSchema,
  ProductCreateSchema,
  ProductSchema,
  ProductUpdateSchema,
  TCrudResponse,
} from '@shared';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { JSONCodec } from 'nats';
import { unknown, z } from 'zod';

const jc = JSONCodec();

export async function appRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/api/products', {
    schema: {
      response: {
        200: z.array(ProductSchema),
        500: ErrorResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const requestMsg = { operation: 'read-all' };
      const response = await req.server.nc.request(
        'product.crud',
        jc.encode(requestMsg),
        { timeout: 1000 }
      );

      const data = jc.decode(response.data);

      return reply.send(data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().post('/api/products', {
    schema: {
      body: ProductCreateSchema,
      response: {
        201: ProductSchema,
        400: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const body = req.body;
      const requestMsg = { operation: 'create', data: body };
      const response = await req.server.nc.request(
        'product.crud',
        jc.encode(requestMsg),
        { timeout: 10000 }
      );
      const data = jc.decode(response.data);
      return reply.send(data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().get('/api/products/:id', {
    schema: {
      params: IdParamSchema,
      response: {
        200: ProductSchema,
        404: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const { id } = req.params;
      const requestMsg = { operation: 'read', data: { id } };
      const response = await req.server.nc.request(
        'product.crud',
        jc.encode(requestMsg),
        { timeout: 1000 }
      );
      const data = jc.decode(response.data);
      return reply.send(data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().put('/api/products/:id', {
    schema: {
      params: IdParamSchema,
      body: ProductUpdateSchema,
      response: {
        200: ProductSchema,
        400: ErrorResponseSchema,
        404: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const { id } = req.params;
      const body = req.body;
      const requestMsg = { operation: 'update', data: { id, ...body } };

      const response = await req.server.nc.request(
        'product.crud',
        jc.encode(requestMsg)
      );
      const data = jc.decode(response.data);
      return reply.send(data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().delete('/api/products/:id', {
    schema: {
      params: IdParamSchema,
      response: {
        200: unknown,
        404: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const { id } = req.params;

      const requestMsg = { operation: 'delete', data: { id } };

      const response = await req.server.nc.request(
        'product.crud',
        jc.encode(requestMsg)
      );

      const data = jc.decode(response.data);
      reply.code(200).send(data);
    },
  });
}

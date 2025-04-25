import {
  ErrorResponseSchema,
  IdParamSchema,
  ProductCreateSchema,
  ExtendedProductSchema,
  ProductUpdateSchema,
  TCrudResponse,
  TExtendedProduct,
  TShortProduct,
  ShortProductSchema,
  DeleteResponseSchema,
} from '@shared';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { JSONCodec } from 'nats';
import { unknown, z } from 'zod';

const jc = JSONCodec();

export async function appRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/api/products', {
    // schema: {
    // response: {
    // 200: z.array(ShortProductSchema),
    // 500: ErrorResponseSchema,
    // },
    // },
    handler: async (req, reply) => {
      const requestMsg = { operation: 'read-all' };

      const response = await req.server.nc.request(
        'product.crud',
        jc.encode(requestMsg),
        { timeout: 10000 }
      );

      const data = jc.decode(response.data) as TCrudResponse<TShortProduct[]>;
      console.log(data);
      return reply.send(data.data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().post('/api/products', {
    schema: {
      body: ProductCreateSchema,
      response: {
        201: ExtendedProductSchema,
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
      const data = jc.decode(response.data) as TCrudResponse<TExtendedProduct>;
      return reply.send(data.data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().get('/api/products/:id', {
    schema: {
      params: IdParamSchema,
      response: {
        200: ExtendedProductSchema,
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
      const data = jc.decode(response.data) as TCrudResponse<TExtendedProduct>;
      return reply.send(data.data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().put('/api/products/:id', {
    schema: {
      params: IdParamSchema,
      body: ProductUpdateSchema,
      response: {
        200: ExtendedProductSchema,
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
      const data = jc.decode(response.data) as TCrudResponse<TExtendedProduct>;
      return reply.send(data.data);
    },
  });

  app.withTypeProvider<ZodTypeProvider>().delete('/api/products/:id', {
    schema: {
      params: IdParamSchema,
      response: {
        200: DeleteResponseSchema,
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

      const data = jc.decode(response.data) as TCrudResponse<string>;
      reply.code(200).send(data.data);
    },
  });
}

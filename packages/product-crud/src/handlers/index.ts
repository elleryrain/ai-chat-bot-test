import { connect, JSONCodec } from 'nats';
import { NATS_CONFIG } from '../config/env.config';
import { ProductsService } from '../products/products.service';
import { TCrudProducts, TCrudResponse } from '@shared';
import { CacheService } from '../redis/cache.provider';

const jc = JSONCodec<TCrudProducts>();
const responseJc = JSONCodec<TCrudResponse>();
export class NatsHandler {
  private service: ProductsService;
  constructor() {
    this.service = new ProductsService(new CacheService());
  }

  async start() {
    const nc = await connect({ servers: NATS_CONFIG.url });
    const sub = nc.subscribe('product.crud');

    console.log('product-crud is listening');

    for await (const msg of sub) {
      try {
        const request = jc.decode(msg.data);
        const response = await this.handleRequest(request);
        msg.respond(responseJc.encode(response));
      } catch (err) {
        console.error(err);
        msg.respond(
          responseJc.encode({ status: 'error', message: 'Internal error' })
        );
      }
    }
  }

  private async handleRequest(request: TCrudProducts): Promise<TCrudResponse> {
    switch (request.operation) {
      case 'create': {
        const res = await this.service.insertProduct(request.data);
        return { status: 'success', data: res };
      }
      case 'read': {
        const res = await this.service.getProductById(request.data.id);
        return { status: 'success', data: res };
      }
      case 'update': {
        const res = await this.service.updateProduct(request.data);
        return { status: 'success', data: res };
      }
      case 'delete': {
        const res = await this.service.deleteProduct(request.data.id);
        return { status: 'success', data: res };
      }
      case 'read-all': {
        const res = await this.service.getAllProducts();
        return { status: 'success', data: res };
      }
      default:
        console.log('error');
        return { status: 'error', message: 'Invalid operation' };
    }
  }
}

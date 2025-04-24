import { eq } from 'drizzle-orm';
import { Database } from '../db/db.provider';
import { schema, TUpdateProduct } from '@shared';
import { CacheService } from '../redis/cache.provider';

const { productsTable } = schema;

export class ProductsService {
  private db = new Database().db;
  private cacheService: CacheService;

  constructor(cacheService: CacheService) {
    this.cacheService = cacheService;
  }

  async getAllProducts() {
    const cacheKey = 'all_products';
    try {
      const cachedProducts = await this.cacheService.get(cacheKey);
      if (cachedProducts) {
        return JSON.parse(cachedProducts);
      }
    } catch (err) {
      console.error('Redis get error:', err);
    }

    const products = await this.db
      .select({ id: productsTable.id, name: productsTable.name })
      .from(productsTable);

    try {
      await this.cacheService.set(cacheKey, JSON.stringify(products), 3600);
    } catch (err) {
      console.error('Redis set error:', err);
    }
    return products;
  }

  async getProductById(productId: number) {
    const cacheKey = `product:${productId}`;
    try {
      const cachedProduct = await this.cacheService.get(cacheKey);
      if (cachedProduct) {
        return JSON.parse(cachedProduct);
      }
    } catch (err) {
      console.error('Redis get error:', err);
    }

    const product = (
      await this.db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, productId))
    )[0];

    if (product) {
      try {
        await this.cacheService.set(cacheKey, JSON.stringify(product), 3600);
      } catch (err) {
        console.error('Redis set error:', err);
      }
    }
    return product;
  }

  async insertProduct(productData: typeof productsTable.$inferInsert) {
    const product = (
      await this.db.insert(productsTable).values(productData).returning()
    )[0];

    try {
      await this.cacheService.del('all_products');
    } catch (err) {
      console.error('Redis del error:', err);
    }
    return product;
  }

  async updateProduct(productData: TUpdateProduct) {
    const { id, ...updateData } = productData;
    const newProduct = (
      await this.db
        .update(productsTable)
        .set({ ...updateData })
        .where(eq(productsTable.id, id))
        .returning()
    )[0];

    try {
      await this.cacheService.del(`product:${id}`);
      await this.cacheService.del('all_products');
    } catch (err) {
      console.error('Redis del error:', err);
    }
    return newProduct;
  }

  async deleteProduct(productId: number) {
    const product = (
      await this.db
        .delete(productsTable)
        .where(eq(productsTable.id, productId))
        .returning()
    )[0];

    if (product) {
      try {
        await this.cacheService.del(`product:${productId}`);
        await this.cacheService.del('all_products');
      } catch (err) {
        console.error('Redis del error:', err);
      }
      return 'delete was successful';
    }
    return 'product not found';
  }
}

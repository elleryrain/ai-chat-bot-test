import { eq } from 'drizzle-orm';
import { Database } from '../db/db.provider';

import { schema, TUpdateProduct } from '@shared';

const { productsTable } = schema;
export class ProductsService {
  private db = new Database().db;

  async getAllProducts() {
    const products = await this.db.select().from(productsTable);
    return products;
  }

  async getProductById(productId: number) {
    const product = (
      await this.db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, productId))
    )[0];
    return product;
  }

  async insertProduct(productData: typeof productsTable.$inferInsert) {
    const product = (
      await this.db.insert(productsTable).values(productData).returning()
    )[0];
    return product;
  }

  async deleteProduct(productId: number) {
    await this.db.delete(productsTable).where(eq(productsTable.id, productId));
    return 'delete was successful';
  }

  async updateProduct(productData: TUpdateProduct) {
    const newProduct = await this.db
      .update(productsTable)
      .set({ ...productData })
      .where(eq(productsTable.id, productData.id))
      .returning();
    return newProduct;
  }
}

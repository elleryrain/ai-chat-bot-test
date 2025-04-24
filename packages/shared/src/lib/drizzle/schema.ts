import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('product', {
  id: integer().notNull().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
  desc: varchar({ length: 512 }),
  price: integer().notNull(),
});

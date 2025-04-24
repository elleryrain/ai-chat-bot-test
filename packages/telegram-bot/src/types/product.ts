import { schema } from '@shared';
const { productsTable } = schema;
export type TShortProduct = Pick<
  typeof productsTable.$inferSelect,
  'id' | 'name'
>;

import * as schema from '../lib/drizzle/schema';
const { productsTable } = schema;

export type ICreateProduct = {
  operation: 'create';
  data: {
    name: string;
    price: number;
    desc?: string | null;
  };
};
export type IUpdateProduct = {
  operation: 'update';
  data: {
    id: number;
    name?: string;
    price?: number;
    desc?: string;
  };
};
export type IReadProduct = {
  operation: 'read';
  data: {
    id: number;
  };
};

export type IDeleteProduct = {
  operation: 'delete';
  data: {
    id: number;
  };
};

export type IReadAllCrud = {
  operation: 'read-all';
};

export type TCrudProducts =
  | ICreateProduct
  | IUpdateProduct
  | IDeleteProduct
  | IReadProduct
  | IReadAllCrud;

export type TCrudResponse = {
  status: 'success' | 'error';
  data?: unknown;
  message?: string;
};

export type TUpdateProduct = Partial<
  Omit<typeof productsTable.$inferSelect, 'id'>
> & { id: number };

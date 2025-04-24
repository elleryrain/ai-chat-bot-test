import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export const ProductCreateSchema = z.object({
  name: z.string(),
  price: z.number(),
  desc: z.string().nullable().optional(),
});

export const ProductUpdateSchema = z
  .object({
    name: z.string().optional(),
    price: z.number().optional(),
    desc: z.string().nullable().optional(),
  })
  .refine((data) => Object.keys(data).some((key) => data[key] !== undefined), {
    message: 'At least one property is required',
  });

export const ErrorResponseSchema = z.object({
  status: z.literal('error'),
  message: z.string(),
});

export const IdParamSchema = z.object({
  id: z.number().int().positive(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductCreate = z.infer<typeof ProductCreateSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type IdParam = z.infer<typeof IdParamSchema>;

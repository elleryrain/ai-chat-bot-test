import axios, { Axios } from 'axios';
import { API_CONFIG } from '../config/env.config';
import {
  Product,
  ProductCreate,
  TGetProductsResponse,
  TDeleteProductResponse,
} from '@shared';
export class ProductApiRequest {
  private readonly url = API_CONFIG.apiUrl;
  private readonly api: typeof axios.request;
  constructor() {
    this.api = axios.request;
  }
  private async request<T>(
    method: string,
    path: string,
    data?: unknown
  ): Promise<T> {
    const url = this.url + path;
    return (await this.api<T>({ method, url, data })).data;
  }

  async getProducts() {
    return await this.request<TGetProductsResponse>('get', 'products');
  }

  async getProductById(id: number) {
    return await this.request<Product>('get', `products/${id}`);
  }

  async createProduct(product: ProductCreate) {
    return await this.request<Product>('post', 'products', product);
  }

  async updateProduct(product: Product) {
    const { id, ...productData } = product;
    return await this.request<Product>('put', `products/${id}`, productData);
  }

  async deleteProduct(id: number) {
    return await this.request<TDeleteProductResponse>(
      'delete',
      `products/${id}`
    );
  }
}

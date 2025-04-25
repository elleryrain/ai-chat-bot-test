import { Redis } from 'ioredis';
import { REDIS_CONFIG } from '../config/env.config';

export class CacheService {
  private client = new Redis(REDIS_CONFIG.url);

  constructor() {
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    // Log successful connection
    this.client.on('connect', () => {
      console.log('[CACHE SERVICE] Connected to Redis');
    });

    // Log reconnection
    this.client.on('reconnecting', () => {
      console.log('[CACHE SERVICE] Reconnecting to Redis');
    });

    // Log disconnection
    this.client.on('end', () => {
      console.log('[CACHE SERVICE] Disconnected from Redis');
    });

    this.client.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err);
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}

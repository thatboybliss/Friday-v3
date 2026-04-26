// Redis cache service using Upstash HTTP-based Redis
// Replaces ioredis with @upstash/redis SDK

import { Redis } from "@upstash/redis";

let redisInstance: Redis | null = null;

export function getRedis(): Redis {
  if (!redisInstance) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      throw new Error(
        "Redis configuration missing: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN"
      );
    }

    redisInstance = new Redis({
      url,
      token,
    });
  }

  return redisInstance;
}

// Cache operations
export async function cacheGet(key: string): Promise<any> {
  try {
    const redis = getRedis();
    return await redis.get(key);
  } catch (error) {
    console.error(`Cache get failed for key ${key}:`, error);
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: any,
  expirationSeconds?: number
): Promise<void> {
  try {
    const redis = getRedis();
    if (expirationSeconds) {
      await redis.setex(key, expirationSeconds, JSON.stringify(value));
    } else {
      await redis.set(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Cache set failed for key ${key}:`, error);
  }
}

export async function cacheDelete(key: string): Promise<void> {
  try {
    const redis = getRedis();
    await redis.del(key);
  } catch (error) {
    console.error(`Cache delete failed for key ${key}:`, error);
  }
}

export async function cacheClear(pattern?: string): Promise<void> {
  try {
    const redis = getRedis();
    if (pattern) {
      // For patterns, you need to scan and delete
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } else {
      // Clear all keys
      await redis.flushdb();
    }
  } catch (error) {
    console.error(`Cache clear failed:`, error);
  }
}

export async function cacheIncrement(key: string, amount: number = 1): Promise<number> {
  try {
    const redis = getRedis();
    return (await redis.incrby(key, amount)) as number;
  } catch (error) {
    console.error(`Cache increment failed for key ${key}:`, error);
    return 0;
  }
}

export async function cacheDecrement(key: string, amount: number = 1): Promise<number> {
  try {
    const redis = getRedis();
    return (await redis.decrby(key, amount)) as number;
  } catch (error) {
    console.error(`Cache decrement failed for key ${key}:`, error);
    return 0;
  }
}

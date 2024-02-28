/* eslint-disable no-use-before-define */
import Redis, { Redis as RedisClient } from 'ioredis'

import redisConfig from '@infra/config/redis'
import { Cache } from '@infra/providers/cache/cache'

export class RedisCache implements Cache {
  private static instance: RedisCache
  private client: RedisClient

  private constructor() {
    this.client = new Redis(redisConfig.config.redis)

    this.client.on('error', (err) => {
      console.error('Erro na conexão com o servidor Redis:', err)
    })
  }

  getInstance(): Cache {
    return RedisCache.getInstance()
  }

  public static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache()
    }
    return RedisCache.instance
  }

  public async set(
    key: string,
    value: string,
    expirationInSeconds?: number,
  ): Promise<boolean> {
    try {
      await this.client.set(key, value)
      if (expirationInSeconds) {
        await this.client.expire(key, expirationInSeconds)
      }
      return true
    } catch (err) {
      console.error('Erro ao definir valor no cache:', err)
      return false
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const reply = await this.client.get(key)
      return reply ? (JSON.parse(reply) as T) : null
    } catch (err) {
      console.error('Erro ao buscar valor no cache:', err)
      return null
    }
  }

  public async delete(key: string): Promise<boolean> {
    try {
      const count = await this.client.del(key)
      return count > 0
    } catch (err) {
      console.error('Erro ao excluir valor do cache:', err)
      return false
    }
  }

  public quit(): void {
    this.client.quit()
  }
}

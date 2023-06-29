import Redis from 'redis';
import { promisify } from 'util';

class Cache {
  private redis: Redis.RedisClientType | null;

  constructor() {
    this.redis = null;
  }

  async connect(): Promise<void> {
    try {
      this.redis = Redis.createClient({
        // Redis connection options
      });

      this.redis.on('connect', () => {
        console.log('Redis connected');
      });

      this.redis.on('error', () => {
        console.log('Redis connection error');
      });
    } catch (error) {
      console.log(error);
    }
  }

  async get(key: string): Promise<string | null> {
    const getAsync = promisify(this.redis!.get).bind(this.redis!);
    return getAsync(key);
  }

  async set(key: string, value: string): Promise<void> {
    this.redis!.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.redis!.del(key);
  }
}

const instance = new Cache();

export default instance;

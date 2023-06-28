import Redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_USERNAME: string = process.env.REDIS_USERNAME || 'default';
const REDIS_PORT: string | number = process.env.REDIS_PORT || 6379;
const REDIS_HOST: string = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PASSWORD: string | null = process.env.REDIS_PASSWORD || null;

class Cache {
  private redis: Redis.RedisClientType | null;

  constructor() {
    this.redis = null;
  }

  async connect(): Promise<void> {
    try {
      this.redis = Redis.createClient({
        url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
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
}

const instance = new Cache();

export default instance;

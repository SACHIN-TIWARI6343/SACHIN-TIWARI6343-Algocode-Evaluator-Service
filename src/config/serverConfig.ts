import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    redisPort: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    redisHost: process.env.REDIS_HOST || "127.0.0.1"
};
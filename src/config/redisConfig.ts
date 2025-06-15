import Redis from "ioredis";    

import serverConfig from "./serverConfig";

const redisConfig = {
    port: serverConfig.redisPort,   // number
    host: serverConfig.redisHost ,   // string
    maxRetriesPerRequest : null // Disable automatic retries
};

const redisConnection = new Redis(redisConfig);

export default redisConnection;